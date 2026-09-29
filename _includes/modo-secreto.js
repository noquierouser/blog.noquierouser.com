// El secreto: cinco clics seguidos en cualquiera de los adornos del nombre cambian de modo.
// La elección queda guardada solo en este navegador.
(() => {
	const html = document.documentElement;
	if(html.hasAttribute("data-modo-fijo")) return;

	let clics = 0;
	let reinicio;

	for(const adorno of document.querySelectorAll(".marca .estrella")) {
		adorno.addEventListener("click", event => {
			event.preventDefault();
			clearTimeout(reinicio);
			reinicio = setTimeout(() => { clics = 0; }, 1500);
			if(++clics < 5) return;

			clics = 0;
			const nuevo = html.dataset.modo === "girlmode" ? "boymode" : "girlmode";
			html.dataset.modo = nuevo;
			try {
				nuevo === html.dataset.modoSitio ? localStorage.removeItem("modo") : localStorage.setItem("modo", nuevo);
			} catch {}
		});
	}
})();
