const reloj = document.getElementById("reloj");
const inicio = Date.now();

function tick() {
	const abierto = Date.now() - inicio;
	const atraso = Math.floor(abierto / 60000) * 1000;
	reloj.textContent = new Date(Date.now() - atraso).toLocaleTimeString("es-CL");
}

tick();
setInterval(tick, 1000);
