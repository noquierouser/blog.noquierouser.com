---
title: Guía de estilo
description: Todos los elementos que puede tener un post, para ver cómo se ven.
date: 2026-09-20
tags: [blog, 11ty]
draft: true
---
Este post muestra todo lo que el theme sabe hacer. Queda como borrador, así que se ve con `npm start` pero nunca se publica.{% sidenote %}una nota al margen, con _markdown_ y [links](/){% endsidenote %} Los links llevan subrayado ondulado, y lo importante se puede <mark>marcar con resaltador</mark> usando `<mark>`.

Un párrafo normal para ver el ritmo del texto. La columna está pensada para unas 65 letras por línea, que es lo que se lee más cómodo, y el interlineado es generoso a propósito.

## Stickers

Un sticker en medio de una frase: {% sticker "nuevo!" %} y otro en versión clara: {% sticker "ojo", "claro" %}.

## Cajas

{% aside "Nota técnica" %}
Esto es un `aside`. Acepta **markdown** normal, incluyendo [links](/) y listas:

- una cosa
- otra cosa
{% endaside %}

## Según el modo

{% girlmode %}
Este párrafo solo se ve en **girlmode**.
{% endgirlmode %}

{% boymode %}
Este párrafo solo se ve en **boymode**.
{% endboymode %}

## Citas

{% pullquote %}Escribir aunque salga mal es mejor que no escribir.{% endpullquote %}

> Y esta es una cita normal de markdown, para cuando la frase es de otra persona.

## Código

```js
// Un bloque de código con resaltado
export function saludar(nombre) {
	return `hola, ${nombre}`;
}
```

## Listas

1. Primero esto
2. Después esto
3. Y al final esto

---

Y con eso termina la guía.
