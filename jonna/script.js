
/* =========================================
   WENDY CAGUAMAS
   GREEN DREAMS — GENERATIVE ART
   ========================================= */


/* =========================================
   1. ELEMENTOS Y CONFIGURACIÓN
   ========================================= */

const canvas = document.getElementById("art-canvas");
const ctx = canvas.getContext("2d");

const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

const paletteButtons = document.querySelectorAll(".palette-option");
const generationLabel = document.getElementById("generation-number");

const WIDTH = 900;
const HEIGHT = 1100;

let generation = 0;
let currentPalette = 0;


/* =========================================
   2. PALETAS DE COLORES
   ========================================= */

const palettes = [

    // PALETA 1: GREEN GARDEN

    {
        name: "GREEN GARDEN",

        colors: [
            "#d2ed65",
            "#8dbb6a",
            "#416b50",
            "#f1d9a9",
            "#263c35",
            "#f8f3df",
            "#a6c9a0",
            "#e9aeb5"
        ],

        background: ["#eaf2c9", "#c7df9d", "#8fb68b"],
        hair: "#416b50",
        hairLight: "#8dbb6a",
        skin: "#f6d7c2",
        skinShadow: "#dfa995",
        eye: "#587c4d",
        clothes: "#e5edc5",
        accent: "#d2ed65"
    },


    // PALETA 2: PINK DREAMS

    {
        name: "PINK DREAMS",

        colors: [
            "#f2c7cf",
            "#db94a8",
            "#a76c88",
            "#f6e6cf",
            "#59465f",
            "#fff4ed",
            "#d8b4c8",
            "#a9c59a"
        ],

        background: ["#f8e8e9", "#eccbd9", "#d9b5d0"],
        hair: "#a76c88",
        hairLight: "#db94a8",
        skin: "#f7d8cd",
        skinShadow: "#dfa9a4",
        eye: "#795a82",
        clothes: "#f5dbe3",
        accent: "#db94a8"
    }

];


/* =========================================
   3. FUNCIONES AUXILIARES
   ========================================= */

// Número aleatorio entre dos valores.

function random(min, max) {
    return Math.random() * (max - min) + min;
}


// Elegir un color de la paleta.

function randomColor() {

    const colors = palettes[currentPalette].colors;

    return colors[Math.floor(Math.random() * colors.length)];

}


// Crear un círculo.

function drawCircle(x, y, radius, color) {

    ctx.beginPath();

    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.fillStyle = color;

    ctx.fill();

}


// Crear una estrella.

function drawStar(x, y, radius, color) {

    ctx.save();

    ctx.translate(x, y);

    ctx.fillStyle = color;

    ctx.beginPath();

    for (let i = 0; i < 10; i++) {

        const angle = -Math.PI / 2 + i * Math.PI / 5;

        const size = i % 2 === 0
            ? radius
            : radius * 0.4;

        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.closePath();
    ctx.fill();

    ctx.restore();

}


// Crear una hoja mediante trazados.

function drawLeaf(x, y, size, rotation, color) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.quadraticCurveTo(
        size,
        -size * 0.9,
        size * 1.3,
        -size * 1.8
    );

    ctx.quadraticCurveTo(
        -size * 0.8,
        -size * 1.6,
        0,
        0
    );

    ctx.closePath();
    ctx.fill();

    // Nervadura

    ctx.strokeStyle = "rgba(38,60,53,.35)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size * 1.1, -size * 1.5);
    ctx.stroke();

    ctx.restore();

}


// Crear una flor.

function drawFlower(x, y, size, color) {

    ctx.save();

    ctx.translate(x, y);

    for (let i = 0; i < 5; i++) {

        const angle = i * Math.PI * 2 / 5;

        const px = Math.cos(angle) * size * .65;
        const py = Math.sin(angle) * size * .65;

        drawCircle(px, py, size * .48, color);

    }

    drawCircle(0, 0, size * .35, "#f4d879");

    ctx.restore();

}


// Crear una línea decorativa.

function drawLine(x1, y1, x2, y2, color, width) {

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.stroke();

}


/* =========================================
   4. FONDO GENERATIVO
   ========================================= */

function drawBackground() {

    const palette = palettes[currentPalette];

    // Degradado principal.

    const gradient = ctx.createLinearGradient(
        0, 0,
        WIDTH, HEIGHT
    );

    gradient.addColorStop(0, palette.background[0]);
    gradient.addColorStop(.55, palette.background[1]);
    gradient.addColorStop(1, palette.background[2]);

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, WIDTH, HEIGHT);


    // Círculo decorativo grande.

    const circleGradient = ctx.createRadialGradient(
        450, 420, 30,
        450, 420, 450
    );

    circleGradient.addColorStop(
        0,
        "rgba(255,255,255,.65)"
    );

    circleGradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = circleGradient;

    ctx.fillRect(0, 0, WIDTH, HEIGHT);


    // Marco exterior.

    ctx.strokeStyle = "rgba(38,60,53,.22)";
    ctx.lineWidth = 3;

    ctx.strokeRect(35, 35, WIDTH - 70, HEIGHT - 70);


    // Pequeñas marcas en el fondo.

    for (let i = 0; i < 65; i++) {

        const x = random(55, WIDTH - 55);
        const y = random(70, HEIGHT - 70);
        const radius = random(2, 7);

        drawCircle(
            x,
            y,
            radius,
            "rgba(255,255,255,.5)"
        );

    }


    // Líneas geométricas laterales.

    for (let i = 0; i < 7; i++) {

        const y = 200 + i * 115;

        drawLine(
            55, y,
            130, y - random(10, 40),
            "rgba(38,60,53,.15)",
            2
        );

        drawLine(
            770, y,
            845, y + random(10, 40),
            "rgba(38,60,53,.15)",
            2
        );

    }


    // Figuras geométricas de fondo.

    for (let i = 0; i < 15; i++) {

        const x = random(70, 830);
        const y = random(120, 950);
        const size = random(12, 32);

        if (i % 2 === 0) {

            drawCircle(
                x,
                y,
                size,
                "rgba(255,255,255,.25)"
            );

        } else {

            ctx.strokeStyle = "rgba(255,255,255,.35)";
            ctx.lineWidth = 3;

            ctx.strokeRect(
                x,
                y,
                size,
                size
            );

        }

    }

}


/* =========================================
   5. DECORACIÓN BOTÁNICA
   ========================================= */

function drawDecoration() {

    const palette = palettes[currentPalette];


    // Hojas aleatorias.

    for (let i = 0; i < 25; i++) {

        const side = i % 2 === 0;

        const x = side
            ? random(65, 220)
            : random(680, 835);

        const y = random(160, 920);

        const size = random(12, 30);

        drawLeaf(
            x,
            y,
            size,
            random(-2, 2),
            palette.colors[i % palette.colors.length]
        );

    }


    // Flores distribuidas.

    for (let i = 0; i < 13; i++) {

        const x = random(70, 830);
        const y = random(130, 940);

        drawFlower(
            x,
            y,
            random(9, 19),
            randomColor()
        );

    }


    // Estrellas.

    for (let i = 0; i < 20; i++) {

        drawStar(
            random(80, 820),
            random(100, 1000),
            random(5, 15),
            "rgba(255,255,255,.85)"
        );

    }


    // Adornos geométricos.

    for (let i = 0; i < 12; i++) {

        const x = random(80, 820);
        const y = random(150, 900);

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(random(0, Math.PI));

        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(0, -12);
        ctx.lineTo(12, 12);
        ctx.lineTo(-12, 12);

        ctx.closePath();
        ctx.stroke();

        ctx.restore();

    }

}


/* =========================================
   6. CABELLO DE LA CHICA
   ========================================= */

function drawHairBack() {

    const palette = palettes[currentPalette];

    ctx.fillStyle = palette.hair;

    // Silueta posterior del cabello.

    ctx.beginPath();

    ctx.moveTo(285, 390);

    ctx.bezierCurveTo(
        235, 245,
        310, 190,
        450, 205
    );

    ctx.bezierCurveTo(
        610, 185,
        680, 300,
        625, 510
    );

    ctx.bezierCurveTo(
        680, 690,
        650, 820,
        585, 900
    );

    ctx.lineTo(520, 780);

    ctx.lineTo(350, 850);

    ctx.bezierCurveTo(
        270, 730,
        235, 570,
        285, 390
    );

    ctx.closePath();

    ctx.fill();


    // Mechones largos de cabello.

    for (let i = 0; i < 9; i++) {

        const x = 300 + i * 38;

        ctx.beginPath();

        ctx.moveTo(x, 370);

        ctx.bezierCurveTo(
            x - 60,
            540,
            x + random(-60, 60),
            740,
            x + random(-40, 50),
            850
        );

        ctx.strokeStyle = i % 2 === 0
            ? palette.hairLight
            : palette.hair;

        ctx.lineWidth = random(12, 25);
        ctx.lineCap = "round";

        ctx.stroke();

    }

}


/* =========================================
   7. CUERPO Y ROPA
   ========================================= */

function drawBody() {

    const palette = palettes[currentPalette];

    // Cuello.

    ctx.fillStyle = palette.skin;

    ctx.beginPath();

    ctx.moveTo(390, 650);
    ctx.lineTo(510, 650);
    ctx.lineTo(525, 760);
    ctx.lineTo(375, 760);

    ctx.closePath();
    ctx.fill();


    // Sombra del cuello.

    ctx.fillStyle = palette.skinShadow;

    ctx.beginPath();

    ctx.ellipse(
        450, 685,
        65, 28,
        0, 0, Math.PI
    );

    ctx.fill();


    // Hombros y cuerpo vestido.

    ctx.fillStyle = palette.clothes;

    ctx.beginPath();

    ctx.moveTo(390, 720);

    ctx.bezierCurveTo(
        315, 720,
        260, 760,
        245, 880
    );

    ctx.lineTo(215, 1010);

    ctx.lineTo(685, 1010);

    ctx.lineTo(655, 880);

    ctx.bezierCurveTo(
        640, 760,
        585, 720,
        510, 720
    );

    ctx.closePath();
    ctx.fill();


    // Cuello decorativo de la ropa.

    ctx.fillStyle = palette.accent;

    ctx.beginPath();

    ctx.moveTo(390, 730);
    ctx.lineTo(450, 800);
    ctx.lineTo(510, 730);
    ctx.lineTo(485, 710);
    ctx.lineTo(415, 710);

    ctx.closePath();
    ctx.fill();


    // Lazo.

    ctx.fillStyle = palette.hair;

    ctx.beginPath();

    ctx.moveTo(450, 800);
    ctx.lineTo(405, 770);
    ctx.lineTo(410, 830);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(450, 800);
    ctx.lineTo(495, 770);
    ctx.lineTo(490, 830);
    ctx.closePath();
    ctx.fill();

    drawCircle(450, 800, 12, palette.accent);


    // Detalles de la ropa.

    drawLine(
        450, 830,
        450, 970,
        palette.hair,
        3
    );

    for (let i = 0; i < 4; i++) {

        drawCircle(
            450,
            860 + i * 30,
            4,
            palette.hair
        );

    }

}


/* =========================================
   8. ROSTRO ANIME
   ========================================= */

function drawFace() {

    const palette = palettes[currentPalette];

    // Forma de la cara.

    ctx.fillStyle = palette.skin;

    ctx.beginPath();

    ctx.ellipse(
        450, 470,
        145, 190,
        0, 0, Math.PI * 2
    );

    ctx.fill();


    // Sombra lateral.

    ctx.fillStyle = palette.skinShadow;

    ctx.beginPath();

    ctx.ellipse(
        570, 490,
        22, 85,
        .2, 0, Math.PI * 2
    );

    ctx.fill();


    // Mejillas.

    ctx.globalAlpha = .5;

    ctx.fillStyle = "#ed929c";

    drawCircle(350, 530, 25, "#ed929c");
    drawCircle(550, 530, 25, "#ed929c");

    ctx.globalAlpha = 1;


    // Nariz.

    drawCircle(
        450,
        515,
        4,
        palette.skinShadow
    );


    // Boca.

    ctx.strokeStyle = "#a85f69";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(435, 560);

    ctx.quadraticCurveTo(
        450, 570,
        465, 560
    );

    ctx.stroke();


    // Ojos.

    for (let i = 0; i < 2; i++) {

        const eyeX = i === 0 ? 390 : 510;

        // Blanco del ojo.

        ctx.fillStyle = "#fffaf0";

        ctx.beginPath();

        ctx.ellipse(
            eyeX,
            465,
            39,
            48,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // Iris.

        const eyeGradient = ctx.createLinearGradient(
            eyeX,
            435,
            eyeX,
            500
        );

        eyeGradient.addColorStop(0, palette.hairLight);
        eyeGradient.addColorStop(1, palette.eye);

        ctx.fillStyle = eyeGradient;

        ctx.beginPath();

        ctx.ellipse(
            eyeX,
            470,
            25,
            36,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // Pupila.

        drawCircle(
            eyeX,
            475,
            14,
            "#263c35"
        );


        // Brillo.

        drawCircle(
            eyeX - 9,
            455,
            9,
            "#ffffff"
        );

        drawCircle(
            eyeX + 9,
            486,
            4,
            "#ffffff"
        );


        // Pestañas.

        ctx.strokeStyle = palette.hair;
        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(eyeX - 35, 438);
        ctx.lineTo(eyeX - 43, 425);

        ctx.moveTo(eyeX, 420);
        ctx.lineTo(eyeX, 410);

        ctx.moveTo(eyeX + 30, 438);
        ctx.lineTo(eyeX + 42, 427);

        ctx.stroke();

    }


    // Cejas.

    ctx.strokeStyle = palette.hair;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(355, 408);
    ctx.quadraticCurveTo(390, 385, 420, 405);

    ctx.moveTo(480, 405);
    ctx.quadraticCurveTo(510, 385, 545, 408);

    ctx.stroke();

}


/* =========================================
   9. FLEQUILLO Y CABELLO FRONTAL
   ========================================= */

function drawHairFront() {

    const palette = palettes[currentPalette];

    ctx.fillStyle = palette.hair;

    // Parte superior del cabello.

    ctx.beginPath();

    ctx.moveTo(305, 430);

    ctx.bezierCurveTo(
        245, 275,
        330, 215,
        450, 220
    );

    ctx.bezierCurveTo(
        585, 200,
        665, 310,
        595, 440
    );

    ctx.bezierCurveTo(
        550, 390,
        510, 360,
        470, 395
    );

    ctx.bezierCurveTo(
        430, 350,
        385, 380,
        350, 445
    );

    ctx.closePath();

    ctx.fill();


    // Flequillo izquierdo.

    ctx.beginPath();

    ctx.moveTo(330, 345);

    ctx.quadraticCurveTo(
        345, 425,
        390, 430
    );

    ctx.quadraticCurveTo(
        380, 390,
        420, 370
    );

    ctx.quadraticCurveTo(
        380, 350,
        380, 315
    );

    ctx.closePath();

    ctx.fill();


    // Flequillo central.

    ctx.beginPath();

    ctx.moveTo(390, 300);

    ctx.quadraticCurveTo(
        450, 350,
        455, 425
    );

    ctx.quadraticCurveTo(
        480, 365,
        510, 345
    );

    ctx.quadraticCurveTo(
        465, 305,
        470, 260
    );

    ctx.closePath();

    ctx.fill();


    // Flequillo derecho.

    ctx.beginPath();

    ctx.moveTo(475, 270);

    ctx.quadraticCurveTo(
        550, 315,
        570, 415
    );

    ctx.quadraticCurveTo(
        615, 370,
        590, 310
    );

    ctx.closePath();

    ctx.fill();


    // Brillos del cabello.

    for (let i = 0; i < 5; i++) {

        ctx.strokeStyle = palette.hairLight;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";

        ctx.beginPath();

        ctx.moveTo(
            350 + i * 42,
            290 + random(0, 30)
        );

        ctx.quadraticCurveTo(
            410 + i * 20,
            270,
            450 + i * 15,
            290 + random(0, 20)
        );

        ctx.stroke();

    }


    // Accesorio floral.

    drawFlower(
        570,
        340,
        18,
        palette.accent
    );

}


/* =========================================
   10. ELEMENTOS EXTRA
   ========================================= */

function drawAccessories() {

    const palette = palettes[currentPalette];

    // Pendientes.

    drawFlower(
        305,
        525,
        13,
        palette.accent
    );

    drawFlower(
        595,
        525,
        13,
        palette.accent
    );


    // Flores en la ropa.

    drawFlower(
        330,
        850,
        15,
        palette.hairLight
    );

    drawFlower(
        565,
        850,
        15,
        palette.accent
    );


    // Pequeños adornos.

    for (let i = 0; i < 15; i++) {

        const x = random(290, 610);
        const y = random(700, 1000);

        if (i % 2 === 0) {

            drawStar(
                x,
                y,
                random(4, 10),
                palette.hairLight
            );

        } else {

            drawCircle(
                x,
                y,
                random(3, 6),
                palette.accent
            );

        }

    }

}


/* =========================================
   11. TEXTOS DEL AFICHE
   ========================================= */

function drawTypography() {

    const palette = palettes[currentPalette];

    ctx.textAlign = "center";


    // Título principal.

    ctx.fillStyle = palette.hair;

    ctx.font = "bold 62px Georgia";

    ctx.fillText(
        "GREEN DREAMS",
        450,
        105
    );


    // Subtítulo.

    ctx.fillStyle = palette.eye;

    ctx.font = "20px Arial";

    ctx.fillText(
        "A BOTANICAL ANIME UNIVERSE",
        450,
        145
    );


    // Etiqueta superior.

    ctx.font = "14px monospace";

    ctx.fillText(
        "GENERATIVE ART / Nº 001",
        450,
        65
    );


    // Frase inferior.

    ctx.fillStyle = palette.hair;

    ctx.font = "italic 30px Georgia";

    ctx.fillText(
        "Bloom beyond imagination.",
        450,
        1035
    );


    // Información inferior.

    ctx.fillStyle = palette.eye;

    ctx.font = "13px monospace";

    ctx.fillText(
        "CREATED WITH CODE + CREATIVITY",
        450,
        1070
    );


    // Decoraciones tipográficas laterales.

    ctx.save();

    ctx.translate(95, 550);
    ctx.rotate(-Math.PI / 2);

    ctx.font = "12px monospace";
    ctx.fillText("ART • NATURE • DREAMS", 0, 0);

    ctx.restore();


    ctx.save();

    ctx.translate(805, 550);
    ctx.rotate(Math.PI / 2);

    ctx.font = "12px monospace";
    ctx.fillText("GENERATIVE COLLECTION", 0, 0);

    ctx.restore();

}


/* =========================================
   12. FUNCIÓN PRINCIPAL DE DIBUJO
   ========================================= */

function drawComposition() {

    // Limpiar Canvas.

    ctx.clearRect(0, 0, WIDTH, HEIGHT);


    // Componer el fondo.

    drawBackground();


    // Decoración botánica.

    drawDecoration();


    // Personaje.

    drawHairBack();

    drawBody();

    drawFace();

    drawHairFront();

    drawAccessories();


    // Textos integrados.

    drawTypography();


    // Actualizar contador.

    if (generationLabel) {

        generationLabel.textContent =
            `GENERATION ${String(generation).padStart(3, "0")}`;

    }

}


/* =========================================
   13. SELECCIÓN DE PALETA
   ========================================= */

function selectPalette(index) {

    currentPalette = index;

    // Actualizar estado visual de botones.

    paletteButtons.forEach(button => {

        const selected =
            Number(button.dataset.palette) === index;

        button.classList.toggle("selected", selected);

    });


    // Actualizar ilustración.

    drawComposition();

}


// Conectar botones de paleta.

paletteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index = Number(button.dataset.palette);

        selectPalette(index);

    });

});


/* =========================================
   14. GENERAR NUEVA COMPOSICIÓN
   ========================================= */

if (generateBtn) {

    generateBtn.addEventListener("click", () => {

        generation++;

        // Animación del botón.

        generateBtn.classList.add("generating");

        generateBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> GENERANDO...';


        // Crear una nueva composición.

        drawComposition();


        // Restaurar botón.

        setTimeout(() => {

            generateBtn.classList.remove("generating");

            generateBtn.innerHTML =
                '<i class="fa-solid fa-wand-magic-sparkles"></i> GENERAR ARTE <span>↗</span>';

        }, 350);

    });

}


/* =========================================
   15. DESCARGAR PNG
   ========================================= */

if (downloadBtn) {

    downloadBtn.addEventListener("click", () => {

        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");

        link.download =
            `green-dreams-${String(generation).padStart(3, "0")}.png`;

        link.href = image;

        link.click();

    });

}


/* =========================================
   16. FORMULARIO DEMOSTRATIVO
   ========================================= */

const formulario = document.getElementById("contact-form");

const respuesta = document.getElementById("form-response");

if (formulario && respuesta) {

    formulario.addEventListener("submit", event => {

        event.preventDefault();

        if (!formulario.checkValidity()) {

            formulario.reportValidity();

            return;

        }

        respuesta.textContent =
            "✳ ¡Formulario completado! Esta fue una prueba demostrativa. No se enviaron ni almacenaron datos.";

        formulario.reset();

    });

}


/* =========================================
   17. MENÚ RESPONSIVE
   ========================================= */

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

const navItems = document.querySelectorAll(".nav-links a");


function closeMenu() {

    navLinks.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Abrir menú");

    menuToggle.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

}


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    navItems.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 750) {
            closeMenu();
        }

    });

}


/* =========================================
   18. ANIMACIONES DE APARICIÓN
   ========================================= */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (reduceMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

} else {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: .12
        }
    );


    revealElements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index % 4, 3) * 70}ms`;

        observer.observe(element);

    });

}


/* =========================================
   19. BARRA DE PROGRESO
   ========================================= */

const progressBar = document.getElementById("scroll-progress");

let ticking = false;

function updateProgress() {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const percentage = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    ticking = false;

}


window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(updateProgress);

        ticking = true;

    }

}, { passive: true });


/* =========================================
   20. NAVEGACIÓN ACTIVA
   ========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   21. AÑO AUTOMÁTICO
   ========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   22. INICIALIZACIÓN
   ========================================= */

// IMPORTANTE:
// La primera composición se genera automáticamente
// al cargar la página.

generation = 1;

drawComposition();

console.log(
    "%c✿ GREEN DREAMS",
    "font-size:22px;font-weight:bold;color:#8dbb6a;"
);

console.log(
    "%cGenerative Art Laboratory — Wendy Caguamas",
    "font-size:12px;color:#777;"
);
