Window.onerror = function(msg, url, line) {
    alert("⚠️ ERROR EN SCRIPT: " + msg + " (Línea: " + line + ")");
};

// Función para iniciar la música de fondo desde el body (onclick)
function iniciarAudioFondo() {
    if (!musicStarted && !musicMuted) {
        bgMusic.play().then(() => { musicStarted = true; }).catch(e => {});
    }
}

const nivelesJuego = [
    { nombre: "1 Centavo",   clicsMeta: 800,      imagen: 'Moneda_1c.png', esBillete: false },
    { nombre: "5 Centavos",  clicsMeta: 900,      imagen: 'moneda_5c.png', esBillete: false },
    { nombre: "10 Centavos", clicsMeta: 1000,     imagen: 'moneda_10c.png', esBillete: false },
    { nombre: "25 Centavos", clicsMeta: 1100,     imagen: 'moneda_25c.png', esBillete: false },
    { nombre: "50 Centavos", clicsMeta: 1200,     imagen: 'moneda_50c.png', esBillete: false },
    { nombre: "1 Peso",      clicsMeta: 1300,     imagen: 'moneda_1p.png', esBillete: false },
    { nombre: "2 Pesos",     clicsMeta: 1400,     imagen: 'billete_2p.png', esBillete: true },
    { nombre: "5 Pesos",     clicsMeta: 1500,     imagen: 'billete_5p.png', esBillete: true },
    { nombre: "10 Pesos",    clicsMeta: 1600,     imagen: 'billete_10p.png', esBillete: true },
    { nombre: "20 Pesos",    clicsMeta: 1700,     imagen: 'billete_20p.png', esBillete: true },
    { nombre: "50 Pesos",    clicsMeta: 1800,     imagen: 'billete_50p.png', esBillete: true },
    { nombre: "100 Pesos",   clicsMeta: 1900,     imagen: 'billete_100p.png', esBillete: true },
    { nombre: "200 Pesos",   clicsMeta: 2000,     imagen: 'billete_200p.png', esBillete: true },
    { nombre: "500 Pesos",   clicsMeta: 2100,     imagen: 'billete_500p.png', esBillete: true },
    { nombre: "1000 Pesos",  clicsMeta: 2200,     imagen: 'billete_1000p.png', esBillete: true },
    { nombre: "2000 Pesos",  clicsMeta: 2300,     imagen: 'billete_2000p.png', esBillete: true },
    { nombre: "10000 Pesos", clicsMeta: 2400,     imagen: 'billete_10000p.png', esBillete: true },
    { nombre: "20000 Pesos", clicsMeta: 2500,     imagen: 'billete_20000p.png', esBillete: true }
];

let usuarioNombre = "Jugador";
let usuarioId = "#777";

let dineroClicks = 0.00;   
let score = 0.00;          
let pozoAcumulado = 0.00;  

let energy = 1000;
let maxEnergy = 1000; 
let nivelPrestigio = 0; 

let nivelActualIndex = 0;
let clicsEnNivelActual = 0;
let musicStarted = false;
let musicMuted = false;
let multiplicadorClic = 1;

let estrellas = 0; 
let skinEquipada = 'inicio';
let skinsCompradas = { 'inicio': true };

let ticketActualNombre = "";
let ticketActualPrecioPesos = "";

let raspaditaCosto = 0;
let raspaditaEfectivoPremio = 0;
let raspaditaEstrellasPremio = 0;
let raspaditaPozoPremio = 0;
let raspaditaProbabilidad = 5;
let casillasRaspadas = [false, false, false];
let simbolosCasillas = ['', '', ''];
let ganoRaspadita = false;

// Estado del Modo Suerte en Raspaditas
let modoSuerteActivo = false;
let temporizadorModoSuerte = null;

let intervaloAutoclick = null;
let relojTemporizador = null;

let bonusSeleccionadoMultiplicador = 2;
let costoEnergiaActual = 1000;
let descripcionCanjeActual = "$1.000";

// CONFIGURACIÓN DE SKINS Y FONDOS
const skinsConfig = {
  'inicio': { nombre: 'INICIO', imagen: 'pj_botines_inicio.png', targetImg: null, fondo: 'fondo_inicio.png', bonusValor: 1 },
  
  'skin_gaucho': { nombre: 'el gaucho argentino', imagen: 'skin_gaucho.png', targetImg: null, fondo: 'fondo_gaucho.jpg', bonusValor: 1 },
  'skin_basurero': { nombre: 'recolector martin y martin', imagen: 'skin_basurero.png', targetImg: null, fondo: 'fondo_basurero.jpg', bonusValor: 1 },
  'skin_alumnapublica': { nombre: 'luci En la escuela', imagen: 'skin_alumnapublica.png', targetImg: null, fondo: 'fondo_alumnapublica.jpg', bonusValor: 1 },
  'skin_alumnopublico': { nombre: 'estudiante BOTIN', imagen: 'skin_alumnopublico.png', targetImg: null, fondo: 'fondo_alumnopublico.jpg', bonusValor: 1 },
  'skin_alumnaprivada': { nombre: 'luci de la siglo', imagen: 'skin_alumnaprivada.png', targetImg: null, fondo: 'fondo_alumnaprivada.jpg', bonusValor: 1 },
  'skin_alumnoprivado': { nombre: 'gonza estudiante', imagen: 'skin_alumnoprivado.png', targetImg: null, fondo: 'fondo_alumnoprivado.jpg', bonusValor: 1 },
  'skin_delivery': { nombre: 'Delivery BOTIN', imagen: 'skin_delivery.png', targetImg: null, fondo: 'fondo_delivery.jpg', bonusValor: 1 },
  'skin_colectivero': { nombre: 'colectivero BOTIN', imagen: 'skin_colectivero.png', targetImg: null, fondo: 'fondo_colectivero.jpg', bonusValor: 1 },
  'skin_ciudadano': { nombre: 'el gaucho BOTIN', imagen: 'skin_ciudadano.png', targetImg: null, fondo: 'fondo_ciudadano.jpg', bonusValor: 1 },
  'skin_chicaurbana': { nombre: 'cata urbana', imagen: 'skin_chicaurbana.png', targetImg: null, fondo: 'fondo_chicaurbana.jpg', bonusValor: 1 },
  'skin_bombero': { nombre: 'bombero BOTIN', imagen: 'skin_bombero.png', targetImg: null, fondo: 'fondo_bombero.jpg', bonusValor: 1 },
  'skin_laferrere': { nombre: 'jugador de lafe BOTIN', imagen: 'skin_laferrere.png', targetImg: null, fondo: 'fondo_laferrere.jpg', bonusValor: 1 },
  'skin_almirantebrown': { nombre: 'jugador pirata BOTIN', imagen: 'skin_almirantebrown.png', targetImg: null, fondo: 'fondo_almirantebrown.jpg', bonusValor: 1 },
  'skin_moron': { nombre: 'jugador de moron BOTIN', imagen: 'skin_moron.png', targetImg: null, fondo: 'fondo_moron.jpg', bonusValor: 1 },
  'skin_boca': { nombre: 'jugador de boca BOTIN', imagen: 'skin_boca.png', targetImg: null, fondo: 'fondo_boca.jpg', bonusValor: 1 },
  'skin_river': { nombre: 'jugador de river BOTIN', imagen: 'skin_river.png', targetImg: null, fondo: 'fondo_river.jpg', bonusValor: 1 },
  'skin_argentina2': { nombre: 'jugador argento BOTIN', imagen: 'skin_argentina2.png', targetImg: null, fondo: 'fondo_argentina2.jpg', bonusValor: 1 },

  // Skins de Harry Potter y Voldemort con sus precios y fondos exactos
  'skin_harrypotter': { nombre: 'harry potter', imagen: 'skin_harrypotter.png', targetImg: null, fondo: 'fondo_harrypotter.jpg', bonusValor: 1, precioEstrellas: 120 },
  'skin_voldemort': { nombre: 'voldemort', imagen: 'skin_voldemort.png', targetImg: null, fondo: 'fondo_voldemort.jpg', bonusValor: 1, precioEstrellas: 100 },

  // Billetes de Oro
  'ciudadano_oro': { nombre: 'CIUDADANO ORO', imagen: 'skin_ciudadano.png', targetImg: 'billete_100_oro.png', fondo: 'fondo_ciudadano_oro.jpg', bonusValor: 15000, precioEstrellas: 120 },
  'presidente_oro': { nombre: 'PRESIDENTE ORO', imagen: 'skin_presidente.png', targetImg: 'billete_200_oro.png', fondo: 'fondo_presidente_oro.jpg', bonusValor: 32000, precioEstrellas: 135 },
  'tanguero_oro': { nombre: 'TANGUERO ORO', imagen: 'skin_tanguero.png', targetImg: 'billete_500_oro.png', fondo: 'fondo_tanguero_oro.jpg', bonusValor: 90000, precioEstrellas: 200 },
  'soldado_oro': { nombre: 'SOLDADO ORO', imagen: 'skin_soldado.png', targetImg: 'billete_1000_oro.png', fondo: 'fondo_soldado_oro.jpg', bonusValor: 200000, precioEstrellas: 330 },
  'messi_oro': { nombre: 'MESSI ORO', imagen: 'skin_messi.png', targetImg: 'billete_2000_oro.png', fondo: 'fondo_argentina.jpg', bonusValor: 500000, precioEstrellas: 500 },
  'gaucho_oro_10k': { nombre: 'BILLETE 10000 ORO', imagen: 'skin_gaucho_oro.png', targetImg: 'billete_10000_oro.png', fondo: 'fondo_gaucho_oro.png', bonusValor: 3000000, precioEstrellas: 660 },
  'rapero_oro': { nombre: 'RAPERO ORO', imagen: 'skin_raperourbano.png', targetImg: 'billete_20000_oro.png', fondo: 'fondo_raperourbano_oro.jpg', bonusValor: 8000000, precioEstrellas: 1300 },
  'gaucho_oro': { nombre: 'EL GAUCHO DE ORO', imagen: 'skin_gaucho_oro.png', targetImg: 'billete_10000_oro.png', fondo: 'fondo_gaucho_oro.png', bonusValor: 3000000, precioEstrellas: 150 },
  
  // Fondos Libres de Prestigio
  'fondo_nuevo_gaucho': { nombre: 'Fondo El Gaucho', imagen: 'fondo_nuevo_gaucho.jpg', targetImg: null, fondo: 'fondo_nuevo_gaucho.jpg', bonusValor: 1 },
  'fondo_nuevo_soldado': { nombre: 'Fondo Malvinas', imagen: 'fondo_nuevo_soldado.jpg', targetImg: null, fondo: 'fondo_nuevo_soldado.jpg', bonusValor: 1 },
  'fondo_nuevo_tanguero': { nombre: 'Fondo El Tanguero', imagen: 'fondo_nuevo_tanguero.jpg', targetImg: null, fondo: 'fondo_nuevo_tanguero.jpg', bonusValor: 1 },
  'fondo_nuevo_seleccion': { nombre: 'Fondo Selección', imagen: 'fondo_nuevo_seleccion.jpg', targetImg: null, fondo: 'fondo_nuevo_seleccion.jpg', bonusValor: 1 },
  'fondo_nuevo_asado': { nombre: 'Fondo El Asado', imagen: 'fondo_nuevo_asado.jpg', targetImg: null, fondo: 'fondo_nuevo_asado.jpg', bonusValor: 1 },
  'fondo_nuevo_truco': { nombre: 'Fondo Truco', imagen: 'fondo_nuevo_truco.jpg', targetImg: null, fondo: 'fondo_nuevo_truco.jpg', bonusValor: 1 },
  'fondo_nuevo_tren': { nombre: 'Fondo Tren', imagen: 'fondo_nuevo_tren.jpg', targetImg: null, fondo: 'fondo_nuevo_tren.jpg', bonusValor: 1 },
  'fondo_nuevo_boliche': { nombre: 'Fondo Boliche', imagen: 'fondo_nuevo_boliche.jpg', targetImg: null, fondo: 'fondo_nuevo_boliche.jpg', bonusValor: 1 },
  'fondo_nuevo_kiosco': { nombre: 'Fondo Maxikiosco', imagen: 'fondo_nuevo_kiosco.jpg', targetImg: null, fondo: 'fondo_nuevo_kiosco.jpg', bonusValor: 1 },
  'fondo_nuevo_colectivo': { nombre: 'Fondo Colectivo', imagen: 'fondo_nuevo_colectivo.jpg', targetImg: null, fondo: 'fondo_nuevo_colectivo.jpg', bonusValor: 1 },

  // Nuevas Skins de Terror
  'skin_jeyson': { nombre: 'jeyson', imagen: 'skin_jeyson.png', targetImg: null, fondo: 'fondo_jeyson.jpg', bonusValor: 1, precioEstrellas: 180 },
  'skin_scream': { nombre: 'scream', imagen: 'skin_scream.png', targetImg: null, fondo: 'fondo_scream.jpg', bonusValor: 1, precioEstrellas: 150 },

  // Skins VIP (Estrellas)
  'skin_campeondelmundo': { nombre: 'BOTIN CAMPEON', imagen: 'skin_campeondelmundo.png', targetImg: null, fondo: 'fondo_campeondelmundo.jpg', bonusValor: 1, precioEstrellas: 500 },
  'skin_fredy': { nombre: 'fredy krueger', imagen: 'skin_fredy.png', targetImg: null, fondo: 'fondo_fredy.jpg', bonusValor: 1 },
  'skin_terminator': { nombre: 'terminator', imagen: 'skin_terminator.png', targetImg: null, fondo: 'fondo_terminator.jpg', bonusValor: 1 },
  'skin_tiff': { nombre: 'tiff novia de chucky', imagen: 'skin_tiff.png', targetImg: null, fondo: 'fondo_tiff.jpg', bonusValor: 1 },
  'skin_payaso': { nombre: 'el payaso pennywise', imagen: 'skin_payaso.png', targetImg: null, fondo: 'fondo_payaso.jpg', bonusValor: 1 },
  'skin_michael': { nombre: 'michael myers', imagen: 'skin_michael.png', targetImg: null, fondo: 'fondo_michael.jpg', bonusValor: 1 },

  'skin_messi': { nombre: 'messi BOTIN', imagen: 'skin_messi.png', targetImg: null, fondo: 'fondo_argentina.jpg', bonusValor: 1 },
  'skin_realmadrid': { nombre: 'BOTIN merengue', imagen: 'skin_realmadrid.png', targetImg: null, fondo: 'fondo_realmadrid.jpg', bonusValor: 1 },
  'skin_barcelona': { nombre: 'BOTIN BARCELONA', imagen: 'skin_barcelona.png', targetImg: null, fondo: 'fondo_barcelona.jpg', bonusValor: 1 },
  'skin_policia': { nombre: 'policia botin', imagen: 'skin_policia.png', targetImg: null, fondo: 'fondo_policia.jpg', bonusValor: 1 },
  'skin_doctor': { nombre: 'doctor BOTIN', imagen: 'skin_doctor.png', targetImg: null, fondo: 'fondo_doctor.jpg', bonusValor: 1 },
  'skin_doctora': { nombre: 'la doctora cata', imagen: 'skin_doctora.png', targetImg: null, fondo: 'fondo_doctora.jpg', bonusValor: 1 },
  'skin_chucky': { nombre: 'chucky', imagen: 'skin_chucky.png', targetImg: null, fondo: 'fondo_chucky.jpg', bonusValor: 1 },
  'skin_batman': { nombre: 'batman', imagen: 'skin_batman.png', targetImg: null, fondo: 'fondo_batman.jpg', bonusValor: 1 },
  'skin_joker': { nombre: 'el joker', imagen: 'skin_joker.png', targetImg: null, fondo: 'fondo_joker.jpg', bonusValor: 1 },
  'skin_superman': { nombre: 'superman', imagen: 'skin_superman.png', targetImg: null, fondo: 'fondo_superman.jpg', bonusValor: 1 },
  'skingoku4': { nombre: 'goku ssj4', imagen: 'skingoku4.png', targetImg: null, fondo: 'fondo_goku4.jpg', bonusValor: 1 }
};

const codigosValidos = {
  "ESTRELLAS100": { tipo: "estrellas", cantidad: 5000, nombre: "5000 Estrellas" },
  "GAUCHO2026": { tipo: "skin", id: "gaucho_oro", nombre: "Skin El Gaucho de Oro" }
};

const bgMusic = new Audio('proyecto botin.ogg');
bgMusic.loop = true;
const sonidoClicMoneda = new Audio('clic_moneda.mp3');
sonidoClicMoneda.volume = 0.4;

const poolSonidosClic = [
    new Audio('clic_moneda.mp3'),
    new Audio('clic_moneda.mp3'),
    new Audio('clic_moneda.mp3')
];
poolSonidosClic.forEach(s => s.volume = 0.3);
let indicePoolAudio = 0;

function reproducirSonidoClicFluido() {
    try {
        let audioActual = poolSonidosClic[indicePoolAudio];
        audioActual.currentTime = 0;
        audioActual.play().catch(e => {});
        indicePoolAudio = (indicePoolAudio + 1) % poolSonidosClic.length;
    } catch(e) {
        try {
            sonidoClicMoneda.currentTime = 0;
            sonidoClicMoneda.play().catch(e => {});
        } catch(err) {}
    }
}

const sonidoCambioMoneda = document.getElementById('sound-cambio-moneda');
const audioGanarOro = document.getElementById('sound-ganar-oro');
const audioGanarMonedaPozo = document.getElementById('sound-ganar-monedadepozo');
const audioGanarEstrellas = document.getElementById('sound-ganar-estrellas');
const audioPerder = document.getElementById('perder');

document.addEventListener('DOMContentLoaded', () => {
  cargarPartida(); 
  verificarEstructuraBarraProgreso();
  crearContenedorTemporizador();
  actualizarUI();
  
  setInterval(() => {
    if (energy < maxEnergy) {
      energy = Math.min(maxEnergy, energy + 2);
      actualizarUI();
    }
  }, 5000);

  const barraSuperior = document.querySelector('.top-energy-bar');
  if (barraSuperior && !document.getElementById('btn-toggle-music')) {
    const btnMusic = document.createElement('button');
    btnMusic.id = 'btn-toggle-music';
    btnMusic.innerText = '🎵 MÚSICA: ON';
    btnMusic.style.cssText = 'background: #238636; color: #fff; border: none; padding: 2px 6px; border-radius: 6px; font-size: 9px; font-weight: bold; cursor: pointer;';
    btnMusic.onclick = toggleMusica;
    barraSuperior.appendChild(btnMusic);
  }

  const botonesNavegacion = document.querySelectorAll('.nav-btn-orig, button');
  botonesNavegacion.forEach(btn => {
    btn.addEventListener('touchstart', (e) => {}, { passive: true });
  });
});

function cambiarNombreUsuario() {
    let nuevoNombre = prompt("Ingresá tu nombre de usuario:", usuarioNombre);
    if (nuevoNombre && nuevoNombre.trim() !== "") {
        usuarioNombre = nuevoNombre.trim();
        const displayUser = document.getElementById('display-username');
        if (displayUser) displayUser.innerText = usuarioNombre;
        guardarPartida();
    }
}

function abrirModalInfo() {
    const modal = document.getElementById('modal-info-general');
    if (modal) modal.style.display = 'flex';
}

function cerrarModalInfo() {
    const modal = document.getElementById('modal-info-general');
    if (modal) modal.style.display = 'none';
}

function crearContenedorTemporizador() {
    const juegoArea = document.querySelector('#screen-juego');
    if (juegoArea && !document.getElementById('badge-temporizador-autoclick')) {
        const tempDiv = document.createElement('div');
        tempDiv.id = 'badge-temporizador-autoclick';
        tempDiv.style.cssText = `
            display: none; background: rgba(0,0,0,0.8); border: 2px solid #ffcc00; 
            color: #ffcc00; padding: 6px 14px; border-radius: 20px; font-size: 13px; 
            font-weight: bold; text-align: center; margin: 5px auto; width: fit-content;
            z-index: 40; box-shadow: 0 0 10px rgba(255,204,0,0.5);
        `;
        const logoArea = document.querySelector('.header-logo-area');
        if (logoArea) {
            logoArea.parentNode.insertBefore(tempDiv, logoArea);
        }
    }
}

function abrirLinkDirectoMP(urlPago) {
    if (!urlPago) {
        alert("⚠️ Link de pago no disponible temporalmente.");
        return;
    }
    window.open(urlPago, '_blank');
}

function comprarRaspaditaMP(costoPesos, efPremio, estPremio, pozoPremio, probabilidad, urlLinkMP) {
    abrirLinkDirectoMP(urlLinkMP);
}

function intentarRaspadita(nombre, costoPesos, efPremio, estPremio, pozoPremio, probabilidad, tipoMoneda, costoEstrellas = 0, urlLinkMP = "") {
    if (tipoMoneda === 'estrellas') {
        if (estrellas < costoEstrellas) {
            alert(`⚠️ No tenés suficientes estrellas ⭐. Necesitás ${costoEstrellas} estrellas.`);
            return;
        }
        estrellas -= costoEstrellas;
        actualizarUI();
        guardarPartida();
        abrirRaspadita(nombre, costoPesos, efPremio, estPremio, pozoPremio, probabilidad);
    } else {
        if (urlLinkMP) {
            abrirLinkDirectoMP(urlLinkMP);
        } else {
            abrirRaspadita(nombre, costoPesos, efPremio, estPremio, pozoPremio, probabilidad);
        }
    }
}

function abrirRaspadita(nombre, costo, efPremio, estPremio, pozoPremio, probabilidadBase) {
    raspaditaCosto = costo;
    raspaditaEfectivoPremio = efPremio;
    raspaditaEstrellasPremio = estPremio;
    raspaditaPozoPremio = pozoPremio;
    
    let divisor = modoSuerteActivo ? 3.0 : 1.5;
    let probabilidadAjustada = Math.max(2, Math.floor(probabilidadBase / divisor));
    
    raspaditaProbabilidad = probabilidadAjustada;
    casillasRaspadas = [false, false, false];
    ganoRaspadita = false;

    let tituloExtra = modoSuerteActivo ? " 🍀 (MODO SUERTE ACTIVO)" : "";
    document.getElementById('titulo-raspadita-modal').innerText = "🎟️ Raspadita " + nombre + tituloExtra;
    document.getElementById('info-premios-raspadita').innerText = `¡Si te salen 3 iguales ganás $${efPremio.toLocaleString('es-AR')} en efectivo!`;
    document.getElementById('resultado-raspadita').innerText = "";

    let tirada = Math.floor(Math.random() * probabilidadAjustada);
    if (tirada === 0) {
        let tipoPremio = Math.random();
        if (tipoPremio < 0.4) {
            simbolosCasillas = ['💰', '💰', '💰']; 
            ganoRaspadita = "efectivo";
        } else if (tipoPremio < 0.8) {
            simbolosCasillas = ['⭐', '⭐', '⭐']; 
            ganoRaspadita = "estrellas";
        } else {
            simbolosCasillas = ['💵', '💵', '💵']; 
            ganoRaspadita = "pozo";
        }
    } else {
        let opciones = ['💰', '⭐', '💵', '❌'];
        simbolosCasillas = [
            opciones[Math.floor(Math.random() * opciones.length)],
            opciones[Math.floor(Math.random() * opciones.length)],
            opciones[Math.floor(Math.random() * opciones.length)]
        ];
        
        if (simbolosCasillas[0] === simbolosCasillas[1] && simbolosCasillas[1] === simbolosCasillas[2]) {
            simbolosCasillas[2] = '❌';
        }
        ganoRaspadita = false;
    }

    for (let i = 0; i < 3; i++) {
        let casilla = document.getElementById('casilla-' + i);
        casilla.style.background = '#333';
        casilla.style.color = '#aaa';
        casilla.innerText = "🪙 Raspar";
    }

    const modal = document.getElementById('modal-raspadita');
    if (modal) modal.style.display = 'flex';
}

function rasparCasilla(indice) {
    if (casillasRaspadas[indice]) return;

    casillasRaspadas[indice] = true;
    let casilla = document.getElementById('casilla-' + indice);
    casilla.style.background = '#222';
    casilla.style.color = '#fff';
    casilla.innerText = simbolosCasillas[indice];

    if (casillasRaspadas[0] && casillasRaspadas[1] && casillasRaspadas[2]) {
        let resEl = document.getElementById('resultado-raspadita');
        
        if (ganoRaspadita === "efectivo") {
            score += raspaditaEfectivoPremio; 
            resEl.style.color = "#28a745";
            resEl.innerText = `🎉 ¡GANASTE EL PREMIO EN EFECTIVO! +$${raspaditaEfectivoPremio.toLocaleString('es-AR')}`;
            actualizarUI();
            guardarPartida();
            if (audioGanarOro) { audioGanarOro.currentTime = 0; audioGanarOro.play().catch(e => {}); }
        } else if (ganoRaspadita === "pozo") {
            dineroClicks += raspaditaPozoPremio; 
            resEl.style.color = "#28a745";
            resEl.innerText = `💰 ¡GANASTE PLATA PARA EL POZO! +$${raspaditaPozoPremio.toLocaleString('es-AR')}`;
            actualizarUI();
            guardarPartida();
            if (audioGanarMonedaPozo) { audioGanarMonedaPozo.currentTime = 0; audioGanarMonedaPozo.play().catch(e => {}); }
        } else if (ganoRaspadita === "estrellas") {
            estrellas += raspaditaEstrellasPremio;
            resEl.style.color = "#ffd700";
            resEl.innerText = `⭐ ¡GANASTE ESTRELLAS! +${raspaditaEstrellasPremio} Estrellas`;
            actualizarUI();
            guardarPartida();
            if (audioGanarEstrellas) { audioGanarEstrellas.currentTime = 0; audioGanarEstrellas.play().catch(e => {}); }
        } else {
            resEl.style.color = "#ff4444";
            resEl.innerText = `😢 Suerte la próxima, no hubo coincidencia.`;
            if (audioPerder) { 
                audioPerder.currentTime = 0; 
                audioPerder.play().catch(e => {}); 
            }
        }
    }
}

function cerrarRaspadita() {
    const modal = document.getElementById('modal-raspadita');
    if (modal) modal.style.display = 'none';
}

function abrirSelectorNumeros(nombreTicket, precioPesos, infoPremios) {
    ticketActualNombre = nombreTicket;
    ticketActualPrecioPesos = precioPesos;

    document.getElementById('titulo-ticket-modal').innerText = "🎟️ " + nombreTicket;
    document.getElementById('info-premios-modal').innerText = infoPremios + " (Costo: $" + precioPesos + " ARS)";
    document.getElementById('num-elegido-1').value = '';
    document.getElementById('num-elegido-2').value = '';

    const modal = document.getElementById('modal-selector-numeros');
    if (modal) modal.style.display = 'flex';
}

function cerrarSelectorNumeros() {
    const modal = document.getElementById('modal-selector-numeros');
    if (modal) modal.style.display = 'none';
}

function confirmarCompraTicket() {
    let n1 = document.getElementById('num-elegido-1').value.trim();
    let n2 = document.getElementById('num-elegido-2').value.trim();

    if (n1 === "" || n2 === "") {
        alert("⚠️ Por favor ingresá los dos números de la suerte (del 00 al 100).");
        return;
    }

    cerrarSelectorNumeros();
    
    const linksTickets = {
        "Ticket $2.000": "https://mpago.li/1cRS9YZ",
        "Ticket $4.000": "https://mpago.li/25QFXyC",
        "Ticket $5.000": "https://mpago.li/1urb5vQ",
        "Ticket $6.500": "https://mpago.li/1CXyAMT",
        "Ticket $8.000": "https://mpago.li/2wecnkX",
        "Ticket $10.000": "https://mpago.li/2d1xS4o"
    };

    let linkAsociado = linksTickets[ticketActualNombre] || "https://mercadopago.com.ar";
    mostrarModalPagoWeb(ticketActualNombre, ticketActualPrecioPesos, n1, n2, linkAsociado);
}

function abrirModalAdmin() {
    const modalPass = document.getElementById('modal-password-admin');
    if (modalPass) {
        document.getElementById('input-admin-pass').value = '';
        modalPass.style.display = 'flex';
    }
}

function cerrarModalPasswordAdmin() {
    const modalPass = document.getElementById('modal-password-admin');
    if (modalPass) modalPass.style.display = 'none';
}

function verificarPasswordAdmin() {
    let passwordCorrecta = "alex123588"; 
    let ingreso = document.getElementById('input-admin-pass').value;

    if (ingreso === passwordCorrecta) {
        cerrarModalPasswordAdmin();
        let panelAdmin = document.getElementById('admin-panel');
        if (panelAdmin) panelAdmin.style.display = 'block';
        alert("¡Acceso concedido! Panel de Creador abierto.");
    } else {
        alert("Contraseña incorrecta.");
    }
}

function adminDarEstrellas() {
    estrellas += 3000;
    actualizarUI();
    guardarPartida();
    alert("⭐ ¡Se sumaron 3.000 Estrellas gratis desde el Panel de Creador!");
}

function adminDarPlataClicks() {
    dineroClicks += 500000; 
    actualizarUI();
    guardarPartida();
    alert("💰 ¡Se sumaron $500.000 al Pozo Principal de Clics!");
}

function adminDarPlataRetiro() {
    score += 500000; 
    actualizarUI();
    guardarPartida();
    alert("💵 ¡Se sumaron $500.000 al Pozo Acumulado de Retiro (score)!");
}

function cerrarAdminPanel() {
    let panelAdmin = document.getElementById('admin-panel');
    if (panelAdmin) panelAdmin.style.display = 'none';
}

function verificarEstructuraBarraProgreso() {
  const logoArea = document.querySelector('.header-logo-area');
  if (logoArea && !document.getElementById('main-progress-container')) {
    const progContainer = document.createElement('div');
    progContainer.id = 'main-progress-container';
    progContainer.style.cssText = 'width: 90%; max-width: 360px; margin: 4px auto 0 auto; background: rgba(13, 17, 23, 0.85); border: 1px solid rgba(227, 179, 65, 0.4); border-radius: 8px; padding: 5px 10px; text-align: center;';
    progContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 10px; color: #ffcc00; font-weight: bold; margin-bottom: 3px;">
        <span id="main-progress-text">Progreso: 1%</span>
        <span id="main-next-level">Siguiente billete...</span>
      </div>
      <div style="width: 100%; height: 8px; background: #21262d; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 4px;">
        <div id="main-progress-fill" style="width: 1%; height: 100%; background: linear-gradient(90deg, #ffcc00, #238636); transition: width 0.1s ease;"></div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button onclick="canjearPlataEnergia()" style="background: #e3b341; color: #000; border: none; padding: 3px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; cursor: pointer; flex: 1;">⚡ Canjear Plata x Energía</button>
        <button id="btn-hacer-prestigio" onclick="intentarAbrirPrestigio()" style="background: #333; color: #777; border: 1px solid #555; padding: 3px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; cursor: not-allowed; flex: 1;" disabled>🔒 Prestigio Bloqueado</button>
      </div>
    `;
    logoArea.parentNode.insertBefore(progContainer, logoArea.nextSibling);
  }
}

function canjearPlataEnergia() {
    if (dineroClicks >= 1000000) {
        costoEnergiaActual = 100000;
        descripcionCanjeActual = "$100.000";
    } else if (dineroClicks >= 100000) {
        costoEnergiaActual = 10000;
        descripcionCanjeActual = "$10.000";
    } else {
        costoEnergiaActual = 1000;
        descripcionCanjeActual = "$1.000";
    }

    if (dineroClicks < costoEnergiaActual) {
        alert(`⚠️ Necesitás al menos ${descripcionCanjeActual} de tus clics para recargar energía.`);
        return;
    }

    let modal = document.getElementById('modal-custom-energia');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-custom-energia';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.88); display: flex; justify-content: center;
            align-items: center; z-index: 99999; font-family: Arial, sans-serif;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: #1e1e1e; padding: 24px; border-radius: 16px; width: 90%; max-width: 350px; color: #fff; text-align: center; border: 2px solid #ffcc00; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
            <h3 style="color: #ffcc00; margin-top: 0; margin-bottom: 10px;">⚡ RECARGAR ENERGÍA</h3>
            <p style="font-size: 14px; color: #ddd; margin-bottom: 20px; line-height: 1.5;">
                ¿Querés recargar 1.000 de energía a cambio de <strong style="color: #4CAF50;">${descripcionCanjeActual}</strong> de tu pozo de clics?
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button onclick="aceptarEnergiaCustom()" style="background: #28a745; color: white; border: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">✔️ Aceptar</button>
                <button onclick="cerrarEnergiaCustom()" style="background: #dc3545; color: white; border: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">❌ Rechazar</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function cerrarEnergiaCustom() {
    let modal = document.getElementById('modal-custom-energia');
    if (modal) modal.style.display = 'none';
}

function aceptarEnergiaCustom() {
    cerrarEnergiaCustom();
    
    if (dineroClicks < costoEnergiaActual) {
        alert("⚠️ No tenés suficiente dinero en el pozo.");
        return;
    }

    dineroClicks -= costoEnergiaActual;
    energy = maxEnergy;
    actualizarUI();
    guardarPartida();
    alert(`⚡ ¡Energía recargada al máximo por ${descripcionCanjeActual}!`);
}

function obtenerCostoBonusDoblesActual() {
    if (dineroClicks >= 1000000) return { costo: 100000, texto: "$100.000" };
    if (dineroClicks >= 100000) return { costo: 10000, texto: "$10.000" };
    return { costo: 1000, texto: "$1.000" };
}

function obtenerCostoBonusTriplesActual() {
    if (dineroClicks >= 10000000) return { costo: 2000000, texto: "$2 Millones" };
    if (dineroClicks >= 1000000) return { costo: 200000, texto: "$200.000" };
    if (dineroClicks >= 100000) return { costo: 20000, texto: "$20.000" };
    return { costo: 2000, texto: "$2.000" };
}

function pedirConfirmacionBonus(multiplicador) {
    bonusSeleccionadoMultiplicador = multiplicador;
    let infoBonus = (multiplicador === 2) ? obtenerCostoBonusDoblesActual() : obtenerCostoBonusTriplesActual();
    let nombreBonus = (multiplicador === 2) ? "Clics Dobles (30 seg)" : "Clics Triples (30 seg)";

    let modal = document.getElementById('modal-custom-bonus');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-custom-bonus';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.88); display: flex; justify-content: center;
            align-items: center; z-index: 99999; font-family: Arial, sans-serif;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: #1e1e1e; padding: 24px; border-radius: 16px; width: 90%; max-width: 350px; color: #fff; text-align: center; border: 2px solid #ffcc00; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
            <h3 style="color: #ffcc00; margin-top: 0; margin-bottom: 10px;">🎁 ACTIVAR BONUS</h3>
            <p style="font-size: 14px; color: #ddd; margin-bottom: 20px; line-height: 1.5;">
                ¿Querés activar <strong style="color: #00ffcc;">${nombreBonus}</strong> a cambio de <strong style="color: #4CAF50;">${infoBonus.texto}</strong> de tu pozo?
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button onclick="aceptarBonusCustom()" style="background: #28a745; color: white; border: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">✔️ Aceptar</button>
                <button onclick="cerrarBonusCustom()" style="background: #dc3545; color: white; border: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">❌ Rechazar</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function cerrarBonusCustom() {
    let modal = document.getElementById('modal-custom-bonus');
    if (modal) modal.style.display = 'none';
}

function aceptarBonusCustom() {
    cerrarBonusCustom();
    let infoBonus = (bonusSeleccionadoMultiplicador === 2) ? obtenerCostoBonusDoblesActual() : obtenerCostoBonusTriplesActual();
    
    if (dineroClicks < infoBonus.costo) {
        alert(`⚠️ No tenés suficiente dinero en el pozo. Necesitás ${infoBonus.texto}.`);
        return;
    }

    dineroClicks -= infoBonus.costo;
    actualizarUI();
    guardarPartida();

    if (bonusSeleccionadoMultiplicador === 2) {
        activarClicsDoblesSinCobro();
    } else {
        activarClicsTriplesSinCobro();
    }
}

function reclamarRecompensaDiaria() {
    let ultimaFecha = localStorage.getItem('botines_ultima_recompensa');
    let hoy = new Date().toDateString();

    if (ultimaFecha === hoy) {
        alert("⚠️ ¡Ya reclamaste tu recompensa diaria hoy! Volvé mañana para sumar más estrellas ⭐.");
        return;
    }

    estrellas += 5;
    localStorage.setItem('botines_ultima_recompensa', hoy);
    actualizarUI();
    guardarPartida();
    alert("🌟 ¡Felicitaciones! Recogiste tus +5 Estrellas diarias gratis.");
}

function activarModoSuerteRaspaditas() {
    let costoEstrellasModoSuerte = 120;
    if (estrellas < costoEstrellasModoSuerte) {
        alert(`⚠️ No tenés suficientes estrellas ⭐. Necesitás ${costoEstrellasModoSuerte} estrellas para activar el Modo Suerte.`);
        return;
    }

    if (modoSuerteActivo) {
        alert("⚠️ ¡El Modo Suerte ya se encuentra activo!");
        return;
    }

    estrellas -= costoEstrellasModoSuerte;
    actualizarUI();
    guardarPartida();
    cerrarAnuncios();

    modoSuerteActivo = true;
    let tiempoRestante = 30;

    const badgeTemp = document.getElementById('badge-temporizador-autoclick');
    if (badgeTemp) {
        badgeTemp.style.display = 'block';
        badgeTemp.innerText = `🍀 Modo Suerte: ${tiempoRestante}s`;
    }

    if (temporizadorModoSuerte) clearInterval(temporizadorModoSuerte);

    temporizadorModoSuerte = setInterval(() => {
        tiempoRestante--;
        if (badgeTemp) badgeTemp.innerText = `🍀 Modo Suerte: ${tiempoRestante}s`;
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorModoSuerte);
            temporizadorModoSuerte = null;
            modoSuerteActivo = false;
            if (badgeTemp) badgeTemp.style.display = 'none';
            alert("⏰ El Modo Suerte ha finalizado. ¡Esperamos que hayas cazado buenos premios!");
        }
    }, 1000);

    alert("🍀 ¡MODO SUERTE ACTIVADO! Durante los próximos 30 segundos, tus chances de ganar en las raspaditas están duplicadas. ¡A aprovechar!");
}

let acumuladorEnergeticoAuto = 0;

function ejecutarAutoclick() {
    if (energy <= 0) return;

    acumuladorEnergeticoAuto++;
    if (acumuladorEnergeticoAuto >= 6) {
        energy -= 1;
        acumuladorEnergeticoAuto = 0;
    }

    const confActual = skinsConfig[skinEquipada];
    const esBilleteDorardo = (confActual && confActual.bonusValor > 1);

    if (esBilleteDorardo) {
        dineroClicks += confActual.bonusValor;
    } else {
        const valorClicActual = obtenerValorClicNivel(nivelActualIndex);
        dineroClicks += (valorClicActual * multiplicadorClic);
        clicsEnNivelActual++;

        const nivelActual = nivelesJuego[nivelActualIndex];
        if (clicsEnNivelActual >= nivelActual.clicsMeta) {
            if (nivelActualIndex < nivelesJuego.length - 1) {
                nivelActualIndex++;
                clicsEnNivelActual = 0;
                actualizarTargetGrafico();
                try {
                    if (sonidoCambioMoneda) {
                        sonidoCambioMoneda.currentTime = 0;
                        sonidoCambioMoneda.play().catch(e => {});
                    }
                } catch(e) {}
            }
        }
    }

    const targetEl = document.getElementById('target-clic');
    if (targetEl) {
        targetEl.style.transition = 'transform 0.05s ease';
        targetEl.style.transform = 'scale(0.92)';
        setTimeout(() => { 
            if (targetEl) targetEl.style.transform = 'scale(1)'; 
        }, 50);
    }

    reproducirSonidoClicFluido();
    actualizarUI();
    guardarPartida();
    chequearCondicionPrestigio();
    verificarProgresoReferidoLocal();
}

function activarClicsDoblesSinCobro() {
    if (intervaloAutoclick) clearInterval(intervaloAutoclick);
    if (relojTemporizador) clearInterval(relojTemporizador);
    cerrarAnuncios();
    let tiempoRestante = 30;
    const badgeTemp = document.getElementById('badge-temporizador-autoclick');
    if (badgeTemp) {
        badgeTemp.style.display = 'block';
        badgeTemp.innerText = `⚡ Clics Dobles: ${tiempoRestante}s`;
    }
    multiplicadorClic = 2;
    acumuladorEnergeticoAuto = 0;
    
    intervaloAutoclick = setInterval(ejecutarAutoclick, 90);
    
    relojTemporizador = setInterval(() => {
        tiempoRestante--;
        if (badgeTemp) badgeTemp.innerText = `⚡ Clics Dobles: ${tiempoRestante}s`;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloAutoclick);
            clearInterval(relojTemporizador);
            intervaloAutoclick = null;
            relojTemporizador = null;
            multiplicadorClic = 1;
            if (badgeTemp && !modoSuerteActivo) badgeTemp.style.display = 'none';
        }
    }, 1000);
}

function activarClicsTriplesSinCobro() {
    if (intervaloAutoclick) clearInterval(intervaloAutoclick);
    if (relojTemporizador) clearInterval(relojTemporizador);
    cerrarAnuncios();
    let tiempoRestante = 30;
    const badgeTemp = document.getElementById('badge-temporizador-autoclick');
    if (badgeTemp) {
        badgeTemp.style.display = 'block';
        badgeTemp.innerText = `🔥 Clics Triples: ${tiempoRestante}s`;
    }
    multiplicadorClic = 3;
    acumuladorEnergeticoAuto = 0;
    
    intervaloAutoclick = setInterval(ejecutarAutoclick, 90);
    
    relojTemporizador = setInterval(() => {
        tiempoRestante--;
        if (badgeTemp) badgeTemp.innerText = `🔥 Clics Triples: ${tiempoRestante}s`;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloAutoclick);
            clearInterval(relojTemporizador);
            intervaloAutoclick = null;
            relojTemporizador = null;
            multiplicadorClic = 1;
            if (badgeTemp && !modoSuerteActivo) badgeTemp.style.display = 'none';
        }
    }, 1000);
}

function toggleMusica() {
  musicMuted = !musicMuted;
  const btnMusic = document.getElementById('btn-toggle-music');
  if (musicMuted) {
    bgMusic.pause();
    if (btnMusic) { btnMusic.innerText = '🔇 MÚSICA: OFF'; btnMusic.style.background = '#da3633'; }
  } else {
    if (musicStarted) bgMusic.play().catch(e => {});
    if (btnMusic) { btnMusic.innerText = '🎵 MÚSICA: ON'; btnMusic.style.background = '#238636'; }
  }
}

function obtenerValorClicNivel(indexNivel) {
    const nivelesBase = [
        1.00, 5.00, 10.00, 25.00, 50.00, 100.00, 200.00, 500.00, 
        1000.00, 2000.00, 5000.00, 10000.00, 20000.00, 50000.00, 
        100000.00, 200000.00, 1000000.00, 2000000.00 
    ];
    
    let base = nivelesBase[indexNivel] || 1.00;
    if (nivelPrestigio > 0) {
        base = base * Math.pow(1.30, nivelPrestigio);
    }
    return base;
}

let totalClicksRealizadosJugador = 0; 

function hacerClic(event) {
    if (!musicStarted && !musicMuted) {
        bgMusic.play().then(() => { musicStarted = true; }).catch(e => {});
    }
    if (energy <= 0) return;
    
    const confActual = skinsConfig[skinEquipada];
    const esBilleteDorardo = (confActual && confActual.bonusValor > 1);

    energy -= 1; 
    totalClicksRealizadosJugador++;

    if (esBilleteDorardo) {
        dineroClicks += confActual.bonusValor;
    } else {
        const valorClicActual = obtenerValorClicNivel(nivelActualIndex);
        dineroClicks += (valorClicActual * multiplicadorClic);
        clicsEnNivelActual++;

        const nivelActual = nivelesJuego[nivelActualIndex];
        if (clicsEnNivelActual >= nivelActual.clicsMeta) {
            if (nivelActualIndex < nivelesJuego.length - 1) {
                nivelActualIndex++;
                clicsEnNivelActual = 0;
                actualizarTargetGrafico();
                try {
                    if (sonidoCambioMoneda) {
                        sonidoCambioMoneda.currentTime = 0;
                        sonidoCambioMoneda.play().catch(e => {});
                    }
                } catch(e) {}
            }
        }
    }

    const targetEl = document.getElementById('target-clic');
    if (targetEl) {
        targetEl.style.transition = 'transform 0.05s ease';
        targetEl.style.transform = 'scale(0.92)';
        setTimeout(() => { 
            if (targetEl) targetEl.style.transform = 'scale(1)'; 
        }, 50);
    }

    reproducirSonidoClicFluido();
    actualizarUI();
    guardarPartida();
    chequearCondicionPrestigio();
    verificarProgresoReferidoLocal();
}

function actualizarTargetGrafico() {
    const targetEl = document.getElementById('target-clic');
    if (!targetEl) return;
    const conf = skinsConfig[skinEquipada];
    let esBillete = false;

    if (conf && conf.targetImg) {
        targetEl.src = conf.targetImg;
        esBillete = true;
    } else {
        const nivel = nivelesJuego[nivelActualIndex];
        targetEl.src = nivel.imagen;
        esBillete = nivel.esBillete;
    }

    if (esBillete) targetEl.classList.add('es-billete');
    else targetEl.classList.remove('es-billete');
}

function actualizarUI() {
    const formattedClicks = `$${dineroClicks.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const pozoMain = document.getElementById('pozo-main-display');
    if (pozoMain) pozoMain.innerText = formattedClicks;

    const formattedScore = `$${score.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const pozoTienda = document.getElementById('pozo-tienda-display');
    if (pozoTienda) pozoTienda.innerText = formattedScore;

    const energiaTexto = document.getElementById('energia-texto');
    if (energiaTexto) energiaTexto.innerText = `${energy}/${maxEnergy}`;

    const displayEstrellas = document.getElementById('display-estrellas');
    if (displayEstrellas) displayEstrellas.innerText = estrellas;

    const displayUser = document.getElementById('display-username');
    if (displayUser) displayUser.innerText = usuarioNombre;
    const displayUserId = document.getElementById('display-userid');
    if (displayUserId) displayUserId.innerText = usuarioId;

    const nivelActual = nivelesJuego[nivelActualIndex];
    const fillEl = document.getElementById('main-progress-fill');
    const pctTexto = document.getElementById('main-progress-text');
    const proximoInfo = document.getElementById('main-next-level');

    if (fillEl && pctTexto && nivelActual) {
        let porcentaje = Math.max(1, Math.min(100, Math.floor((clicsEnNivelActual / nivelActual.clicsMeta) * 100)));
        fillEl.style.width = `${porcentaje}%`;
        pctTexto.innerText = `Progreso: ${porcentaje}%`;
        
        if (proximoInfo) {
            if (nivelesJuego[nivelActualIndex + 1]) {
                proximoInfo.innerText = `Próximo: ${nivelesJuego[nivelActualIndex + 1].nombre}`;
            } else {
                proximoInfo.innerText = `🏆 ¡Nivel Máximo ($20k)!`;
            }
        }
    }
}

function chequearCondicionPrestigio() {
    const btnPrestigio = document.getElementById('btn-hacer-prestigio');
    if (!btnPrestigio) return;

    if (nivelActualIndex >= nivelesJuego.length - 1 && clicsEnNivelActual >= nivelesJuego[nivelActualIndex].clicsMeta) {
        btnPrestigio.disabled = false;
        btnPrestigio.style.background = 'linear-gradient(90deg, #ff4444, #ffd700)';
        btnPrestigio.style.color = '#000';
        btnPrestigio.style.cursor = 'pointer';
        btnPrestigio.style.borderColor = '#ffd700';
        btnPrestigio.innerText = '🔥 ¡HACER PRESTIGIO!';
    }
}

function intentarAbrirPrestigio() {
    const btnPrestigio = document.getElementById('btn-hacer-prestigio');
    if (btnPrestigio && btnPrestigio.disabled) {
        alert("🔒 El botón de Prestigio está bloqueado. Tenés que completar todos los niveles hasta llegar al Billete de $20.000 para desbloquearlo.");
        return;
    }
    iniciarPrestigio();
}

function iniciarPrestigio() {
    const modal = document.getElementById('modal-prestigio-fondos');
    const grid = document.getElementById('grid-fondos-prestigio');
    if (!modal || !grid) return;

    const listaFondosNuevos = [
        { nombre: "Fondo El Gaucho", archivo: "fondo_nuevo_gaucho.jpg", idSkin: "fondo_nuevo_gaucho" },
        { nombre: "Fondo Malvinas", archivo: "fondo_nuevo_soldado.jpg", idSkin: "fondo_nuevo_soldado" },
        { nombre: "Fondo El Tanguero", archivo: "fondo_nuevo_tanguero.jpg", idSkin: "fondo_nuevo_tanguero" },
        { nombre: "Fondo Selección", archivo: "fondo_nuevo_seleccion.jpg", idSkin: "fondo_nuevo_seleccion" },
        { nombre: "Fondo El Asado", archivo: "fondo_nuevo_asado.jpg", idSkin: "fondo_nuevo_asado" },
        { nombre: "Fondo Truco", archivo: "fondo_nuevo_truco.jpg", idSkin: "fondo_nuevo_truco" },
        { nombre: "Fondo Tren", archivo: "fondo_nuevo_tren.jpg", idSkin: "fondo_nuevo_tren" },
        { nombre: "Fondo Boliche", archivo: "fondo_nuevo_boliche.jpg", idSkin: "fondo_nuevo_boliche" },
        { nombre: "Fondo Maxikiosco", archivo: "fondo_nuevo_kiosco.jpg", idSkin: "fondo_nuevo_kiosco" },
        { nombre: "Fondo Colectivo", archivo: "fondo_nuevo_colectivo.jpg", idSkin: "fondo_nuevo_colectivo" }
    ];

    let html = '';
    listaFondosNuevos.forEach(f => {
        html += `
            <div onclick="ejecutarReinicioPrestigio('${f.archivo}', '${f.nombre}', '${f.idSkin}')" style="background: #111; border: 2px solid #ffd700; border-radius: 8px; padding: 6px; cursor: pointer; text-align: center;">
                <img src="${f.archivo}" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px; margin-bottom: 4px;">
                <div style="font-size: 10px; color: #ffcc00; font-weight: bold;">${f.nombre}</div>
                <div style="font-size: 9px; color: #28a745; margin-top: 2px;">Elegir Gratis 🎁</div>
            </div>
        `;
    });

    grid.innerHTML = html;
    modal.style.display = 'flex';
}

function ejecutarReinicioPrestigio(nombreArchivoFondo, nombreFondoElegido, idSkinFondo) {
    nivelPrestigio++;
    dineroClicks = 0.00;
    nivelActualIndex = 0;
    clicsEnNivelActual = 0;

    maxEnergy = 1500; 
    energy = maxEnergy;

    skinsCompradas[idSkinFondo] = true;
    skinEquipada = idSkinFondo;

    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.backgroundImage = `url('${nombreArchivoFondo}')`;
        gameContainer.style.backgroundSize = 'cover';
        gameContainer.style.backgroundPosition = 'center';
    }

    const modal = document.getElementById('modal-prestigio-fondos');
    if (modal) modal.style.display = 'none';

    const btnP = document.getElementById('btn-hacer-prestigio');
    if (btnP) {
        btnP.disabled = true;
        btnP.style.background = '#333';
        btnP.style.color = '#777';
        btnP.style.cursor = 'not-allowed';
        btnP.style.borderColor = '#555';
        btnP.innerText = '🔒 Prestigio Bloqueado';
    }

    actualizarTargetGrafico();
    actualizarUI();
    guardarPartida();

    alert(`🎉 ¡PRESTIGIO EXITOSO! Arrancás tu Gran Revancha Nivel ${nivelPrestigio}.\n\n✨ Clics potenciados un 30% más.\n⚡ Energía máxima: 1.500.\n🎁 ¡Fondo único de regalo elegido y equipado: ${nombreFondoElegido}!`);
}

function abrirTienda() {
    document.getElementById('screen-juego').style.display = 'none';
    document.getElementById('screen-tienda').classList.add('active');
    actualizarUI();
}

function abrirGaleria() {
    document.getElementById('screen-juego').style.display = 'none';
    renderizarGaleria();
    document.getElementById('screen-galeria').classList.add('active');
}

function renderizarGaleria() {
    const container = document.getElementById('galeria-container');
    if (!container) return;

    let html = '';
    let desbloqueadosCount = 0;
    const totalSkins = Object.keys(skinsConfig).length - 1;

    Object.keys(skinsConfig).forEach(id => {
      if (id === 'inicio') return;
      const conf = skinsConfig[id];
      const esDesbloqueado = skinsCompradas[id];
      if (esDesbloqueado) desbloqueadosCount++;

      html += `
        <div class="skin-card" onclick="equiparSkinDesdeGaleria('${id}')" style="cursor: pointer; border: 2px solid ${esDesbloqueado ? (skinEquipada === id ? '#ffcc00' : '#28a745') : '#dc3545'};">
            <img src="${conf.imagen}" alt="${conf.nombre}" style="${esDesbloqueado ? '' : 'filter: grayscale(100%) opacity(0.35);'}">
            <div class="skin-title">${conf.nombre}</div>
            <div style="background: ${esDesbloqueado ? (skinEquipada === id ? '#ffcc00' : '#28a745') : '#30363d'}; color: ${skinEquipada === id && esDesbloqueado ? '#000' : '#fff'}; padding: 4px; border-radius: 4px; font-size: 10px; font-weight: bold; width: 100%; text-align: center;">
                ${esDesbloqueado ? (skinEquipada === id ? '✨ EQUIPADO' : '✔️ DESBLOQUEADO') : (conf.precioEstrellas ? `⭐ ${conf.precioEstrellas}` : '🔒 BLOQUEADO')}
            </div>
        </div>
      `;
    });

    container.innerHTML = html;
    document.getElementById('galeria-count').innerText = desbloqueadosCount;
    document.getElementById('galeria-percent').innerText = `${Math.round((desbloqueadosCount / totalSkins) * 100)}%`;
}

function equiparSkinDesdeGaleria(skinId) {
  const conf = skinsConfig[skinId];
  
  if (!skinsCompradas[skinId]) {
    if (conf && conf.precioEstrellas) {
      if (estrellas >= conf.precioEstrellas) {
        if (confirm(`¿Querés desbloquear "${conf.nombre}" por ${conf.precioEstrellas} Estrellas ⭐?`)) {
          estrellas -= conf.precioEstrellas;
          skinsCompradas[skinId] = true;
          actualizarUI();
          guardarPartida();
          equiparSkinDesdeGaleria(skinId);
          alert(`🎉 ¡Felicitaciones! Desbloqueaste y equipaste "${conf.nombre}".`);
        }
        return;
      } else {
        alert(`⚠️ No tenés estrellas suficientes ⭐. Necesitás ${conf.precioEstrellas} estrellas para desbloquear a ${conf.nombre}. (Tenés ${estrellas})`);
        return;
      }
    } else {
      alert("⚠️ ¡Este fondo está bloqueado! Completá el juego hasta el Billete de $20.000 y hacé un prestigio para elegirlo de regalo gratis.");
      return;
    }
  }
  
  skinEquipada = skinId;
  
  const imgSkinActiva = document.getElementById('skin-activa');
  if (imgSkinActiva && conf && conf.imagen) {
      imgSkinActiva.src = conf.imagen;
  }

  const gameContainer = document.querySelector('.game-container');
  if (gameContainer && conf && conf.fondo) {
      gameContainer.style.backgroundImage = `url('${conf.fondo}')`;
      gameContainer.style.backgroundSize = 'cover';
      gameContainer.style.backgroundPosition = 'center';
  }

  actualizarTargetGrafico();
  guardarPartida();
  if (conf && conf.nombre) {
      alert(`✨ ¡Fondo "${conf.nombre}" equipado con éxito!`);
  }
  cerrarPantallas();
  verificarProgresoReferidoLocal(); 
}

function cerrarPantallas() {
    document.getElementById('screen-tienda').classList.remove('active');
    document.getElementById('screen-galeria').classList.remove('active');
    document.getElementById('screen-juego').style.display = 'flex';
    actualizarUI();
}

function filtrarTienda(tipo) {
    const cards = document.querySelectorAll('#skins-container .skin-card');
    cards.forEach(card => {
        if (tipo === 'todas' || card.classList.contains(tipo) || card.dataset.tipo === tipo) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function abrirAnuncios() {
  const modal = document.getElementById('modal-anuncios');
  if (modal) modal.style.display = 'flex';
}

function cerrarAnuncios() {
  const modal = document.getElementById('modal-anuncios');
  if (modal) modal.style.display = 'none';
}

function comprarPaqueteEstrellas(cantidad, precioARS) {
    const linksEstrellas = {
        50: "https://mpago.la/1WZ26he",
        100: "https://mpago.li/2TR61bt",
        200: "https://mpago.li/1RtUETr",
        300: "https://mpago.li/2KJPW46"
    };

    let urlDirecta = linksEstrellas[cantidad];
    if (urlDirecta) {
        abrirLinkDirectoMP(urlDirecta);
    } else {
        mostrarModalPagoWeb(`Pack de ${cantidad} Estrellas`, precioARS);
    }
}

function intentarComprarSkin(skinId, nombreSkin, precioEstrellasParam, precioPesosJuegoParam, precioPesosLemonParam, event) {
  if (event) event.preventDefault();

  try {
    if (skinsCompradas[skinId]) {
      equiparSkinDesdeGaleria(skinId);
      return;
    }

    const costoEstrellas = parseInt(precioEstrellasParam) || 0;
    const costoPesosJuego = parseFloat(precioPesosJuegoParam) || 0;

    if (costoPesosJuego > 0) {
      if (dineroClicks >= costoPesosJuego) {
        dineroClicks -= costoPesosJuego;
        skinsCompradas[skinId] = true;
        actualizarUI();
        guardarPartida();
        equiparSkinDesdeGaleria(skinId);
        alert(`🎉 ¡Felicitaciones! Compraste "${nombreSkin}" con tu dinero de clics.`);
        return;
      } else {
        alert(`⚠️ Te falta dinero en tu pozo de clics. Tenés $${dineroClicks.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})} y cuesta $${costoPesosJuego.toLocaleString('es-AR')} ARS.`);
        return;
      }
    }

    if (costoEstrellas > 0) {
      if (estrellas >= costoEstrellas) {
        estrellas -= costoEstrellas;
        skinsCompradas[skinId] = true;
        actualizarUI();
        guardarPartida();
        equiparSkinDesdeGaleria(skinId);
        alert(`🎉 ¡Felicitaciones! Compraste "${nombreSkin}" con tus estrellas.`);
        return;
      } else {
        alert(`⚠️ No tenés estrellas suficientes ⭐. Necesitás ${costoEstrellas} estrellas para comprar a ${nombreSkin}. (Tenés ${estrellas})`);
        return;
      }
    }
  } catch (err) {
    alert("⚠️ Error en intentarComprarSkin: " + err.message);
  }
}

function mostrarModalPagoWeb(nombreItem, precioPesos, num1 = null, num2 = null, urlPagoCustom = "") {
  let modal = document.getElementById('modalPagoWeb');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalPagoWeb';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); display: flex; justify-content: center;
      align-items: center; z-index: 9999; font-family: Arial, sans-serif;
    `;
    document.body.appendChild(modal);
  }

  let textoMsg = "";
  let extraHtml = "";

  if (nombreItem === "Retiro de Pozo Acumulado") {
    let codigoSeguridadUnico = "RET-" + usuarioId.replace("#", "") + "-" + Date.now().toString().slice(-6);
    
    textoMsg = `Hola! Quiero retirar mi pozo acumulado de $${precioPesos} ARS de Botines: El Juego Argento.\n\n👤 Usuario: ${usuarioNombre} (ID: ${usuarioId})\n🔑 Código de Retiro: ${codigoSeguridadUnico}\n\nMis datos para la transferencia son:\nNombre y Apellido: [Tu Nombre]\nAlias o CBU: [Tu Alias/CBU].`;
    
    extraHtml = `
      <div style="background: #111; border: 1px dashed #ffd700; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
        <p style="margin: 0; font-size: 11px; color: #aaa;">🔑 Código de Verificación Único:</p>
        <p style="margin: 2px 0 0 0; font-size: 15px; color: #ffd700; font-weight: bold; font-family: monospace;">${codigoSeguridadUnico}</p>
      </div>
    `;
  } else if (num1 !== null && num2 !== null) {
    textoMsg = `Hola! Compré el ${nombreItem} por $${precioPesos} ARS para Botines: El Juego Argento. Usuario: ${usuarioNombre} (ID: ${usuarioId}). Mis 2 números elegidos para el sorteo son: [ ${num1} ] y [ ${num2} ]. Acá va mi comprobante de pago:`;
  } else {
    textoMsg = `Hola! Acabo de procesar ${nombreItem} por $${precioPesos} ARS para Botines: El Juego Argento. Usuario: ${usuarioNombre} (ID: ${usuarioId}). Acá va mi comprobante:`;
  }

  const urlWhatsApp = `https://api.whatsapp.com/send?phone=5491161084925&text=${encodeURIComponent(textoMsg)}`;

  modal.innerHTML = `
    <div style="background: #1e1e1e; padding: 25px; border-radius: 12px; width: 90%; max-width: 400px; color: #fff; text-align: center; border: 2px solid #ffd700;">
      <h2 style="color: #ffd700; margin-bottom: 10px;">🎟️ ${nombreItem}</h2>
      <p style="color: #00ffcc; font-size: 13px; margin-bottom: 5px;">👤 Usuario: ${usuarioNombre} (${usuarioId})</p>
      ${num1 !== null ? `<p style="color: #00ffcc; font-size: 14px; margin-bottom: 5px;">Números elegidos: [ ${num1} ] y [ ${num2} ]</p>` : ''}
      <p style="font-size: 16px; margin-bottom: 10px;">Monto: <strong style="color: #4CAF50;">$${precioPesos} ARS</strong></p>
      
      ${extraHtml}

      <div style="background: #2d2d2d; padding: 12px; border-radius: 8px; margin-bottom: 15px; text-align: left; font-size: 14px;">
        ${num1 !== null ? `
          <p style="margin: 3px 0; color: #ffd700; font-weight: bold;">1️⃣ Pagá seguro en el link oficial:</p>
          <button onclick="window.open('${urlPagoCustom || 'https://mercadopago.com.ar'}', '_blank')" style="background: #009ee3; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-weight: bold; width: 100%; margin-top: 5px; cursor: pointer; font-size: 13px;">💳 Pagar en Mercado Pago</button>
          <p style="margin: 10px 0 3px 0; color: #ffd700; font-weight: bold;">2️⃣ Envianos los números por WhatsApp:</p>
        ` : `
          <p style="margin: 3px 0; color: #ffd700; font-weight: bold;">Enviá tu código de retiro por WhatsApp:</p>
        `}
      </div>
      
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button onclick="window.open('${urlWhatsApp}', '_system')" style="background: #25D366; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; flex: 1; cursor: pointer;">📲 Enviar a WhatsApp</button>
        <button onclick="cerrarModalPagoWeb()" style="background: #d32f2f; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; flex: 1;">❌ Cerrar</button>
      </div>
    </div>
  `;
  modal.style.display = 'flex';
}

function cerrarModalPagoWeb() {
  const modal = document.getElementById('modalPagoWeb');
  if (modal) modal.style.display = 'none';
}

function intentarRetirarPozo() {
    if (score < 2000) {
        alert("⚠️ Todavía no llegás al mínimo de retiro. Necesitás al menos $2.000 acumulados de premios en efectivo de las raspaditas.");
        return;
    }
    let montoRetiro = score;
    mostrarModalPagoWeb("Retiro de Pozo Acumulado", montoRetiro.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

// ==========================================
// LÓGICA DE REFERIDOS INTEGRADA
// ==========================================
let cantidadReferidosCompletados = parseInt(localStorage.getItem('botines_cant_referidos') || '0');

function abrirModalReferidos() {
    const modal = document.getElementById('modal-referidos');
    if (modal) {
        let codigoUsuarioRef = usuarioId.replace('#', '');
        let linkBase = window.location.href.split('?')[0];
        let linkCompleto = `${linkBase}?ref=${codigoUsuarioRef}`;
        
        document.getElementById('input-link-referido').value = linkCompleto;
        document.getElementById('contador-referidos').innerText = cantidadReferidosCompletados;
        modal.style.display = 'flex';
    }
}

function cerrarModalReferidos() {
    const modal = document.getElementById('modal-referidos');
    if (modal) modal.style.display = 'none';
}

function copiarLinkReferido() {
    const inputLink = document.getElementById('input-link-referido');
    inputLink.select();
    inputLink.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputLink.value).then(() => {
        alert("📋 ¡Enlace de referido copiado al portapapeles! Compártelo con tus amigos.");
    }).catch(err => {
        alert("⚠️ No se pudo copiar automáticamente. Selecciona y cópialo manualmente.");
    });
}

function verificarProgresoReferidoLocal() {
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');
    
    if (refCode && localStorage.getItem('botines_referido_completado') !== 'true') {
        let skinDesbloqueadaExtra = Object.keys(skinsCompradas).length > 1; 
        
        if (totalClicksRealizadosJugador >= 300 && skinDesbloqueadaExtra) {
            localStorage.setItem('botines_referido_completado', 'true');
            estrellas += 10;
            actualizarUI();
            guardarPartida();
            alert("🌟 ¡Felicitaciones! Cumpliste los requisitos del enlace de referido (300 clics + 1 skin). ¡Ganaste 10 Estrellas ⭐!");
        }
    }
}

// ==========================================
// SISTEMA AUTOMÁTICO DE GUARDAR Y CARGAR
// ==========================================
function guardarPartida() {
    try {
        localStorage.setItem('botines_dineroClicks', dineroClicks);
        localStorage.setItem('botines_score', score);
        localStorage.setItem('botines_estrellas', estrellas);
        localStorage.setItem('botines_energy', energy);
        localStorage.setItem('botines_maxEnergy', maxEnergy);
        localStorage.setItem('botines_nivelPrestigio', nivelPrestigio);
        localStorage.setItem('botines_nivelActualIndex', nivelActualIndex);
        localStorage.setItem('botines_clicsEnNivelActual', clicsEnNivelActual);
        localStorage.setItem('botines_skinEquipada', skinEquipada);
        localStorage.setItem('botines_usuarioNombre', usuarioNombre);
        localStorage.setItem('botines_skinsCompradas', JSON.stringify(skinsCompradas));
    } catch (e) {
        console.error("Error al guardar partida:", e);
    }
}

function cargarPartida() {
    try {
        if (localStorage.getItem('botines_dineroClicks') !== null) {
            dineroClicks = parseFloat(localStorage.getItem('botines_dineroClicks')) || 0;
            score = parseFloat(localStorage.getItem('botines_score')) || 0;
            estrellas = parseInt(localStorage.getItem('botines_estrellas')) || 0;
            energy = parseInt(localStorage.getItem('botines_energy')) || 1000;
            maxEnergy = parseInt(localStorage.getItem('botines_maxEnergy')) || 1000;
            nivelPrestigio = parseInt(localStorage.getItem('botines_nivelPrestigio')) || 0;
            nivelActualIndex = parseInt(localStorage.getItem('botines_nivelActualIndex')) || 0;
            clicsEnNivelActual = parseInt(localStorage.getItem('botines_clicsEnNivelActual')) || 0;
            skinEquipada = localStorage.getItem('botines_skinEquipada') || 'inicio';
            usuarioNombre = localStorage.getItem('botines_usuarioNombre') || 'Jugador';
            
            let guardadoSkins = localStorage.getItem('botines_skinsCompradas');
            if (guardadoSkins) {
                skinsCompradas = JSON.parse(guardadoSkins);
            }

            const conf = skinsConfig[skinEquipada];
            const imgSkinActiva = document.getElementById('skin-activa');
            if (imgSkinActiva && conf && conf.imagen) {
                imgSkinActiva.src = conf.imagen;
            }

            const gameContainer = document.querySelector('.game-container');
            if (gameContainer && conf && conf.fondo) {
                gameContainer.style.backgroundImage = `url('${conf.fondo}')`;
                gameContainer.style.backgroundSize = 'cover';
                gameContainer.style.backgroundPosition = 'center';
            }

            actualizarTargetGrafico();
        }
    } catch (e) {
        console.error("Error al cargar partida:", e);
    }
}
