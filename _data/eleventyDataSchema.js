import { z } from "zod";

// Valida el front matter que usan las plantillas del blog
export default function() {
	return function(data) {
		// Note that drafts may be skipped in a preprocessor (see eleventy.config.js)
		// when doing a standard build (not --serve or --watch)
		let result = z.object({
			draft: z.optional(z.boolean()),
			// Fija el post en la portada
			pinned: z.optional(z.boolean()),
			// Fuerza la paleta de esta página, ignorando la del sitio y la elegida en secreto
			modo: z.optional(z.enum(["girlmode", "boymode"])),
			// Hojas de estilo y scripts extra (URLs) para páginas experimentales
			css: z.optional(z.array(z.string())),
			js: z.optional(z.array(z.string())),
		}).safeParse(data);

		if(result.error) {
			throw new Error(z.prettifyError(result.error));
		}
	}
}
