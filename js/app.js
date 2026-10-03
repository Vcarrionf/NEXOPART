/* NEXOPARTS — lógica de la tienda: catálogo, filtros, carrito y pedidos por WhatsApp. */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
  const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const VEHICLE_LABEL = { tracto: "Tracto camión", semi: "Semirremolque", ambos: "Tracto y semi" };
  const CART_KEY = "nexoparts_cart";

  const state = { category: "all", vehicle: "all", sort: "featured", query: "" };

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const waLink = (msg) => `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* ---------- Datos de contacto ---------- */
  function fillConfig() {
    $$("[data-config]").forEach((el) => {
      const value = STORE_CONFIG[el.dataset.config];
      el.textContent = value;
      if (el.dataset.href === "mailto") el.href = `mailto:${value}`;
    });
    $$(".js-whatsapp").forEach((el) => {
      el.href = waLink(el.dataset.msg || "Hola NEXOPARTS");
      el.target = "_blank";
      el.rel = "noopener";
    });
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Categorías ---------- */
  function renderCategories() {
    $("#categoryGrid").innerHTML = CATEGORIES.map((c) => {
      const count = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `
        <button class="category" data-cat="${c.id}">
          <span class="category__icon">${c.icon}</span>
          <strong>${c.name}</strong>
          <small>${c.desc}</small>
          <em>${count} productos →</em>
        </button>`;
    }).join("");

    $$(".category").forEach((btn) =>
      btn.addEventListener("click", () => {
        setCategory(btn.dataset.cat);
        $("#catalogo").scrollIntoView({ behavior: "smooth" });
      })
    );

    const chips = [{ id: "all", name: "Todos" }, ...CATEGORIES];
    $("#filterChips").innerHTML = chips
      .map((c) => `<button class="chip" role="tab" data-cat="${c.id}">${c.name}</button>`)
      .join("");
    $$(".chip").forEach((chip) => chip.addEventListener("click", () => setCategory(chip.dataset.cat)));
  }

  function setCategory(id) {
    state.category = id;
    $$(".chip").forEach((c) => c.setAttribute("aria-selected", c.dataset.cat === id));
    renderProducts();
  }

  /* ---------- Productos ---------- */
  function filteredProducts() {
    const q = normalize(state.query.trim());
    let list = PRODUCTS.filter((p) => {
      if (state.category !== "all" && p.cat !== state.category) return false;
      if (state.vehicle !== "all" && p.vehicle !== state.vehicle && p.vehicle !== "ambos") return false;
      if (q) {
        const haystack = normalize([p.name, p.id, p.brand, p.desc, catById[p.cat].name].join(" "));
        return q.split(/\s+/).every((term) => haystack.includes(term));
      }
      return true;
    });

    const sorters = {
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name, "es"),
    };
    return list.slice().sort(sorters[state.sort]);
  }

  function renderProducts() {
    const list = filteredProducts();
    const grid = $("#productGrid");

    grid.innerHTML = list.map((p) => {
      const cat = catById[p.cat];
      const lowStock = p.stock <= 5;
      return `
        <article class="product">
          <div class="product__media">
            <span class="product__icon">${cat.icon}</span>
            ${p.featured ? '<span class="badge">Destacado</span>' : ""}
            <span class="product__vehicle">${VEHICLE_LABEL[p.vehicle]}</span>
          </div>
          <div class="product__body">
            <span class="product__cat">${cat.name}</span>
            <h3>${escapeHtml(p.name)}</h3>
            <p class="product__desc">${escapeHtml(p.desc)}</p>
            <p class="product__meta">SKU: ${p.id} · ${escapeHtml(p.brand)}</p>
            <p class="product__stock ${lowStock ? "is-low" : ""}">${lowStock ? `¡Últimas ${p.stock} unidades!` : "En stock"}</p>
            <div class="product__foot">
              <span class="price">${clp.format(p.price)}</span>
              <button class="btn btn--primary btn--sm" data-add="${p.id}">Agregar</button>
            </div>
          </div>
        </article>`;
    }).join("");

    $("#emptyState").hidden = list.length > 0;
    const catName = state.category === "all" ? "todas las categorías" : catById[state.category].name;
    $("#resultsInfo").textContent =
      `${list.length} producto${list.length === 1 ? "" : "s"} en ${catName}` +
      (state.query ? ` para “${state.query}”` : "");
  }

  /* ---------- Carrito ---------- */
  let cart = loadCart();

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY)) || {};
      // Descarta productos que ya no existen en el catálogo
      return Object.fromEntries(Object.entries(saved).filter(([id, qty]) => productById[id] && qty > 0));
    } catch {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* almacenamiento no disponible: el carrito vive solo en esta sesión */
    }
  }

  function addToCart(id, qty = 1) {
    const max = productById[id].stock;
    cart[id] = Math.min((cart[id] || 0) + qty, max);
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => sum + productById[id].price * qty, 0);
  }

  function renderCart() {
    const entries = Object.entries(cart);
    const count = entries.reduce((n, [, qty]) => n + qty, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").classList.toggle("is-visible", count > 0);

    $("#cartItems").innerHTML = entries.length
      ? entries.map(([id, qty]) => {
          const p = productById[id];
          return `
            <div class="cart-item">
              <span class="cart-item__icon">${catById[p.cat].icon}</span>
              <div class="cart-item__info">
                <strong>${escapeHtml(p.name)}</strong>
                <small>${p.id} · ${clp.format(p.price)} c/u</small>
                <div class="qty">
                  <button data-qty="${id}" data-delta="-1" aria-label="Quitar uno">−</button>
                  <span>${qty}</span>
                  <button data-qty="${id}" data-delta="1" aria-label="Agregar uno">+</button>
                </div>
              </div>
              <div class="cart-item__side">
                <strong>${clp.format(p.price * qty)}</strong>
                <button class="cart-item__remove" data-remove="${id}" aria-label="Eliminar">Eliminar</button>
              </div>
            </div>`;
        }).join("")
      : `<div class="cart__empty"><p>Tu carrito está vacío.</p><a href="#catalogo" class="btn btn--primary" data-close-cart>Ver catálogo</a></div>`;

    $("#cartTotal").textContent = clp.format(cartTotal());
    $("#checkoutBtn").disabled = entries.length === 0;
    $("#clearCart").hidden = entries.length === 0;
  }

  function openCart() {
    $("#cart").classList.add("is-open");
    $("#cart").setAttribute("aria-hidden", "false");
    $("#overlay").hidden = false;
    document.body.classList.add("no-scroll");
  }

  function closeCart() {
    $("#cart").classList.remove("is-open");
    $("#cart").setAttribute("aria-hidden", "true");
    $("#overlay").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  function checkout() {
    const lines = Object.entries(cart).map(([id, qty]) => {
      const p = productById[id];
      return `• ${qty} x ${p.name} (${p.id}) — ${clp.format(p.price * qty)}`;
    });
    const msg = [
      "Hola NEXOPARTS, quiero realizar el siguiente pedido:",
      "",
      ...lines,
      "",
      `Total: ${clp.format(cartTotal())} (IVA incluido)`,
      "",
      "Quedo atento(a) a la confirmación de stock y forma de pago.",
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(text) {
    const el = $("#toast");
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2200);
  }

  /* ---------- Formulario de contacto ---------- */
  function setupForm() {
    const form = $("#contactForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msgEl = $("#formMsg");
      if (!form.checkValidity()) {
        msgEl.textContent = "Por favor completa los campos obligatorios (*).";
        msgEl.className = "form__msg is-error";
        form.reportValidity();
        return;
      }
      const d = Object.fromEntries(new FormData(form));
      const msg = [
        "Hola NEXOPARTS, quiero cotizar:",
        `Nombre: ${d.nombre}`,
        `Teléfono: ${d.telefono}`,
        d.correo && `Correo: ${d.correo}`,
        d.empresa && `Empresa/RUT: ${d.empresa}`,
        d.marca && `Equipo: ${d.marca}`,
        `Tipo: ${d.tipo}`,
        "",
        `Repuesto: ${d.mensaje}`,
      ].filter(Boolean).join("\n");
      window.open(waLink(msg), "_blank", "noopener");
      msgEl.textContent = "¡Gracias! Abrimos WhatsApp con tu cotización lista para enviar.";
      msgEl.className = "form__msg is-ok";
      form.reset();
    });
  }

  /* ---------- Eventos ---------- */
  function bindEvents() {
    $("#productGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      addToCart(btn.dataset.add);
      toast(`Agregado: ${productById[btn.dataset.add].name}`);
    });

    $("#cartItems").addEventListener("click", (e) => {
      const qtyBtn = e.target.closest("[data-qty]");
      const removeBtn = e.target.closest("[data-remove]");
      if (qtyBtn) addToCart(qtyBtn.dataset.qty, Number(qtyBtn.dataset.delta));
      if (removeBtn) {
        delete cart[removeBtn.dataset.remove];
        saveCart();
        renderCart();
      }
      if (e.target.closest("[data-close-cart]")) closeCart();
    });

    $("#cartBtn").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#overlay").addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeCart());
    $("#checkoutBtn").addEventListener("click", checkout);
    $("#clearCart").addEventListener("click", () => {
      cart = {};
      saveCart();
      renderCart();
    });

    $("#searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      $("#catalogo").scrollIntoView({ behavior: "smooth" });
    });
    $("#searchInput").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderProducts();
    });

    $("#vehicleFilter").addEventListener("change", (e) => {
      state.vehicle = e.target.value;
      renderProducts();
    });
    $("#sortSelect").addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderProducts();
    });

    const nav = $("#nav");
    const toggle = $("#menuToggle");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("a", nav).forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  fillConfig();
  renderCategories();
  setCategory("all");
  renderCart();
  setupForm();
  bindEvents();
})();
