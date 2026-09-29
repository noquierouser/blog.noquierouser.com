---
title: Un reloj que atrasa a propósito
description: Ejemplo de layout lienzo con JS propio.
date: 2026-09-10
tags: [experimentos]
layout: layouts/canvas.njk
js: ["./assets/reloj.js"]
draft: true
---
Este es un ejemplo del layout **lienzo**. El texto sigue en la columna normal, pero lo que va dentro de un elemento con clase `ancho` usa todo el ancho de la página.

<div class="ancho reloj" id="reloj" aria-live="polite">--:--:--</div>

El reloj se atrasa un segundo por cada minuto que dejas la página abierta. Su CSS está en un `<style>` dentro del post y su JS en `assets/reloj.js`, declarado con `js:` en el front matter.

<style>
.reloj {
	font-family: var(--f-display);
	font-weight: 800;
	font-size: clamp(3rem, 15vw, 11rem);
	text-align: center;
	color: var(--fluor);
	font-variant-numeric: tabular-nums;
	letter-spacing: -0.04em;
}
</style>
