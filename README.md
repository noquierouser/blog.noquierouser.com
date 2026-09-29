# blog.noquierouser.com

Blog personal hecho con [Eleventy](https://www.11ty.dev/) a partir de [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog). Se publica en GitHub Pages.

```sh
npm install
npm start        # servidor local con borradores, en http://localhost:8080
npm run build    # compila a _site/ sin borradores
```

## Escribir un post

Crea `content/blog/mi-post.md` (o `content/blog/mi-post/index.md` si lleva imágenes u otros archivos):

```md
---
title: Volver a escribir
description: Opcional. Si no está, la portada usa el primer párrafo.
date: 2026-09-28
tags: [personal, blog]
pinned: true   # opcional: lo fija arriba en la portada
draft: true    # opcional: se ve con npm start, pero no se publica
---
Texto del post…
```

La portada muestra el post fijado, los 3 más recientes con extracto y los 5 siguientes solo con título. Los posts de menos de 14 días llevan el sticker "nuevo!".

`content/blog/guia-de-estilo.md` es un borrador con todos los elementos del theme. Ábrelo con `npm start` para verlos.

## Shortcodes

| Qué | Cómo |
| --- | --- |
| Nota al margen | `Una frase.{% sidenote %}comentario al paso{% endsidenote %}` |
| Sticker | `{% sticker "nuevo!" %}` o `{% sticker "ojo", "claro" %}` |
| Caja | `{% aside "Nota técnica" %}texto en markdown{% endaside %}` |
| Cita grande | `{% pullquote %}una frase{% endpullquote %}` |
| Polaroid | `{% polaroid "./foto.jpg", "pie de foto", "texto alternativo" %}` |
| Resaltador | `<mark>texto</mark>` |

## Experimentos

Hay dos formas de hacer una página distinta a las demás:

- **Lienzo** (`layout: layouts/canvas.njk`): conserva la cabecera, el pie, la fecha y los tags. El texto va en la columna normal, y lo que tenga la clase `ancho` usa todo el ancho de la página. Ejemplo: `content/blog/reloj-que-atrasa/`.
- **Sin layout** (`layout: false`): la página es HTML propio de principio a fin. Igual aparece en la portada, el archivo y el feed. Ejemplo: `content/blog/pagina-libre/`.

Para el CSS y el JS propios de una página:

- Un `<style>` o `<script>` dentro del post se suma a los bundles de esa página.
- Los archivos van en una carpeta `assets/` junto al post y se declaran en el front matter con `css: ["./assets/x.css"]` o `js: ["./assets/x.js"]`.

Ojo: las carpetas `assets/` se copian siempre, aunque el post sea un borrador.

## girlmode y boymode

El blog tiene dos paletas. **girlmode** es la de verdad: rosa, con ♡ en la cabecera, ☆ en los títulos de sección y letra manuscrita Caveat. **boymode** es el disfraz: azul, con ★ y letra Kalam.

- **Para todo el sitio:** `modo` en `_data/metadata.js`. Hoy dice `"boymode"`. Para salir del closet, cámbialo a `"girlmode"` y haz push.
- **Para un post:** `modo: girlmode` (o `boymode`) en el front matter. Esa página siempre se ve así.
- **El secreto:** cinco clics seguidos en los adornos de la cabecera (★ o ♡) cambian de modo. También sirve entrar con `#girlmode` o `#boymode` al final de la URL. La elección queda guardada solo en ese navegador, y los posts con `modo` fijo no se ven afectados.
- **Contenido según el modo:** en los posts usa `{% girlmode %}…{% endgirlmode %}` y `{% boymode %}…{% endboymode %}`. En las plantillas, agrega `data-solo="girlmode"` o `data-solo="boymode"` a cualquier elemento, como el saludo de `content/index.njk`. El feed RSS no tiene CSS, así que ahí aparecen los dos textos.
- **Vista previa en redes sociales:** usa el modo del post si tiene `modo` en el front matter, y si no, el del sitio. Las imágenes son `public/img/tarjeta-{girlmode,boymode}.png` y salen de `content/tarjeta.njk`. Si cambias el nombre, la descripción o los colores, regenéralas con `./scripts/tarjetas.sh` (necesita Firefox).
- **Colores y adornos:** están en `css/index.css`. Arriba, en `:root`, van los de girlmode; más abajo, en `:root[data-modo="boymode"]`, los de boymode.

## Adornos

Los símbolos se escriben tal cual, en cualquier texto, y siempre se dibujan con una fuente de adornos gracias a `unicode-range`:

- **♡ ♥ ★ ☆ ♪ ※** salen de Gamja Flower en girlmode y de Hachi Maru Pop en boymode.
- **El resto** (✧ ✦ ✶ ✿ ❀ ☕ ✎ ✔ ➜ …) sale de Noto Sans Symbols 2, porque ninguna fuente manuscrita los trae.

Son recortes de 1 a 6 KB que están en `public/fonts/adornos*.woff2`. Para agregar un símbolo, edita `scripts/adornos.sh`, córrelo (necesita `pip install fonttools brotli`) y copia el `unicode-range` que imprime en `css/fonts.css`.

## Personalizar

- **Colores, tipografía y medidas:** están como variables al principio de `css/index.css`.
- **El nombre de la cabecera:** está en `_includes/marca.njk`. Para usar una versión manuscrita, reemplaza el texto por un `<img>` o un `<svg>`.
- **Datos del sitio:** `_data/metadata.js`.
- **Texto de la portada:** `content/index.njk`.

## Publicar

`.github/workflows/deploy.yml` compila y publica en cada push a `main`. Hay que hacer esto una sola vez:

1. En GitHub, en *Settings → Pages*, elegir **GitHub Actions** como *Source*.
2. En el DNS de `noquierouser.com`, crear un registro `CNAME` de `blog` a `<usuario>.github.io`.
3. En *Settings → Pages*, poner `blog.noquierouser.com` como dominio y activar *Enforce HTTPS*. El archivo `public/CNAME` ya lo tiene.
