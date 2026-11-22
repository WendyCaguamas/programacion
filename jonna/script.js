
/* =========================================
   WENDY CAGUAMAS — CREATIVE ARCHIVE
   INTERACTIVITY
   ========================================= */


/* =========================================
   1. ELEMENTOS
   ========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const progressBar = document.getElementById("scroll-progress");

const formulario = document.getElementById("contact-form");
const respuesta = document.getElementById("form-response");

const currentYear = document.getElementById("current-year");
const currentYearTop = document.getElementById("current-year-top");


/* =========================================
   2. AÑO AUTOMÁTICO
   ========================================= */

const year = new Date().getFullYear();

if (currentYear) {
    currentYear.textContent = year;
}

if (currentYearTop) {
    currentYearTop.textContent = year;
}


/* =========================================
   3. MENÚ RESPONSIVE
   ========================================= */

function closeMenu() {

    navLinks.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Abrir menú");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

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


    // Cerrar menú al seleccionar una sección

    navItems.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    // Cerrar con Escape

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // Cerrar al volver a escritorio

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {
            closeMenu();
        }

    });

}


/* =========================================
   4. ANIMACIONES DE APARICIÓN
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

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element, index) => {

        // Pequeño retraso escalonado

        const delay = Math.min(index % 4, 3) * 90;

        element.style.transitionDelay = `${delay}ms`;

        revealObserver.observe(element);

    });

}


/* =========================================
   5. BARRA DE PROGRESO
   ========================================= */

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

        window.requestAnimationFrame(updateProgress);

        ticking = true;

    }

}, { passive: true });


updateProgress();


/* =========================================
   6. NAVEGACIÓN ACTIVA
   ========================================= */

const sections = document.querySelectorAll("main section[id]");


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );

                    });

                }

            });

        },
        {
            threshold: 0,
            rootMargin: "-25% 0px -65% 0px"
        }
    );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   7. FORMULARIO DEMOSTRATIVO
   ========================================= */

if (formulario && respuesta) {

    formulario.addEventListener("submit", event => {

        event.preventDefault();

        // Verificar los campos obligatorios

        if (!formulario.checkValidity()) {

            formulario.reportValidity();

            return;

        }


        // Mostrar confirmación de prueba

        respuesta.textContent =
            "✳ ¡Formulario completado correctamente! Esta fue una prueba demostrativa. No se enviaron ni almacenaron datos.";


        // Animar mensaje

        respuesta.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(10px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 450,
                easing: "ease-out"
            }
        );


        // Limpiar formulario

        formulario.reset();


        // Desplazarse hacia la respuesta

        respuesta.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest"
        });

    });

}


/* =========================================
   8. EFECTO HOVER EN TARJETAS
   ========================================= */

const cards = document.querySelectorAll(
    ".art-card, .media-card"
);


cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("card-hover");

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("card-hover");

    });

});


/* =========================================
   9. ANIMACIÓN INICIAL
   ========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    console.log(
        "%c✳ WENDY CAGUAMAS",
        "font-size:22px; font-weight:bold; color:#9ab72d;"
    );

    console.log(
        "%cCreative Archive — Gracias por visitar mi pequeño mundo ♡",
        "font-size:12px; color:#777;"
    );

});
