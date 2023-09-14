let intentos = 6;
let palabra = '';

// Definición de la API
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=en";

// Proceso de la función init una vez que la ventana carga
window.addEventListener('load', init);

// Definición de la función init
function init() {
    obtenerPalabraAleatoria();

    // Asignación y detección de click del botón intentar
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
}

function obtenerPalabraAleatoria() {
    fetch(API)
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log('Palabra generada: ' + palabra);

            // Resto del código del juego, como la función intentar y la lógica del juego.
            // ...

        })
        .catch(err => {
            console.log("Error en respuesta de la API, se procesa lista de palabras predeterminadas");
            let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
            palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

            // Resto del código del juego, como la función intentar y la lógica del juego.
            // ...
        });
}

// Función para intentar adivinar
function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }

    var elemento = document.getElementById('titleintentos');
    elemento.style.display = 'block';

    if (INTENTO.length != palabra.length) {
        var pista = document.getElementById('pista');
        pista.style.display = 'block';
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in INTENTO) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) { // VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else { // GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    intentos--;

    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>");
    }
}

// Función para leer el intento
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

// Función para terminar el juego
function terminar(mensaje) {
    const BOTON = document.getElementById("guess-button");
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
