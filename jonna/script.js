
// WENDY CAGUAMAS — INTERACTIONS

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navbar nav");

// Mobile navigation
menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");

  menuButton.textContent =
    navigation.classList.contains("active") ? "✕" : "☰";
});

// Close menu after clicking a link
document.querySelectorAll(".navbar nav a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menuButton.textContent = "☰";
  });
});

// Reveal elements when scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".section-heading, .about-title, .about-description, .art-card, .game-card, .contact h2"
).forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});

// Console identity
console.log(
  "%c WENDY CAGUAMAS ✳ ",
  "background:#d2ed65;color:#293b27;font-size:20px;font-weight:bold;padding:10px;"
);

console.log("Welcome to my little creative world ♡");
