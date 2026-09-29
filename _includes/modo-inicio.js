// Aplica el modo elegido en secreto por esta visita (ver modo-secreto.js).
// Entrar con #girlmode o #boymode en la URL también lo elige.
(() => {
	const html = document.documentElement;
	if(html.hasAttribute("data-modo-fijo")) return;

	const modos = ["girlmode", "boymode"];
	const hash = location.hash.slice(1);
	let elegido;

	if(modos.includes(hash)) {
		elegido = hash;
		// Saca el #modo de la URL para que no viaje si alguien la copia
		history.replaceState(null, "", location.pathname + location.search);
	}

	try {
		if(elegido) {
			elegido === html.dataset.modoSitio ? localStorage.removeItem("modo") : localStorage.setItem("modo", elegido);
		} else {
			elegido = localStorage.getItem("modo");
		}
	} catch {}

	if(modos.includes(elegido)) {
		html.dataset.modo = elegido;
	}
})();
