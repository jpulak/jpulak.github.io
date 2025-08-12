document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#navbar a");
  const sections = document.querySelectorAll("main section");

  // Intersection Observer to fade sections in when scrolled
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.25 }
  );
  sections.forEach((section) => observer.observe(section));

  // Highlight nav link based on scroll position
  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.pageYOffset >= top) {
        currentId = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Add click handlers for fullscreen dynamic sections (CS, Marketing)
  document.querySelectorAll(".dynamic-section").forEach((section) => {
    // Allow Enter key to activate link
    section.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        section.click();
      }
    });

    section.addEventListener("click", () => {
      // Determine section id for redirection
      const id = section.id;
      window.location.href = id + ".html";
    });
  });

  // Carousel Logic
  function setupCarousel(carouselClass, controlClass) {
    const carousel = document.querySelector(carouselClass);
    if (!carousel) return;

    const slides = carousel.querySelectorAll(".project-slide");
    const controls = document.querySelector(controlClass);
    if (!slides.length || !controls) return;

    let currentIndex = 0;

    const prevBtn = controls.querySelector(".prev-btn");
    const nextBtn = controls.querySelector(".next-btn");

    function showSlide(index) {
      slides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    // Enable keyboard navigation of slides
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevBtn.click();
      } else if (e.key === "ArrowRight") {
        nextBtn.click();
      }
    });

    showSlide(currentIndex);
  }

  setupCarousel(".cs-carousel", ".cs-controls");
  setupCarousel(".marketing-carousel", ".marketing-controls");
});
