
/* ==========================================
   WENDY CAGUAMAS — INTERACTIONS
========================================== */


/* ==========================================
   1. MENÚ RESPONSIVE
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


/* ==========================================
   2. NAVEGACIÓN ACTIVA
========================================== */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navigationLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    threshold: 0.25
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* ==========================================
   3. CONFIGURACIÓN DEL CANVAS
========================================== */

const canvas = document.getElementById("art-canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 720;
const HEIGHT = 850;

let currentPalette = 0;
let generation = 1;

const palettes = [
    {
        name: "Green Garden",
        background: "#dce9b3",
        backgroundDark: "#b5cd83",
        primary: "#526d3d",
        secondary: "#8ca95b",
        accent: "#d3a3a8",
        skin: "#f1c9ad",
        skinShadow: "#d99f87",
        hair: "#354c37",
        hairLight: "#617c4d",
        clothes: "#78975a",
        clothesLight: "#b6ca88",
        eye: "#536f46",
        flower: "#f3d9d2",
        detail: "#35452e"
    },

    {
        name: "Pink Dreams",
        background: "#f1dce2",
        backgroundDark: "#e2b9c8",
        primary: "#76536b",
        secondary: "#b47d9a",
        accent: "#a5a6d1",
        skin: "#f3cdbb",
        skinShadow: "#dca18f",
        hair: "#63445f",
        hairLight: "#a8789c",
        clothes: "#a87d9e",
        clothesLight: "#d9b2c6",
        eye: "#76536b",
        flower: "#fff0e9",
        detail: "#60465d"
    }
];


/* ==========================================
   4. FUNCIONES AUXILIARES
========================================== */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function circle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function line(x1, y1, x2, y2, color, width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function polygon(points, color) {
    ctx.beginPath();

    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function ellipse(x, y, rx, ry, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawText(text, x, y, size, color, font = "DM Mono") {
    ctx.fillStyle = color;
    ctx.font = `${size}px "${font}"`;
    ctx.fillText(text, x, y);
}


/* ==========================================
   5. FONDO Y COMPOSICIÓN
========================================== */

function drawBackground(p) {

    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);

    gradient.addColorStop(0, p.background);
    gradient.addColorStop(1, p.backgroundDark);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Marco exterior
    ctx.strokeStyle = p.primary;
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, WIDTH - 48, HEIGHT - 48);

    // Marco interior
    ctx.strokeStyle = p.secondary;
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, WIDTH - 72, HEIGHT - 72);

    // Formas decorativas
    circle(80, 100, 42, p.flower);
    circle(640, 735, 58, p.accent);

    // Círculo decorativo
    ctx.beginPath();
    ctx.arc(360, 390, 245, 0, Math.PI * 2);
    ctx.strokeStyle = p.secondary;
    ctx.lineWidth = 2;
    ctx.stroke();
}


/* ==========================================
   6. ESTRELLAS Y DETALLES
========================================== */

function drawStar(x, y, size, color) {

    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;

    ctx.beginPath();

    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const radius = i % 2 === 0 ? size : size * 0.3;

        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

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


/* ==========================================
   7. HOJAS Y FLORES
========================================== */

function drawLeaf(x, y, size, angle, color) {

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size, -size, size * 1.5, 0);
    ctx.quadraticCurveTo(size, size, 0, 0);

    ctx.fillStyle = color;
    ctx.fill();

    line(0, 0, size * 1.3, 0, "#ffffff66", 1);

    ctx.restore();
}

function drawFlower(x, y, size, color, centerColor) {

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i;

        const px = x + Math.cos(angle) * size * 0.65;
        const py = y + Math.sin(angle) * size * 0.65;

        ellipse(px, py, size * 0.4, size * 0.4, color);
    }

    circle(x, y, size * 0.28, centerColor);
}


/* ==========================================
   8. DECORACIONES ALEATORIAS
========================================== */

function drawDecorations(p) {

    // 20 elementos decorativos generados aleatoriamente
    for (let i = 0; i < 24; i++) {

        const x = random(65, WIDTH - 65);
        const y = random(110, HEIGHT - 110);
        const size = random(7, 20);

        if (i % 3 === 0) {
            drawFlower(x, y, size, p.flower, p.accent);
        } else if (i % 3 === 1) {
            drawLeaf(x, y, size, random(-2, 2), p.primary);
        } else {
            drawStar(x, y, size, p.flower);
        }
    }

    // Pequeños puntos
    for (let i = 0; i < 35; i++) {
        circle(
            random(50, WIDTH - 50),
            random(90, HEIGHT - 90),
            random(1, 3),
            p.primary
        );
    }
}


/* ==========================================
   9. CABELLO POSTERIOR
========================================== */

function drawBackHair(p, style) {

    ctx.fillStyle = p.hair;

    ctx.beginPath();
    ctx.moveTo(250, 300);
    ctx.quadraticCurveTo(180, 180, 360, 180);
    ctx.quadraticCurveTo(540, 180, 490, 370);
    ctx.lineTo(480, 590);
    ctx.quadraticCurveTo(445, 650, 420, 550);
    ctx.lineTo(390, 610);
    ctx.lineTo(360, 535);
    ctx.lineTo(320, 615);
    ctx.lineTo(290, 535);
    ctx.lineTo(245, 590);
    ctx.lineTo(250, 390);
    ctx.closePath();
    ctx.fill();

    // Mechones de cabello
    for (let i = 0; i < 7; i++) {

        const x = 255 + i * 31;

        ctx.beginPath();
        ctx.moveTo(x, 270);
        ctx.quadraticCurveTo(
            x + random(-20, 20),
            410,
            x + random(-25, 25),
            530
        );

        ctx.strokeStyle = p.hairLight;
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    if (style === 1) {
        ellipse(360, 205, 115, 45, p.hair);
    }

    if (style === 2) {
        drawFlower(465, 255, 24, p.flower, p.accent);
    }
}


/* ==========================================
   10. CUERPO Y ROPA
========================================== */

function drawBody(p) {

    // Cuello
    ctx.fillStyle = p.skin;
    ctx.fillRect(327, 445, 66, 90);

    // Cuello de la ropa
    polygon([
        [315, 495],
        [360, 530],
        [405, 495],
        [465, 690],
        [255, 690]
    ], p.clothesLight);

    // Cuerpo
    ctx.fillStyle = p.clothes;

    ctx.beginPath();
    ctx.moveTo(300, 500);
    ctx.quadraticCurveTo(250, 510, 230, 690);
    ctx.lineTo(490, 690);
    ctx.quadraticCurveTo(470, 510, 420, 500);
    ctx.quadraticCurveTo(360, 540, 300, 500);
    ctx.fill();

    // Mangas
    polygon([
        [300, 510],
        [250, 530],
        [210, 635],
        [255, 650],
        [315, 560]
    ], p.clothesLight);

    polygon([
        [420, 510],
        [470, 530],
        [510, 635],
        [465, 650],
        [405, 560]
    ], p.clothesLight);

    // Detalles de la ropa
    polygon([
        [340, 535],
        [360, 565],
        [380, 535],
        [370, 620],
        [350, 620]
    ], p.accent);

    line(360, 570, 360, 675, p.primary, 2);

    // Brazos
    ellipse(232, 640, 22, 55, p.skin);
    ellipse(488, 640, 22, 55, p.skin);

    // Manos
    ellipse(232, 690, 18, 23, p.skin);
    ellipse(488, 690, 18, 23, p.skin);
}


/* ==========================================
   11. ROSTRO
========================================== */

function drawFace(p, expression) {

    // Orejas
    ellipse(270, 350, 22, 35, p.skin);
    ellipse(450, 350, 22, 35, p.skin);

    // Rostro
    ctx.fillStyle = p.skin;

    ctx.beginPath();
    ctx.moveTo(260, 270);
    ctx.quadraticCurveTo(360, 205, 460, 270);
    ctx.lineTo(440, 410);
    ctx.quadraticCurveTo(360, 490, 280, 410);
    ctx.closePath();
    ctx.fill();

    // Sombras de mejillas
    ellipse(295, 390, 22, 9, p.skinShadow);
    ellipse(425, 390, 22, 9, p.skinShadow);

    // Ojos
    const eyeY = expression === 1 ? 360 : 355;

    // Ojo izquierdo
    ellipse(315, eyeY, 19, 27, "#fff8ed");
    ellipse(405, eyeY, 19, 27, "#fff8ed");

    ellipse(317, eyeY + 3, 11, 20, p.eye);
    ellipse(407, eyeY + 3, 11, 20, p.eye);

    ellipse(317, eyeY + 7, 5, 10, "#252b27");
    ellipse(407, eyeY + 7, 5, 10, "#252b27");

    circle(321, eyeY - 5, 5, "#ffffff");
    circle(411, eyeY - 5, 5, "#ffffff");

    // Pestañas
    line(296, eyeY - 15, 286, eyeY - 24, p.hair, 3);
    line(424, eyeY - 15, 434, eyeY - 24, p.hair, 3);

    // Cejas
    line(298, 320, 335, 315, p.hair, 4);
    line(385, 315, 422, 320, p.hair, 4);

    // Nariz
    line(360, 368, 355, 388, p.skinShadow, 2);

    // Boca
    ctx.beginPath();

    if (expression === 1) {
        ctx.arc(360, 404, 10, 0.1, Math.PI - 0.1);
    } else {
        ctx.arc(360, 397, 11, 0.1, Math.PI - 0.1);
    }

    ctx.strokeStyle = "#9e625e";
    ctx.lineWidth = 2;
    ctx.stroke();
}


/* ==========================================
   12. CABELLO FRONTAL
========================================== */

function drawFrontHair(p, style) {

    ctx.fillStyle = p.hair;

    // Parte superior
    ctx.beginPath();
    ctx.moveTo(260, 330);
    ctx.quadraticCurveTo(215, 210, 350, 205);
    ctx.quadraticCurveTo(470, 185, 465, 315);
    ctx.quadraticCurveTo(420, 280, 390, 260);
    ctx.quadraticCurveTo(365, 320, 350, 330);
    ctx.quadraticCurveTo(340, 285, 325, 270);
    ctx.quadraticCurveTo(310, 320, 280, 335);
    ctx.closePath();
    ctx.fill();

    // Mechones
    if (style === 0) {
        polygon([
            [270, 280],
            [320, 250],
            [330, 355],
            [295, 325]
        ], p.hairLight);

        polygon([
            [390, 250],
            [440, 275],
            [420, 355],
            [395, 325]
        ], p.hairLight);
    } else if (style === 1) {
        polygon([
            [275, 260],
            [355, 235],
            [350, 350],
            [320, 325]
        ], p.hairLight);

        polygon([
            [355, 235],
            [445, 270],
            [405, 340],
            [380, 300]
        ], p.hairLight);
    } else {
        polygon([
            [260, 280],
            [335, 230],
            [345, 350],
            [300, 320]
        ], p.hairLight);

        polygon([
            [390, 240],
            [460, 285],
            [420, 355],
            [400, 320]
        ], p.hairLight);
    }

    // Accesorio
    if (style === 2) {
        drawFlower(445, 280, 17, p.flower, p.accent);
    }
}


/* ==========================================
   13. DETALLES DEL PERSONAJE
========================================== */

function drawCharacterDetails(p) {

    // Collar
    line(325, 500, 360, 530, p.primary, 3);
    line(395, 500, 360, 530, p.primary, 3);

    // Colgante
    drawFlower(360, 548, 9, p.flower, p.accent);

    // Pequeñas flores decorativas
    drawFlower(290, 560, 11, p.flower, p.accent);
    drawFlower(430, 570, 11, p.flower, p.accent);

    // Detalles de ropa
    for (let i = 0; i < 4; i++) {
        circle(360, 590 + i * 20, 3, p.flower);
    }
}


/* ==========================================
   14. COMPOSICIÓN FINAL
========================================== */

function drawComposition() {

    const p = palettes[currentPalette];

    const hairStyle = randomInt(0, 2);
    const expression = randomInt(0, 1);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground(p);

    // Decoraciones traseras
    drawDecorations(p);

    // Personaje
    drawBackHair(p, hairStyle);
    drawBody(p);
    drawFace(p, expression);
    drawFrontHair(p, hairStyle);
    drawCharacterDetails(p);

    // Elementos botánicos cercanos
    for (let i = 0; i < 8; i++) {

        const side = i % 2 === 0 ? 1 : -1;
        const x = side === 1 ? random(480, 590) : random(100, 220);
        const y = random(320, 670);

        drawLeaf(
            x,
            y,
            random(12, 24),
            random(-2, 2),
            p.secondary
        );
    }

    // Título
    ctx.fillStyle = p.primary;
    ctx.textAlign = "center";
    ctx.font = 'italic 38px "Playfair Display"';
    ctx.fillText("Green Dreams", WIDTH / 2, 770);

    ctx.font = '12px "DM Mono"';
    ctx.fillText("BOTANICAL CHARACTER STUDY", WIDTH / 2, 795);

    ctx.font = '10px "DM Mono"';
    ctx.fillText(
        `GENERATION Nº ${String(generation).padStart(3, "0")}`,
        WIDTH / 2,
        825
    );

    ctx.textAlign = "left";

    document.getElementById("generation-number").textContent =
        `GEN ${String(generation).padStart(3, "0")}`;
}


/* ==========================================
   15. CAMBIAR PALETA
========================================== */

const paletteButtons = document.querySelectorAll(".palette-option");

paletteButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentPalette = Number(button.dataset.palette);

        paletteButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        generation++;
        drawComposition();
    });

});


/* ==========================================
   16. GENERAR NUEVA ILUSTRACIÓN
========================================== */

const generateButton = document.getElementById("generate-btn");

generateButton.addEventListener("click", () => {

    generateButton.disabled = true;
    generateButton.style.opacity = "0.6";

    generation++;
    drawComposition();

    generateButton.disabled = false;
    generateButton.style.opacity = "1";
});


/* ==========================================
   17. EXPORTAR PNG
========================================== */

const downloadButton = document.getElementById("download-btn");

downloadButton.addEventListener("click", () => {

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = `green-dreams-${generation}.png`;

    link.click();
});


/* ==========================================
   18. FORMULARIO DEMOSTRATIVO
========================================== */

const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formResponse.textContent =
        "¡Formulario probado correctamente! Esta demostración no envía ni guarda tus datos.";

    contactForm.reset();
});


/* ==========================================
   19. DIBUJO AUTOMÁTICO AL CARGAR
========================================== */

drawComposition();
