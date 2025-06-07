// Mobile menu functionality
const toggle = document.getElementById("menu-toggle");
const close = document.getElementById("close-menu");
const menu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll("#mobile-menu a");

[toggle, close].forEach((btn) =>
  btn.addEventListener("click", () => menu.classList.toggle("translate-x-full"))
);

mobileLinks.forEach((link) =>
  link.addEventListener("click", () => menu.classList.add("translate-x-full"))
);

//Minor bug fix: Edge case handling for mobile menu - if the screen is resized
const media = window.matchMedia("(width < 640px)");
media.addEventListener("change", (e) => updateMenu(e));

function updateMenu(e) {
  const isMobile = e.matches;
  if (isMobile) {
    menu.classList.remove("translate-x-full");
  } else {
    menu.classList.add("translate-x-full");
  }
}
media.addEventListener("change", (e) => {
  if (e.matches) {
    menu.classList.add("translate-x-full");
  }
});

// Active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a, #mobile-menu a");

// Lower threshold for better detection
const observerOptions = {
  threshold: 0.2,
};
const welcomeObserverOptions = {
  threshold: 0.4,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#" + entry.target.id) {
          link.classList.add("text-green-700");
        } else {
          link.classList.remove("text-green-700");
        }
      });
    }
  });
}, observerOptions);

let hasWelcomeSectionAnimated = false;
const welcomeLink = document.querySelector("#welcome-to-club");
const welcomeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      welcomeLink.classList.add("welcome-to-club");
      hasWelcomeSectionAnimated = true;
    }
  });
}, welcomeObserverOptions);

sections.forEach((section) => observer.observe(section));
welcomeObserver.observe(welcomeLink);
if (hasWelcomeSectionAnimated) welcomeObserver.unobserve(welcomeLink);

// Fallback: highlight on click for instant feedback
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("text-green-700"));
    this.classList.add("text-green-700");
  });
});

//Carousel scripts
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
function showSlide(slideIndex) {
  currentSlide = slideIndex;
  slides.forEach((slide) => {
    slide.classList.remove("active-slide");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
  });

  dots[slideIndex].classList.add("active-dot");
  slides[slideIndex].classList.add("active-slide");
  clearInterval(interval);
  interval = setInterval(() => {
    nextSlide();
  }, 3000);
}

let interval = setInterval(() => {
  nextSlide();
}, 3000);

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

//Funcitionality for sending email
function open(url) {
  window.location.href = url;
}
function sendMail() {
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value || "";
  const subject = encodeURIComponent("Contact Living Green Club PAU");
  const encodedMessage = encodeURIComponent(message);
  const recipientEmail = "living.green@pau.edu.ng";
  const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${encodedMessage}`;
  open(mailtoLink);
  document.querySelector("#email").value = "";
  document.querySelector("#message").value = "";
}
