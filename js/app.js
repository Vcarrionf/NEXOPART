/* NEXOPARTS — lógica de la tienda: catálogo, vehículo, carrito y pedidos por WhatsApp. */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Íconos (trazo, 24x24) ---------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    truck: '<path d="M1 6h13v10H1zM14 9h4l3 3v4h-7"/><circle cx="5.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6"/>',
    store: '<path d="M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M9 20v-5h6v5"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8-1.3-1.3a4 4 0 0 0-5-5L13 5z" transform="translate(-2 0)"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="1.5"/><rect x="17" y="14" width="5" height="6" rx="1.5"/>',
    box: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="7"/>',
    brake: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M5 8a8 8 0 0 1 4-4M19 16a8 8 0 0 1-4 4"/>',
    spring: '<path d="M7 3h10M7 21h10M7 6l10 2.5L7 11l10 2.5L7 16l10 2.5"/>',
    engine: '<path d="M3 10h2V8h3V6h6v2h3l2 3h2v5h-2l-2 3H8l-3-3H3z"/><path d="M10 6V4h4v2"/>',
    filter: '<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    hitch: '<circle cx="12" cy="13" r="8"/><path d="M12 5v6M9 13h6"/><circle cx="12" cy="13" r="2"/>',
    axle: '<circle cx="5" cy="12" r="3"/><circle cx="19" cy="12" r="3"/><path d="M8 12h8"/><path d="M5 5v4M19 5v4M5 15v4M19 15v4"/>',
  };
  const WHATSAPP_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.1 19.7L3 29l6.5-1.8A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.2Z"/></svg>';

  const icon = (name) =>
    name === "whatsapp"
      ? WHATSAPP_SVG
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const hydrateIcons = (root = document) =>
    $$("i[data-icon]", root).forEach((el) => {
      el.outerHTML = `<span class="ico">${icon(el.dataset.icon)}</span>`;
    });

  /* ---------- Utilidades ---------- */
  const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
  const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const VEHICLE_LABEL = { tracto: "Tracto camión", semi: "Semirremolque" };
  const CART_KEY = "nexoparts_cart";
  const VEHICLE_KEY = "nexoparts_vehicle";

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const waLink = (msg) => `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  const openWhatsApp = (msg) => window.open(waLink(msg), "_blank", "noopener");

  const storage = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
    },
  };

  const PAGE_SIZE = 12;
  const state = { category: "all", sort: "featured", query: "", vehicle: storage.get(VEHICLE_KEY, null), limit: PAGE_SIZE };

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

  /* ---------- Menú de categorías y grilla ---------- */
  function renderCategories() {
    $("#catnavInner").innerHTML =
      CATEGORIES.map((c) => `
        <div class="catnav__item">
          <button class="catnav__btn" data-cat="${c.id}">
            ${icon(c.icon)}<span>${c.name}</span><span class="catnav__chev">${icon("chevron")}</span>
          </button>
          <div class="catnav__drop">
            ${c.subs.map((s) => `<button data-cat="${c.id}" data-q="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join("")}
            <button data-cat="${c.id}" class="catnav__all">Ver todo ${c.name} →</button>
          </div>
        </div>`).join("") +
      `<div class="catnav__extra">
        <a href="#marcas">Marcas</a><a href="#nosotros">Nosotros</a><a href="#faq">Preguntas frecuentes</a><a href="#contacto">Contacto</a>
      </div>`;

    $("#categoryGrid").innerHTML = CATEGORIES.map((c) => {
      const count = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `
        <button class="category" data-cat="${c.id}">
          <span class="category__icon">${icon(c.icon)}</span>
          <strong>${c.name}</strong>
          <small>${c.desc}</small>
          <em>${count} productos →</em>
        </button>`;
    }).join("");

    const chips = [{ id: "all", name: "Todos" }, ...CATEGORIES];
    $("#filterChips").innerHTML = chips
      .map((c) => `<button class="chip" role="tab" data-cat="${c.id}">${c.name}</button>`)
      .join("");

    // Un mismo manejador para menú, grilla y chips
    $$("#catnavInner, #categoryGrid, #filterChips").forEach((root) =>
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-cat]");
        if (!btn) return;
        const q = btn.dataset.q || "";
        state.query = q;
        $("#searchInput").value = q;
        setCategory(btn.dataset.cat);
        closeMenu();
        if (root.id !== "filterChips") $("#catalogo").scrollIntoView({ behavior: "smooth" });
      })
    );
  }

  function setCategory(id) {
    state.category = id;
    $$(".chip").forEach((c) => c.setAttribute("aria-selected", c.dataset.cat === id));
    renderProducts();
  }

  /* ---------- Productos ---------- */
  function fitsVehicle(p) {
    const v = state.vehicle;
    if (!v) return true;
    if (p.vehicle !== "ambos" && p.vehicle !== v.tipo) return false;
    return p.fits.length === 0 || p.fits.includes(v.marca);
  }

  function filteredProducts() {
    const q = normalize(state.query.trim());
    const list = PRODUCTS.filter((p) => {
      if (state.category !== "all" && p.cat !== state.category) return false;
      if (!fitsVehicle(p)) return false;
      if (q) {
        const haystack = normalize([p.name, p.id, p.sub, p.fits.join(" "), catById[p.cat].name].join(" "));
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
    return list.sort(sorters[state.sort]);
  }

  function renderProducts({ keepLimit = false } = {}) {
    if (!keepLimit) state.limit = PAGE_SIZE;
    const list = filteredProducts();

    $("#productGrid").innerHTML = list.slice(0, state.limit).map((p) => {
      const lowStock = p.stock <= 5;
      return `
        <article class="product">
          <div class="product__media">
            ${icon(catById[p.cat].icon)}
            ${p.featured ? '<span class="badge">Destacado</span>' : ""}
          </div>
          <span class="stock ${lowStock ? "stock--low" : ""}">
            ${lowStock ? `Últimas ${p.stock} unidades` : "Stock en bodega (envío inmediato)"}
          </span>
          <h3>${escapeHtml(p.name)}</h3>
          <p class="product__sub">${escapeHtml(p.sub)}</p>
          <p class="product__sku">SKU ${p.id}</p>
          <p class="price">${clp.format(p.price)}</p>
          <button class="btn btn--primary btn--block" data-add="${p.id}">${icon("cart")}Agregar al carrito</button>
        </article>`;
    }).join("");

    $("#emptyState").hidden = list.length > 0;
    const remaining = list.length - state.limit;
    $("#loadMore").hidden = remaining <= 0;
    $("#loadMore").textContent = `Ver más repuestos (${remaining})`;
    const catName = state.category === "all" ? "todas las categorías" : catById[state.category].name;
    $("#resultsInfo").textContent =
      `${list.length} producto${list.length === 1 ? "" : "s"} en ${catName}` +
      (state.query ? ` para “${state.query}”` : "");
  }

  /* ---------- Vehículo ---------- */
  function vehicleLabel(v) {
    return [v.marca, v.modelo, v.anio].filter(Boolean).join(" ");
  }

  function renderVehicle() {
    const v = state.vehicle;
    $("#vehicleBtnLabel").textContent = v ? vehicleLabel(v) : "Selecciona tu vehículo";
    $("#vehicleBtn").classList.toggle("is-set", Boolean(v));
    const box = $("#activeVehicle");
    box.hidden = !v;
    if (v) {
      box.innerHTML = `${icon("truck")}<span>Mostrando repuestos para <strong>${escapeHtml(VEHICLE_LABEL[v.tipo])} ${escapeHtml(vehicleLabel(v))}</strong></span>
        <button type="button" data-clear-vehicle>Quitar ✕</button>`;
    }
    renderProducts();
  }

  function fillBrandOptions() {
    const tipo = $("#vfTipo").value;
    $("#vfMarca").innerHTML = VEHICLE_BRANDS[tipo].map((b) => `<option>${b}</option>`).join("");
  }

  function openModal() {
    const v = state.vehicle;
    if (v) $("#vfTipo").value = v.tipo;
    fillBrandOptions();
    if (v) {
      $("#vfMarca").value = v.marca;
      $("#vfModelo").value = v.modelo || "";
      $("#vfAnio").value = v.anio || "";
    }
    $("#vehicleModal").hidden = false;
    document.body.classList.add("no-scroll");
    $("#vfTipo").focus();
  }

  function closeModal() {
    $("#vehicleModal").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  function setupVehicle() {
    const year = new Date().getFullYear();
    $("#vfAnio").innerHTML =
      '<option value="">Cualquier año</option>' +
      Array.from({ length: 30 }, (_, i) => `<option>${year + 1 - i}</option>`).join("");

    $("#vfTipo").addEventListener("change", fillBrandOptions);
    $("#vehicleBtn").addEventListener("click", openModal);
    $("#openVehicleAlt").addEventListener("click", openModal);
    $("#vehicleModal").addEventListener("click", (e) => {
      if (e.target.id === "vehicleModal" || e.target.closest("[data-close-modal]")) closeModal();
    });

    $("#vehicleForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      state.vehicle = { tipo: d.tipo, marca: d.marca, modelo: d.modelo.trim(), anio: d.anio };
      storage.set(VEHICLE_KEY, state.vehicle);
      closeModal();
      renderVehicle();
      $("#catalogo").scrollIntoView({ behavior: "smooth" });
    });

    const clear = () => {
      state.vehicle = null;
      storage.set(VEHICLE_KEY, null);
      renderVehicle();
    };
    $("#clearVehicle").addEventListener("click", () => { clear(); closeModal(); });
    $("#activeVehicle").addEventListener("click", (e) => e.target.closest("[data-clear-vehicle]") && clear());
  }

  /* ---------- Búsqueda por patente ---------- */
  function setupPlate() {
    const input = $("#plateInput");
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    });
    $("#plateForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const plate = input.value;
      // Formatos chilenos: BBBB12 (nuevo) o AB1234 (antiguo)
      if (!/^([A-Z]{4}\d{2}|[A-Z]{2}\d{4})$/.test(plate)) {
        input.classList.add("is-error");
        toast("Ingresa una patente válida, por ejemplo: ABCD12");
        input.focus();
        return;
      }
      input.classList.remove("is-error");
      openWhatsApp(`Hola NEXOPARTS, busco repuestos para el vehículo patente ${plate}. ¿Me ayudan a encontrar el repuesto exacto?`);
      toast(`Te ayudamos con la patente ${plate} por WhatsApp`);
    });
  }

  /* ---------- Cuenta regresiva de despacho ---------- */
  function setupCountdown() {
    const cutoff = STORE_CONFIG.cutoffHour;
    const pad = (n) => String(n).padStart(2, "0");
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Santiago", hour12: false, weekday: "short",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function tick() {
      const parts = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
      const day = WEEKDAYS.indexOf(parts.weekday);
      const nowSec = (Number(parts.hour) % 24) * 3600 + Number(parts.minute) * 60 + Number(parts.second);
      const cutSec = cutoff * 3600;
      const isWorkday = day >= 1 && day <= 5;

      let remaining;
      if (isWorkday && nowSec < cutSec) {
        remaining = cutSec - nowSec;
        $("#countdownText").textContent = `Compra antes de las ${cutoff}:00 y despachamos hoy`;
      } else {
        // Siguiente día hábil a la hora de corte
        let days = 1;
        while (![1, 2, 3, 4, 5].includes((day + days) % 7)) days++;
        remaining = days * 86400 - nowSec + cutSec;
        $("#countdownText").textContent = "Compra ahora y despachamos el próximo día hábil";
      }
      const h = Math.floor(remaining / 3600);
      $("#cdH").textContent = pad(h);
      $("#cdM").textContent = pad(Math.floor((remaining % 3600) / 60));
      $("#cdS").textContent = pad(remaining % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Carrito ---------- */
  let cart = Object.fromEntries(
    Object.entries(storage.get(CART_KEY, {})).filter(([id, qty]) => productById[id] && qty > 0)
  );

  function saveCart() {
    storage.set(CART_KEY, cart);
  }

  function addToCart(id, qty = 1) {
    cart[id] = Math.min((cart[id] || 0) + qty, productById[id].stock);
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  const cartTotal = () => Object.entries(cart).reduce((sum, [id, qty]) => sum + productById[id].price * qty, 0);

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
              <span class="cart-item__icon">${icon(catById[p.cat].icon)}</span>
              <div class="cart-item__info">
                <strong>${escapeHtml(p.name)}</strong>
                <small>SKU ${p.id} · ${clp.format(p.price)} c/u</small>
                <div class="qty">
                  <button data-qty="${id}" data-delta="-1" aria-label="Quitar uno">−</button>
                  <span>${qty}</span>
                  <button data-qty="${id}" data-delta="1" aria-label="Agregar uno">+</button>
                </div>
              </div>
              <div class="cart-item__side">
                <strong>${clp.format(p.price * qty)}</strong>
                <button class="cart-item__remove" data-remove="${id}">Eliminar</button>
              </div>
            </div>`;
        }).join("")
      : `<div class="cart__empty"><p>Tu carrito está vacío.</p><a href="#catalogo" class="btn btn--primary" data-close-cart>Ver repuestos</a></div>`;

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
      return `• ${qty} x ${p.name} (SKU ${p.id}) — ${clp.format(p.price * qty)}`;
    });
    const v = state.vehicle;
    openWhatsApp([
      "Hola NEXOPARTS, quiero realizar el siguiente pedido:",
      "",
      ...lines,
      "",
      `Total: ${clp.format(cartTotal())} (IVA incluido)`,
      v ? `Vehículo: ${VEHICLE_LABEL[v.tipo]} ${vehicleLabel(v)}` : "",
      "",
      "Quedo atento(a) a la confirmación de stock y forma de pago.",
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n"));
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(text) {
    const el = $("#toast");
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
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
      openWhatsApp([
        "Hola NEXOPARTS, quiero cotizar:",
        `Nombre: ${d.nombre}`,
        `Teléfono: ${d.telefono}`,
        d.patente ? `Patente: ${d.patente.toUpperCase()}` : null,
        d.empresa ? `Empresa/RUT: ${d.empresa}` : null,
        d.marca ? `Equipo: ${d.marca}` : null,
        `Tipo: ${d.tipo}`,
        "",
        `Repuesto: ${d.mensaje}`,
      ].filter((l) => l !== null).join("\n"));
      msgEl.textContent = "¡Gracias! Abrimos WhatsApp con tu cotización lista para enviar.";
      msgEl.className = "form__msg is-ok";
      form.reset();
    });
  }

  /* ---------- Menú móvil ---------- */
  function closeMenu() {
    $("#catnav").classList.remove("is-open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
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
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeCart();
      closeModal();
    });
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
    $("#loadMore").addEventListener("click", () => {
      state.limit += PAGE_SIZE;
      renderProducts({ keepLimit: true });
    });
    $("#sortSelect").addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderProducts();
    });

    $("#menuToggle").addEventListener("click", () => {
      const open = $("#catnav").classList.toggle("is-open");
      $("#menuToggle").setAttribute("aria-expanded", open);
    });
    $$(".catnav__extra a").forEach((a) => a.addEventListener("click", closeMenu));

    $("#waBubbleClose").addEventListener("click", () => $("#waBubble").classList.add("is-hidden"));
  }

  hydrateIcons();
  fillConfig();
  renderCategories();
  setCategory("all");
  setupVehicle();
  renderVehicle();
  setupPlate();
  setupCountdown();
  renderCart();
  setupForm();
  bindEvents();
})();
