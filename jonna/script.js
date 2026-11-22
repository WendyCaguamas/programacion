
/* =========================================================
   WENDY CAGUAMAS — GENERADOR DE ARTE BOTÁNICO
   Canvas HTML5 + JavaScript
   ========================================================= */

const canvas = document.getElementById("art-canvas");

if (!canvas) {
    console.error("No se encontró el canvas #art-canvas");
} else {
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    const generateBtn = document.getElementById("generate-btn");
    const downloadBtn = document.getElementById("download-btn");
    const paletteButtons = document.querySelectorAll("[data-palette]");

    // -----------------------------------------------------
    // PALETAS
    // -----------------------------------------------------

    const palettes = [
        {
            name: "Green Garden",
            background: "#d9efbd",
            background2: "#a9cf8b",
            dark: "#263e2c",
            green: "#527d48",
            green2: "#83a968",
            light: "#f2f5d8",
            flower: "#f5f0d2",
            flower2: "#b8d68c",
            skin: "#f2c9a9",
            hair: "#344b35",
            clothes: "#75945c"
        },
        {
            name: "Pink Dreams",
            background: "#f4dce3",
            background2: "#e8b9c9",
            dark: "#573d4d",
            green: "#66845d",
            green2: "#9eae7a",
            light: "#fff0df",
            flower: "#fff2ef",
            flower2: "#d98fa9",
            skin: "#f4c6ad",
            hair: "#674d5b",
            clothes: "#a77a91"
        }
    ];

    let currentPalette = 0;
    let flowers = [];
    let leaves = [];
    let particles = [];
    let animationId = null;
    let lastTime = 0;

    // -----------------------------------------------------
    // UTILIDADES
    // -----------------------------------------------------

    const random = (min, max) =>
        Math.random() * (max - min) + min;

    const choose = array =>
        array[Math.floor(Math.random() * array.length)];

    function circle(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function ellipse(x, y, rx, ry, color, rotation = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
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

    function line(x1, y1, x2, y2, color, width = 2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();
    }

    // -----------------------------------------------------
    // GENERACIÓN DE ELEMENTOS
    // Se crean una sola vez por composición.
    // -----------------------------------------------------

    function createFlowers() {
        flowers = [];

        // Flores principales
        for (let i = 0; i < 17; i++) {
            flowers.push({
                x: random(25, W - 25),
                y: random(35, H - 35),
                size: random(10, 21),
                petals: Math.floor(random(5, 8)),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.00012, 0.00012),
                phase: random(0, Math.PI * 2),
                amplitude: random(1, 4),
                speed: random(0.00015, 0.0004),
                color: Math.random() > 0.5 ? "flower" : "flower2"
            });
        }

        // Flores pequeñas para rellenar el fondo
        for (let i = 0; i < 25; i++) {
            flowers.push({
                x: random(15, W - 15),
                y: random(15, H - 15),
                size: random(4, 9),
                petals: Math.floor(random(4, 6)),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.00008, 0.00008),
                phase: random(0, Math.PI * 2),
                amplitude: random(0.5, 1.5),
                speed: random(0.00008, 0.00018),
                color: Math.random() > 0.5 ? "flower" : "flower2"
            });
        }
    }

    function createLeaves() {
        leaves = [];

        // Hojas grandes: movimiento lento y amplio
        for (let i = 0; i < 16; i++) {
            leaves.push({
                x: random(15, W - 15),
                y: random(20, H - 20),
                size: random(18, 32),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.0001, 0.0001),
                phase: random(0, Math.PI * 2),
                amplitude: random(2, 5),
                speed: random(0.00012, 0.00025),
                type: "large"
            });
        }

        // Hojas medianas: movimiento suave
        for (let i = 0; i < 22; i++) {
            leaves.push({
                x: random(15, W - 15),
                y: random(20, H - 20),
                size: random(10, 17),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.00006, 0.00006),
                phase: random(0, Math.PI * 2),
                amplitude: random(1, 2.5),
                speed: random(0.00006, 0.00012),
                type: "medium"
            });
        }

        // Hojas pequeñas: movimiento MUY lento
        for (let i = 0; i < 30; i++) {
            leaves.push({
                x: random(10, W - 10),
                y: random(10, H - 10),
                size: random(4, 8),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.000015, 0.000015),
                phase: random(0, Math.PI * 2),
                amplitude: random(0.2, 0.7),
                speed: random(0.000015, 0.000035),
                type: "small"
            });
        }
    }

    function createParticles() {
        particles = [];

        for (let i = 0; i < 35; i++) {
            particles.push({
                x: random(0, W),
                y: random(0, H),
                radius: random(1, 2.5),
                alpha: random(0.15, 0.5),
                phase: random(0, Math.PI * 2)
            });
        }
    }

    // -----------------------------------------------------
    // FONDO ESTÁTICO
    // -----------------------------------------------------

    function drawBackground(p) {
        const gradient = ctx.createLinearGradient(0, 0, W, H);

        gradient.addColorStop(0, p.background);
        gradient.addColorStop(1, p.background2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);

        // Manchas decorativas
        for (let i = 0; i < 13; i++) {
            const x = (i * 137) % W;
            const y = (i * 211) % H;

            circle(x, y, random(18, 42), p.light + "25");
        }

        // Marco
        ctx.strokeStyle = p.dark + "65";
        ctx.lineWidth = 2;
        ctx.strokeRect(15, 15, W - 30, H - 30);

        ctx.strokeStyle = p.dark + "35";
        ctx.lineWidth = 1;
        ctx.strokeRect(23, 23, W - 46, H - 46);
    }

    // -----------------------------------------------------
    // DECORACIÓN BOTÁNICA ESTÁTICA
    // -----------------------------------------------------

    function drawStaticBotanical(p) {
        // Tallos y ramas
        for (let i = 0; i < 12; i++) {
            const x = random(0, W);
            const y = random(0, H);
            const length = random(25, 65);

            line(
                x,
                y,
                x + random(-20, 20),
                y + length,
                p.green + "80",
                1.5
            );
        }

        // Pequeños puntos decorativos
        for (let i = 0; i < 65; i++) {
            circle(
                random(20, W - 20),
                random(20, H - 20),
                random(1, 2),
                p.dark + "35"
            );
        }
    }

    // -----------------------------------------------------
    // PERSONAJE CENTRAL
    // -----------------------------------------------------

    function drawCharacter(p) {
        const cx = W / 2;
        const headY = H * 0.36;

        // Cabello trasero
        ellipse(cx, headY + 20, 112, 140, p.hair);

        // Cabello lateral
        ellipse(cx - 83, headY + 42, 35, 105, p.hair, -0.12);
        ellipse(cx + 83, headY + 42, 35, 105, p.hair, 0.12);

        // Cuello
        ctx.fillStyle = p.skin;
        ctx.fillRect(cx - 19, headY + 75, 38, 55);

        // Cuerpo
        polygon([
            [cx - 65, headY + 115],
            [cx + 65, headY + 115],
            [cx + 95, H * 0.88],
            [cx - 95, H * 0.88]
        ], p.clothes);

        // Cuello de la ropa
        polygon([
            [cx - 28, headY + 110],
            [cx, headY + 140],
            [cx + 28, headY + 110]
        ], p.light);

        // Brazos
        ellipse(cx - 78, H * 0.67, 18, 90, p.skin, 0.12);
        ellipse(cx + 78, H * 0.67, 18, 90, p.skin, -0.12);

        // Rostro
        ellipse(cx, headY, 76, 96, p.skin);

        // Flequillo
        polygon([
            [cx - 75, headY - 18],
            [cx - 68, headY - 83],
            [cx - 30, headY - 105],
            [cx + 25, headY - 100],
            [cx + 72, headY - 58],
            [cx + 68, headY - 5],
            [cx + 38, headY - 43],
            [cx + 10, headY - 12],
            [cx - 12, headY - 52],
            [cx - 42, headY - 10]
        ], p.hair);

        // Ojos
        ellipse(cx - 29, headY + 10, 8, 13, p.dark);
        ellipse(cx + 29, headY + 10, 8, 13, p.dark);

        // Brillos de ojos
        circle(cx - 26, headY + 5, 2.5, p.light);
        circle(cx + 32, headY + 5, 2.5, p.light);

        // Mejillas
        ellipse(cx - 48, headY + 34, 10, 5, "#e99c9c80");
        ellipse(cx + 48, headY + 34, 10, 5, "#e99c9c80");

        // Boca
        ctx.beginPath();
        ctx.arc(cx, headY + 39, 7, 0.1, Math.PI - 0.1);
        ctx.strokeStyle = p.dark;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Adorno floral en el cabello
        drawFlower(cx + 57, headY - 55, 12, p.flower);
        circle(cx + 57, headY - 55, 3, p.flower2);
    }

    // -----------------------------------------------------
    // FLORES
    // -----------------------------------------------------

    function drawFlower(x, y, size, color, rotation = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i;

            ellipse(
                Math.cos(angle) * size * 0.65,
                Math.sin(angle) * size * 0.65,
                size * 0.48,
                size * 0.27,
                color,
                angle
            );
        }

        circle(0, 0, size * 0.25, "#d6a94e");

        ctx.restore();
    }

    function drawAnimatedFlowers(time, p) {
        flowers.forEach(flower => {
            const movement = Math.sin(
                time * flower.speed + flower.phase
            ) * flower.amplitude;

            const color = p[flower.color];

            drawFlower(
                flower.x,
                flower.y + movement,
                flower.size,
                color,
                flower.rotation
            );

            flower.rotation += flower.rotationSpeed;
        });
    }

    // -----------------------------------------------------
    // HOJAS
    // -----------------------------------------------------

    function drawLeaf(leaf, time, p) {
        const movement = Math.sin(
            time * leaf.speed + leaf.phase
        ) * leaf.amplitude;

        const x = leaf.x;
        const y = leaf.y + movement;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(leaf.rotation);

        const color = leaf.type === "small"
            ? p.green2 + "B0"
            : p.green + "C0";

        ellipse(
            0,
            0,
            leaf.size,
            leaf.size * 0.38,
            color
        );

        // Nervadura
        line(
            -leaf.size * 0.8,
            0,
            leaf.size * 0.8,
            0,
            p.dark + "55",
            0.8
        );

        ctx.restore();

        // Rotación proporcional al tamaño:
        // las pequeñas prácticamente permanecen quietas.
        leaf.rotation += leaf.rotationSpeed;
    }

    function drawAnimatedLeaves(time, p) {
        leaves.forEach(leaf => drawLeaf(leaf, time, p));
    }

    // -----------------------------------------------------
    // PARTÍCULAS DECORATIVAS
    // -----------------------------------------------------

    function drawParticles(time, p) {
        particles.forEach(particle => {
            const alpha = particle.alpha *
                (0.7 + Math.sin(time * 0.0003 + particle.phase) * 0.3);

            ctx.globalAlpha = alpha;
            circle(
                particle.x,
                particle.y,
                particle.radius,
                p.light
            );
        });

        ctx.globalAlpha = 1;
    }

    // -----------------------------------------------------
    // DIBUJO COMPLETO
    // -----------------------------------------------------

    function drawArtwork() {
        const p = palettes[currentPalette];

        drawBackground(p);
        drawStaticBotanical(p);
        drawCharacter(p);
    }

    // -----------------------------------------------------
    // ANIMACIÓN
    // -----------------------------------------------------

    function animate(time = 0) {
        animationId = requestAnimationFrame(animate);

        const p = palettes[currentPalette];

        // Limpiar y reconstruir la base estática.
        drawArtwork();

        // Dibujar únicamente los elementos animados encima.
        drawParticles(time, p);
        drawAnimatedLeaves(time, p);
        drawAnimatedFlowers(time, p);
    }

    // -----------------------------------------------------
    // GENERAR NUEVA COMPOSICIÓN
    // -----------------------------------------------------

    function generateArtwork() {
        createFlowers();
        createLeaves();
        createParticles();

        drawArtwork();
    }

    // -----------------------------------------------------
    // CAMBIAR PALETA
    // -----------------------------------------------------

    function changePalette(index) {
        currentPalette = Number(index) === 1 ? 1 : 0;

        generateArtwork();

        paletteButtons.forEach(button => {
            const active = Number(button.dataset.palette) === currentPalette;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    // -----------------------------------------------------
    // DESCARGAR PNG
    // -----------------------------------------------------

    function downloadArtwork() {
        drawArtwork();

        const p = palettes[currentPalette];

        drawParticles(performance.now(), p);
        drawAnimatedLeaves(performance.now(), p);
        drawAnimatedFlowers(performance.now(), p);

        const link = document.createElement("a");
        link.download = "wendy-caguamas-artwork.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    // -----------------------------------------------------
    // FORMULARIO DEMOSTRATIVO
    // -----------------------------------------------------

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const message = document.querySelector("#form-message");

            if (message) {
                message.textContent =
                    "¡Gracias! Este formulario es una demostración.";
            }

            contactForm.reset();
        });
    }

    // -----------------------------------------------------
    // MENÚ MÓVIL
    // -----------------------------------------------------

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(nav.classList.contains("open"))
            );
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // -----------------------------------------------------
    // EVENTOS
    // -----------------------------------------------------

    if (generateBtn) {
        generateBtn.addEventListener("click", generateArtwork);
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", downloadArtwork);
    }

    paletteButtons.forEach(button => {
        button.addEventListener("click", () => {
            changePalette(button.dataset.palette);
        });
    });

    // -----------------------------------------------------
    // INICIO AUTOMÁTICO
    // -----------------------------------------------------

    generateArtwork();

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
        animationId = requestAnimationFrame(animate);
    }
}
