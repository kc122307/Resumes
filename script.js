// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Debounced Scroll Event
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');

    // Header scroll effect
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, 100);
});

// Back to top button click
const backToTopBtn = document.getElementById('backToTop');
backToTopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Reusable GSAP scroll animation function
function animateOnScroll(elements, triggerSelector, delayStep = 0.1, duration = 0.6, start = "top 70%") {
  elements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: i * delayStep,
        scrollTrigger: {
          trigger: triggerSelector,
          start,
          toggleActions: "play none none none"
        }
      }
    );
  });
}

// Animate section titles
document.querySelectorAll('section').forEach(section => {
  const title = section.querySelector('.section-title');
  if (title) {
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});

// Animate skills, portfolio, hobbies
animateOnScroll(document.querySelectorAll('.skill-card'), '#skills');
animateOnScroll(document.querySelectorAll('.portfolio-item'), '#portfolio', 0.2);
animateOnScroll(document.querySelectorAll('.hobby-card'), '#hobbies');

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll restoration for hash on page load
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }, 300);
    }
  }
});
