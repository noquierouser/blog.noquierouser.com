// Shortcodes para escribir posts. Ver README.md para ejemplos de uso.
export default function(eleventyConfig) {
	let md;
	eleventyConfig.amendLibrary("md", lib => { md = lib; });

	// El HTML que devuelven no puede tener líneas en blanco ni sangría,
	// o markdown-it lo corta en pedazos o lo trata como bloque de código.
	const compact = html => html.trim().replace(/\n\s*\n/g, "\n").replace(/^\s+/gm, "");

	// Nota al margen: {% sidenote %}texto en _markdown_{% endsidenote %}
	// Va dentro de un párrafo, justo después de la frase que comenta.
	eleventyConfig.addPairedShortcode("sidenote", content =>
		`<span class="nota">${md.renderInline(content.trim())}</span>`
	);

	// Sticker suelto: {% sticker "nuevo!" %} o {% sticker "ojo", "claro" %}
	eleventyConfig.addShortcode("sticker", (text, variant = "") =>
		`<span class="sticker${variant ? ` ${variant}` : ""}">${text}</span>`
	);

	// Caja: {% aside "Nota técnica" %}texto{% endaside %}
	eleventyConfig.addPairedShortcode("aside", (content, label = "Nota") =>
		compact(`<aside class="aside"><span class="etiqueta">${label}</span>${md.render(content.trim())}</aside>`)
	);

	// Cita grande: {% pullquote %}una frase{% endpullquote %}
	eleventyConfig.addPairedShortcode("pullquote", content =>
		`<p class="pullquote"><span>${md.renderInline(content.trim())}</span></p>`
	);

	// Contenido que solo aparece en un modo:
	//   {% girlmode %}texto en markdown{% endgirlmode %}
	//   {% boymode %}texto en markdown{% endboymode %}
	// Ojo: el feed RSS no tiene CSS, así que ahí se ven los dos.
	for(let modo of ["girlmode", "boymode"]) {
		eleventyConfig.addPairedShortcode(modo, content =>
			compact(`<div data-solo="${modo}">${md.render(content.trim())}</div>`)
		);
	}

	// Foto con marco: {% polaroid "./foto.jpg", "pie de foto", "texto alternativo" %}
	// La ruta es relativa al post; eleventy-img la optimiza sola.
	eleventyConfig.addShortcode("polaroid", (src, caption = "", alt = caption) =>
		`<figure class="polaroid"><img src="${src}" alt="${alt}" eleventy:widths="400,800"><figcaption>${caption}</figcaption></figure>`
	);
};
