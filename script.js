document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#navbar a");
  const sections = document.querySelectorAll("main section");

  // Intersection observer for section fade-in
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.25 }
  );
  sections.forEach(section => observer.observe(section));

  // Highlight active nav on scroll
  window.addEventListener("scroll", () => {
    let currentSection = null;
    sections.forEach(section => {
      if(window.pageYOffset >= (section.offsetTop - 100)){
        currentSection = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if(link.getAttribute("href") === "#" + currentSection){
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling nav links
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if(targetEl){
        targetEl.scrollIntoView({behavior: "smooth"});
      }
    });
  });

  // Clickable fullscreen sections with Learn More overlay (CS & Marketing)
  document.querySelectorAll(".dynamic-section").forEach(section => {
    section.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        section.click();
      }
    });
    section.addEventListener("click", () => {
      const targetPage = section.id + ".html";
      window.location.href = targetPage;
    });
  });

  // Carousel Functionality
  function setupCarousel(carouselSelector, controlsSelector) {
    const carousel = document.querySelector(carouselSelector);
    if(!carousel) return;
    
    const slides = carousel.querySelectorAll(".project-slide");
    const controls = document.querySelector(controlsSelector);
    if(!controls || slides.length === 0) return;

    let currentIndex = 0;
    const prevBtn = controls.querySelector(".prev-btn");
    const nextBtn = controls.querySelector(".next-btn");

    function showSlide(index){
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex -1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex +1) % slides.length;
      showSlide(currentIndex);
    });

    // Keyboard navigation support
    carousel.addEventListener("keydown", e => {
      if(e.key === "ArrowLeft") prevBtn.click();
      else if(e.key === "ArrowRight") nextBtn.click();
    });

    showSlide(currentIndex);
  }

  setupCarousel(".cs-carousel", ".cs-controls");
  setupCarousel(".marketing-carousel", ".marketing-controls");

});

document.addEventListener('scroll', () => {
  document.querySelectorAll('.project-section').forEach(section => {
    const header = section.querySelector('.project-header');
    const rect = section.getBoundingClientRect();
    const fadePoint = window.innerHeight * 0.5;
    
    if (rect.top < fadePoint && rect.bottom > 0) {
      const progress = Math.min(1, Math.max(0, (fadePoint - rect.top) / fadePoint));
      header.style.opacity = 1 - progress; // fades out
      header.style.transform = `translateY(${progress * -30}px)`; // moves upward
    } else {
      header.style.opacity = 1;
      header.style.transform = 'translateY(0)';
    }
  });
});

