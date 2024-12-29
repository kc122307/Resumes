// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initial page load animations
gsap.from(".hero", {
    delay: 0.4,
    opacity: 0,
    duration: 1,
    y: 40,
    ease: "power2.out"  // Added easing for smoother animation
});

// Header animation - Modified to fade in/out smoothly
gsap.to("header", {
    scrollTrigger: {
        trigger: "#about",
        scroller: "body",
        start: "top 60%",
        end: "top 20%",
        scrub: true,  // Smooth scrubbing effect
        toggleActions: "play reverse play reverse"  // Better scroll behavior
    },
    opacity: 0,
    yPercent: -50
});

// About section animations
gsap.from("#about h1", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8
});

gsap.from("#about div", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.3  // Reduced stagger time for smoother flow
});

// Skills section animations
gsap.from("#skills h1", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8
});

gsap.from("#skills .skills div", {  // More specific selector
    scrollTrigger: {
        trigger: "#skills",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
});

// Portfolio section animations
gsap.from("#portfolio h1", {
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8
});

gsap.from("#portfolio .portfolio-item", {  // More specific selector
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.3
});

// Hobbies section animations
gsap.from("#hobbies h1", {
    scrollTrigger: {
        trigger: "#hobbies",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8
});

gsap.from("#hobbies .hobby", {  // More specific selector
    scrollTrigger: {
        trigger: "#hobbies",
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
});

// Add smooth scrolling for navigation links
document.querySelectorAll('header a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        } else {
            console.error(`Target section "${targetId}" not found.`);
        }
    });
});
