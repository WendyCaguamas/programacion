/* ==========================================
   11. STATIC BOTANICAL DETAILS
========================================== */

let botanicalDetails = [];

function createBotanicalDetails() {

    botanicalDetails = [];

    // Hojas estáticas
    for (let i = 0; i < 12; i++) {
        botanicalDetails.push({
            type: "leaf",
            x: random(55, W - 55),
            y: random(100, H - 100),
            size: random(10, 22),
            angle: random(-2, 2)
        });
    }

    // Pequeños puntos decorativos estáticos
    for (let i = 0; i < 20; i++) {
        botanicalDetails.push({
            type: "dot",
            x: random(50, W - 50),
            y: random(80, H - 80),
            size: random(1, 3)
        });
    }
}

function drawBotanicalDetails(p) {

    botanicalDetails.forEach(detail => {

        if (detail.type === "leaf") {

            drawLeaf(
                detail.x,
                detail.y,
                detail.size,
                detail.angle,
                p.leaf
            );

        } else {

            circle(
                detail.x,
                detail.y,
                detail.size,
                p.dark
            );

        }

    });
}
