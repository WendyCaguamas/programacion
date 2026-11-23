
// Animación de entrada al hacer scroll

const elements = document.querySelectorAll(
    '.member, .section-heading, .closing'
);

elements.forEach(element => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

elements.forEach(element => {
    observer.observe(element);
});


// Interacción táctil para mostrar especialidades

const members = document.querySelectorAll('.member');

members.forEach(member => {

    member.addEventListener('touchstart', () => {

        members.forEach(other => {
            if (other !== member) {
                other.classList.remove('active');
            }
        });

        member.classList.toggle('active');

    }, { passive: true });

});
