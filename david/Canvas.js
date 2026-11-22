// PERFIL CREATIVO - DAVID AGILA
// Funciones de Canvas, galería y formulario.


// 1. OBTENER EL CANVAS

const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");


// 2. DIBUJAR EL PAISAJE

function dibujarPaisaje() {

    // CIELO
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, 600, 350);

    // SOL
    ctx.beginPath();
    ctx.arc(500, 65, 38, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();

    // NUBE 1
    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();
    ctx.arc(100, 70, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(125, 58, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(155, 70, 22, 0, Math.PI * 2);
    ctx.fill();

    // MONTAÑA 1
    ctx.fillStyle = "#536B8E";
    ctx.fillRect(35, 205, 220, 100);

    ctx.beginPath();
    ctx.arc(145, 205, 110, Math.PI, Math.PI * 2);
    ctx.fill();

    // MONTAÑA 2
    ctx.fillStyle = "#657C9B";
    ctx.fillRect(270, 190, 230, 115);

    ctx.beginPath();
    ctx.arc(385, 190, 115, Math.PI, Math.PI * 2);
    ctx.fill();

    // PASTO
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, 280, 600, 70);

    // ÁRBOL 1 - TRONCO
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(85, 225, 22, 65);

    // ÁRBOL 1 - COPA
    ctx.beginPath();
    ctx.arc(96, 210, 38, 0, Math.PI * 2);
    ctx.fillStyle = "#006400";
    ctx.fill();

    // ÁRBOL 2 - TRONCO
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(430, 235, 22, 55);

    // ÁRBOL 2 - COPA
    ctx.beginPath();
    ctx.arc(441, 215, 34, 0, Math.PI * 2);
    ctx.fillStyle = "#006400";
    ctx.fill();

}


// 3. BOTÓN PARA VOLVER A DIBUJAR

document.getElementById("redibujar").addEventListener("click", function() {

    dibujarPaisaje();

});


// 4. CARGAR FOTOGRAFÍAS

const subirFotos = document.getElementById("subirFotos");

const galeriaUsuario = document.getElementById("galeriaUsuario");

subirFotos.addEventListener("change", function() {

    const archivos = subirFotos.files;

    for (let i = 0; i < archivos.length; i++) {

        const archivo = archivos[i];

        if (archivo.type.startsWith("image/")) {

            const lector = new FileReader();

            lector.onload = function(evento) {

                const figura = document.createElement("figure");

                const imagen = document.createElement("img");

                imagen.src = evento.target.result;
                imagen.alt = archivo.name;

                const texto = document.createElement("figcaption");

                texto.textContent = archivo.name;

                figura.appendChild(imagen);
                figura.appendChild(texto);

                galeriaUsuario.appendChild(figura);

            };

            lector.readAsDataURL(archivo);

        }

    }

    subirFotos.value = "";

});


// 5. CARGAR AUDIOS

const subirAudios = document.getElementById("subirAudios");

const listaAudios = document.getElementById("listaAudios");

subirAudios.addEventListener("change", function() {

    const archivos = subirAudios.files;

    for (let i = 0; i < archivos.length; i++) {

        const archivo = archivos[i];

        if (archivo.type.startsWith("audio/")) {

            const contenedor = document.createElement("div");

            contenedor.className = "audio-item";

            const nombre = document.createElement("p");

            nombre.textContent = archivo.name;

            const reproductor = document.createElement("audio");

            reproductor.src = URL.createObjectURL(archivo);

            reproductor.controls = true;

            contenedor.appendChild(nombre);
            contenedor.appendChild(reproductor);

            listaAudios.appendChild(contenedor);

        }

    }

    subirAudios.value = "";

});


// 6. FORMULARIO DE CONTACTO

const formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;

    const respuesta = document.getElementById("respuestaFormulario");

    respuesta.textContent = "¡Gracias, " + nombre +
        "! Tu formulario se ha completado correctamente.";

    formulario.reset();

});


// 7. DIBUJAR EL PAISAJE AL ABRIR LA PÁGINA

dibujarPaisaje();
