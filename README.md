# NEXOPARTS.CL

Sitio web de **NEXOPARTS**, tienda de repuestos para tracto camiones y semirremolques en Chile.

Es un sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación) con:

- Catálogo con búsqueda, filtros por categoría y tipo de vehículo, y ordenamiento.
- Carrito de compras guardado en el navegador.
- Pedido y cotización que se envían por **WhatsApp** con el detalle ya escrito.
- Secciones de categorías, marcas, nosotros, preguntas frecuentes y contacto.
- Diseño adaptable a celulares.

## Estructura

```
index.html          Página principal
css/styles.css      Estilos
js/products.js      Datos de contacto, categorías y productos (editar aquí)
js/app.js           Lógica de la tienda
assets/favicon.svg  Ícono
CNAME               Dominio para GitHub Pages (nexoparts.cl)
```

## Antes de publicar

Edita `STORE_CONFIG` en `js/products.js` con los datos reales:

- `whatsapp`: número en formato internacional sin `+` ni espacios (ej. `56912345678`).
- `phoneDisplay`, `email`, `address`.

Los productos y precios (CLP, IVA incluido) de `PRODUCTS` son de ejemplo; reemplázalos por tu inventario.

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
```

## Publicar en nexoparts.cl (GitHub Pages)

1. En GitHub: *Settings → Pages*, origen la rama principal, carpeta `/ (root)`.
2. En NIC Chile / tu proveedor DNS, crea registros `A` para `nexoparts.cl` apuntando a
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   y un `CNAME` para `www` apuntando a `vcarrionf.github.io`.
3. Activa *Enforce HTTPS* una vez validado el dominio.
