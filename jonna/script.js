
/* ==========================================
   WENDY CAGUAMAS — INTERACTIVE SCRIPT
========================================== */


/* ==========================================
   1. MOBILE MENU
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
   2. ACTIVE NAVIGATION
========================================== */

const observedSections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    threshold: 0.35
});

observedSections.forEach(section => observer.observe(section));


/* ==========================================
   3. CANVAS SETUP
========================================== */

const canvas = document.getElementById("art-canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let paletteIndex = 0;
let generation = 1;
let characterStyle = 0;
let flowers = [];
let animationFrame;


/* ==========================================
   4. COLOR PALETTES
========================================== */

const palettes = [
    {
        background: "#dce9b3",
        background2: "#b8d18b",
        dark: "#405b38",
        hair: "#344b37",
        hairLight: "#66834d",
        skin: "#f1c9ad",
        skinShade: "#dcaa91",
        eyes: "#587c4b",
        clothes: "#789b59",
        clothesLight: "#b4ca87",
        flower: "#fff0df",
        flowerCenter: "#e4a5a9",
        leaf: "#6f9951",
        text: "#405b38"
    },

    {
        background: "#f2dce5",
        background2: "#e2b9ca",
        dark: "#76516d",
        hair: "#63445e",
        hairLight: "#a8799b",
        skin: "#f3cdbb",
        skinShade: "#dca18f",
        eyes: "#806080",
        clothes: "#ae7c9d",
        clothesLight: "#dfb8cd",
        flower: "#fff5f0",
        flowerCenter: "#d58ca9",
        leaf: "#9b829e",
        text: "#76516d"
    }
];


/* ==========================================
   5. HELPER FUNCTIONS
========================================== */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function circle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function ellipse(x, y, rx, ry, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function polygon(points, color) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    points.slice(1).forEach(point => {
        ctx.lineTo(point[0], point[1]);
    });

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function strokeLine(x1, y1, x2, y2, color, width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}


/* ==========================================
   6. BACKGROUND
========================================== */

function drawBackground(p) {
    const gradient = ctx.createLinearGradient(0, 0, W, H);

    gradient.addColorStop(0, p.background);
    gradient.addColorStop(1, p.background2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // Decorative circles
    circle(90, 150, 45, p.flower);
    circle(630, 670, 65, p.background2);

    // Main frame
    ctx.strokeStyle = p.dark;
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, W - 50, H - 50);

    ctx.strokeStyle = `${p.dark}66`;
    ctx.lineWidth = 1;
    ctx.strokeRect(38, 38, W - 76, H - 76);

    // Decorative orbit
    ctx.beginPath();
    ctx.ellipse(360, 390, 260, 310, -0.2, 0, Math.PI * 2);
    ctx.strokeStyle = `${p.dark}55`;
    ctx.stroke();
}


/* ==========================================
   7. FLOWER DRAWING
========================================== */

function drawFlower(x, y, size, color, center, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i;

        const px = Math.cos(angle) * size * 0.62;
        const py = Math.sin(angle) * size * 0.62;

        ellipse(px, py, size * 0.43, size * 0.3, color);
    }

    circle(0, 0, size * 0.25, center);

    ctx.restore();
}


/* ==========================================
   8. LEAF DRAWING
========================================== */

function drawLeaf(x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size, -size, size * 1.6, 0);
    ctx.quadraticCurveTo(size, size, 0, 0);

    ctx.fillStyle = color;
    ctx.fill();

    strokeLine(0, 0, size * 1.4, 0, "#ffffff55", 1);

    ctx.restore();
}


/* ==========================================
   9. CREATE ANIMATED FLOWERS
========================================== */

function createFlowers() {
    flowers = [];

    // 18 animated flowers
    for (let i = 0; i < 18; i++) {
        flowers.push({
            x: random(45, W - 45),
            y: random(70, H - 70),
            size: random(7, 17),
            speed: random(0.25, 0.8),
            rotation: random(0, Math.PI * 2),
            rotationSpeed: random(-0.012, 0.012),
            sway: random(0.5, 1.8),
            phase: random(0, Math.PI * 2),
            colorType: randomInt(0, 1)
        });
    }
}


/* ==========================================
   10. ANIMATE FLOWERS
========================================== */

function animateFlowers(p) {
    flowers.forEach(flower => {

        flower.y -= flower.speed;
        flower.x += Math.sin(flower.phase) * flower.sway;

        flower.phase += 0.018;
        flower.rotation += flower.rotationSpeed;

        // Return flower to the bottom
        if (flower.y < 45) {
            flower.y = H - 45;
            flower.x = random(45, W - 45);
        }

        const color = flower.colorType === 0
            ? p.flower
            : p.leaf;

        drawFlower(
            flower.x,
            flower.y,
            flower.size,
            color,
            p.flowerCenter,
            flower.rotation
        );
    });
}


/* ==========================================
   11. STATIC BOTANICAL DETAILS
========================================== */

function drawBotanicalDetails(p) {

    for (let i = 0; i < 12; i++) {
        const x = random(55, W - 55);
        const y = random(100, H - 100);

        drawLeaf(
            x,
            y,
            random(10, 22),
            random(-2, 2),
            p.leaf
        );
    }

    for (let i = 0; i < 20; i++) {
        circle(
            random(50, W - 50),
            random(80, H - 80),
            random(1, 3),
            p.dark
        );
    }
}


/* ==========================================
   12. BACK HAIR
========================================== */

function drawBackHair(p) {
    ctx.fillStyle = p.hair;

    ctx.beginPath();
    ctx.moveTo(250, 315);
    ctx.quadraticCurveTo(195, 170, 355, 180);
    ctx.quadraticCurveTo(520, 175, 475, 350);
    ctx.lineTo(490, 565);
    ctx.lineTo(440, 530);
    ctx.lineTo(415, 610);
    ctx.lineTo(380, 535);
    ctx.lineTo(345, 610);
    ctx.lineTo(305, 530);
    ctx.lineTo(255, 575);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < 6; i++) {
        strokeLine(
            275 + i * 28,
            300,
            280 + i * 27,
            510 + random(-20, 20),
            p.hairLight,
            5
        );
    }
}


/* ==========================================
   13. BODY AND CLOTHES
========================================== */

function drawBody(p) {

    // Neck
    ctx.fillStyle = p.skin;
    ctx.fillRect(326, 440, 68, 90);

    // Shoulders and outfit
    polygon([
        [325, 485],
        [395, 485],
        [435, 515],
        [485, 700],
        [235, 700],
        [285, 515]
    ], p.clothes);

    // Sleeves
    polygon([
        [290, 510],
        [245, 535],
        [210, 640],
        [260, 655],
        [315, 560]
    ], p.clothesLight);

    polygon([
        [430, 510],
        [475, 535],
        [510, 640],
        [460, 655],
        [405, 560]
    ], p.clothesLight);

    // Collar
    polygon([
        [315, 490],
        [360, 535],
        [405, 490],
        [385, 575],
        [335, 575]
    ], p.clothesLight);

    // Ribbon
    polygon([
        [360, 530],
        [335, 550],
        [350, 575],
        [360, 562],
        [370, 575],
        [385, 550]
    ], p.flowerCenter);

    // Arms
    ellipse(235, 655, 19, 48, p.skin);
    ellipse(485, 655, 19, 48, p.skin);

    // Hands
    ellipse(235, 698, 16, 19, p.skin);
    ellipse(485, 698, 16, 19, p.skin);

    // Outfit details
    for (let i = 0; i < 4; i++) {
        circle(360, 600 + i * 19, 3, p.flower);
    }
}


/* ==========================================
   14. FACE
========================================== */

function drawFace(p) {

    // Ears
    ellipse(270, 345, 20, 31, p.skin);
    ellipse(450, 345, 20, 31, p.skin);

    // Face
    ctx.fillStyle = p.skin;

    ctx.beginPath();
    ctx.moveTo(265, 260);
    ctx.quadraticCurveTo(360, 205, 455, 260);
    ctx.lineTo(440, 410);
    ctx.quadraticCurveTo(360, 480, 280, 410);
    ctx.closePath();
    ctx.fill();

    // Cheeks
    ellipse(298, 385, 22, 9, p.skinShade);
    ellipse(422, 385, 22, 9, p.skinShade);

    // Eyes
    ellipse(315, 350, 20, 27, "#fff9f0");
    ellipse(405, 350, 20, 27, "#fff9f0");

    ellipse(317, 354, 12, 21, p.eyes);
    ellipse(407, 354, 12, 21, p.eyes);

    ellipse(317, 359, 6, 13, "#252b22");
    ellipse(407, 359, 6, 13, "#252b22");

    circle(322, 344, 5, "#ffffff");
    circle(412, 344, 5, "#ffffff");

    // Eyelashes
    strokeLine(295, 335, 285, 325, p.hair, 3);
    strokeLine(425, 335, 435, 325, p.hair, 3);

    // Eyebrows
    strokeLine(297, 313, 335, 308, p.hair, 4);
    strokeLine(385, 308, 423, 313, p.hair, 4);

    // Nose
    strokeLine(360, 367, 355, 385, p.skinShade, 2);

    // Smile
    ctx.beginPath();
    ctx.arc(360, 399, 12, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = "#a35e62";
    ctx.lineWidth = 2;
    ctx.stroke();
}


/* ==========================================
   15. FRONT HAIR
========================================== */

function drawFrontHair(p) {

    ctx.fillStyle = p.hair;

    ctx.beginPath();
    ctx.moveTo(255, 335);
    ctx.quadraticCurveTo(220, 210, 350, 195);
    ctx.quadraticCurveTo(480, 185, 465, 330);
    ctx.quadraticCurveTo(430, 285, 400, 260);
    ctx.quadraticCurveTo(375, 320, 350, 330);
    ctx.quadraticCurveTo(340, 280, 325, 265);
    ctx.quadraticCurveTo(305, 325, 270, 350);
    ctx.closePath();
    ctx.fill();

    // Bangs
    polygon([
        [270, 270],
        [330, 230],
        [330, 350],
        [295, 325]
    ], p.hairLight);

    polygon([
        [330, 230],
        [390, 235],
        [375, 340],
        [350, 315]
    ], p.hair);

    polygon([
        [390, 235],
        [445, 275],
        [420, 350],
        [395, 320]
    ], p.hairLight);

    // Hair accessory
    if (characterStyle === 1) {
        drawFlower(445, 278, 18, p.flower, p.flowerCenter);
    } else {
        drawFlower(280, 280, 13, p.flower, p.flowerCenter);
    }
}


/* ==========================================
   16. CHARACTER DECORATIONS
========================================== */

function drawCharacterDetails(p) {

    // Earrings
    circle(270, 380, 5, p.flowerCenter);
    circle(450, 380, 5, p.flowerCenter);

    // Necklace
    strokeLine(325, 500, 360, 535, p.dark, 2);
    strokeLine(395, 500, 360, 535, p.dark, 2);

    // Pendant
    drawFlower(360, 550, 10, p.flower, p.flowerCenter);

    // Decorative clothing flowers
    drawFlower(295, 565, 9, p.flower, p.flowerCenter);
    drawFlower(425, 565, 9, p.flower, p.flowerCenter);
}


/* ==========================================
   17. DRAW STATIC COMPOSITION
========================================== */

function drawBase() {

    const p = palettes[paletteIndex];

    ctx.clearRect(0, 0, W, H);

    drawBackground(p);
    drawBotanicalDetails(p);

    drawBackHair(p);
    drawBody(p);
    drawFace(p);
    drawFrontHair(p);
    drawCharacterDetails(p);

    // Canvas typography
    ctx.textAlign = "center";
    ctx.fillStyle = p.text;

    ctx.font = 'italic 40px "Playfair Display"';
    ctx.fillText("Green Dreams", W / 2, 770);

    ctx.font = '11px "DM Mono"';
    ctx.fillText("BOTANICAL CHARACTER STUDY", W / 2, 797);

    ctx.font = '10px "DM Mono"';
    ctx.fillText(
        `GENERATION ${String(generation).padStart(3, "0")}`,
        W / 2,
        824
    );

    ctx.textAlign = "left";

    createFlowers();
}


/* ==========================================
   18. ANIMATION LOOP
========================================== */

function animate() {

    const p = palettes[paletteIndex];

    // Redraw the base illustration
    drawBaseFrame(p);

    // Draw moving flowers over it
    animateFlowers(p);

    animationFrame = requestAnimationFrame(animate);
}

function drawBaseFrame(p) {

    // Static composition without recreating flower particles
    ctx.clearRect(0, 0, W, H);

    drawBackground(p);
    drawBotanicalDetails(p);

    drawBackHair(p);
    drawBody(p);
    drawFace(p);
    drawFrontHair(p);
    drawCharacterDetails(p);

    ctx.textAlign = "center";
    ctx.fillStyle = p.text;

    ctx.font = 'italic 40px "Playfair Display"';
    ctx.fillText("Green Dreams", W / 2, 770);

    ctx.font = '11px "DM Mono"';
    ctx.fillText("BOTANICAL CHARACTER STUDY", W / 2, 797);

    ctx.font = '10px "DM Mono"';
    ctx.fillText(
        `GENERATION ${String(generation).padStart(3, "0")}`,
        W / 2,
        824
    );

    ctx.textAlign = "left";
}


/* ==========================================
   19. GENERATE NEW CHARACTER
========================================== */

function generateArtwork() {

    generation++;
    characterStyle = randomInt(0, 1);

    drawBase();
    drawBaseFrame(palettes[paletteIndex]);

    document.getElementById("generation-number").textContent =
        `GEN ${String(generation).padStart(3, "0")}`;
}


/* ==========================================
   20. PALETTE BUTTONS
========================================== */

const paletteButtons = document.querySelectorAll(".palette-option");

paletteButtons.forEach(button => {

    button.addEventListener("click", () => {

        paletteIndex = Number(button.dataset.palette);

        paletteButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        generateArtwork();
    });

});


/* ==========================================
   21. GENERATE BUTTON
========================================== */

document.getElementById("generate-btn").addEventListener("click", () => {

    const button = document.getElementById("generate-btn");

    button.disabled = true;
    button.style.opacity = "0.6";

    generateArtwork();

    setTimeout(() => {
        button.disabled = false;
        button.style.opacity = "1";
    }, 250);
});


/* ==========================================
   22. DOWNLOAD PNG
========================================== */

document.getElementById("download-btn").addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = `green-dreams-${generation}.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
});


/* ==========================================
   23. DEMO CONTACT FORM
========================================== */

const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formResponse.textContent =
        "¡Prueba completada! El formulario es solo demostrativo.";

    contactForm.reset();
});


/* ==========================================
   24. START
========================================== */

drawBase();
animate();
