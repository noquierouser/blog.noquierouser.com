import { DateTime } from "luxon";

// Días durante los que un post lleva el sticker "nuevo!"
const DIAS_NUEVO = 14;

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" })
			.setLocale("es")
			.toFormat(format || "d LLL yyyy")
			.replace(".", "");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	// Post fijado más reciente, o nada
	eleventyConfig.addFilter("pinnedPost", posts =>
		(posts || []).filter(post => post.data.pinned).at(-1)
	);

	// Posts del más nuevo al más viejo, sin el que está fijado
	eleventyConfig.addFilter("newestWithout", (posts, excluded) =>
		(posts || []).filter(post => post !== excluded).reverse()
	);

	// Array.slice, porque el `slice` de Nunjucks hace otra cosa
	eleventyConfig.addFilter("sliceItems", (array, start, end) => (array || []).slice(start, end));

	// [{ year, posts }] del año más reciente al más antiguo
	eleventyConfig.addFilter("groupByYear", posts => {
		let groups = [];
		for(let post of [...(posts || [])].reverse()) {
			let year = post.date.getUTCFullYear();
			if(groups.at(-1)?.year !== year) {
				groups.push({ year, posts: [] });
			}
			groups.at(-1).posts.push(post);
		}
		return groups;
	});

	eleventyConfig.addFilter("isNew", dateObj =>
		(Date.now() - dateObj.getTime()) < DIAS_NUEVO * 24 * 60 * 60 * 1000
	);

	eleventyConfig.addFilter("readingTime", html => {
		let words = stripHtml(html).split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.round(words / 200));
	});

	// Primer párrafo del post como texto plano, para cuando no hay `description`
	eleventyConfig.addFilter("excerpt", html => {
		let match = (html || "").match(/<p[^>]*>([\s\S]*?)<\/p>/);
		if(!match) {
			return "";
		}
		// Las notas al margen no tienen sentido fuera del post
		let text = stripHtml(match[1].replace(/<span class="nota"[\s\S]*?<\/span>/g, ""));
		return text.length > 240 ? text.slice(0, 240).replace(/\s+\S*$/, "") + "…" : text;
	});
};

function stripHtml(html) {
	return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
