
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// PALETAS DE COLORES

let paleta1 = [
    "#ff8c32",
    "#f2eee7",
    "#d94f30",
    "#573b35",
    "#222222"
];

let paleta2 = [
    "#8ecae6",
    "#219ebc",
    "#023047",
    "#ffb703",
    "#fb8500"
];

// PALETA ACTUAL

let colores = paleta1;


// FUNCION PARA DIBUJAR CIRCULOS

function dibujarCirculo(x, y, radio, color) {

    ctx.beginPath();

    ctx.arc(x, y, radio, 0, Math.PI * 2);

    ctx.fillStyle = color;

    ctx.fill();

}


// FUNCION PARA DIBUJAR RECTANGULOS

function dibujarRectangulo(x, y, ancho, alto, color) {

    ctx.fillStyle = color;

    ctx.fillRect(x, y, ancho, alto);

}


// FUNCION PARA DIBUJAR LINEAS

function dibujarLinea(x, y, x2, y2, color) {

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.lineTo(x2, y2);

    ctx.strokeStyle = color;

    ctx.lineWidth = 3;

    ctx.stroke();

}


// FUNCION PRINCIPAL DE COMPOSICION

function generarComposicion() {

    // FONDO CON DEGRADADO

    let degradado = ctx.createLinearGradient(0, 0, 900, 600);

    degradado.addColorStop(0, colores[4]);

    degradado.addColorStop(1, "#111111");

    ctx.fillStyle = degradado;

    ctx.fillRect(0, 0, 900, 600);


    // TITULO DEL AFICHE

    ctx.fillStyle = colores[1];

    ctx.font = "bold 55px Arial";

    ctx.fillText("RITMO", 45, 90);

    ctx.fillText("VISUAL", 45, 145);


    // SUBTITULO

    ctx.fillStyle = colores[0];

    ctx.font = "14px Arial";

    ctx.fillText("FRECUENCIA / FORMA / MOVIMIENTO", 48, 180);


    // LINEA DECORATIVA

    dibujarLinea(45, 205, 850, 205, colores[1]);


    // ELEMENTOS GRAFICOS REPETIDOS

    for (let i = 0; i < 30; i++) {

        let x = Math.random() * 850 + 25;

        let y = Math.random() * 350 + 220;

        let tamano = Math.random() * 20 + 5;

        let color = colores[Math.floor(Math.random() * 4)];


        // ALTERNAR FIGURAS

        if (i % 3 === 0) {

            // CIRCULOS

            dibujarCirculo(x, y, tamano, color);

        } else if (i % 3 === 1) {

            // RECTANGULOS

            dibujarRectangulo(x, y, tamano * 2, tamano * 2, color);

        } else {

            // LINEAS

            dibujarLinea(x, y, x + tamano * 2, y + tamano * 2, color);

        }

    }


    // PATRON DE CIRCULOS

    for (let i = 0; i < 12; i++) {

        let x = 55 + i * 70;

        dibujarCirculo(x, 520, 5, colores[1]);

        dibujarLinea(x, 530, x, 550, colores[0]);

    }


    // TEXTO INFERIOR

    ctx.fillStyle = colores[1];

    ctx.font = "12px Arial";

    ctx.fillText("GENERATIVE ART / EXPERIMENT 001", 45, 580);

    ctx.fillText("2026", 800, 580);

}


// BOTON PALETA 1

document.getElementById("paleta1").addEventListener("click", function() {

    colores = paleta1;

    generarComposicion();

});


// BOTON PALETA 2

document.getElementById("paleta2").addEventListener("click", function() {

    colores = paleta2;

    generarComposicion();

});


// BOTON GENERAR

document.getElementById("generar").addEventListener("click", function() {

    generarComposicion();

});
document.getElementById("guardar").addEventListener("click", function() {

    let imagen = canvas.toDataURL("image/png");

    let enlace = document.createElement("a");

    enlace.href = imagen;

    enlace.download = "ritmo-visual.png";

    enlace.click();

});

generarComposicion();
