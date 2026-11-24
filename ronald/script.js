
// PANTALLA DE CARGA
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 1000);
});

// MENU PARA CELULARES
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuBtn.textContent =
        nav.classList.contains("open") ? "✕" : "☰";
});

// CERRAR MENU AL SELECCIONAR
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// CAMBIAR MODO OSCURO Y CLARO
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    themeBtn.textContent =
        document.body.classList.contains("light-mode")
        ? "☾"
        : "☀";
});

// ANIMACIONES AL DESPLAZARSE
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// AÑO AUTOMATICO
document.getElementById("year").textContent =
    new Date().getFullYear();

// EFECTO DE MOVIMIENTO EN LA FOTO
const photo = document.querySelector(".hero-image");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    photo.addEventListener("mousemove", (e) => {
        const rect = photo.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        photo.style.transform =
            `perspective(900px) rotateY(${(x - .5) * 8}deg) rotateX(${(.5 - y) * 8}deg)`;
    });

    photo.addEventListener("mouseleave", () => {
        photo.style.transform =
            "perspective(900px) rotateY(0deg) rotateX(0deg)";
    });
}
