document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const sections = document.querySelectorAll("section");
    const backToTopBtn = document.querySelector(".back-to-top");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Scroll Animation
    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight / 1.2;
            if (sectionTop < triggerPoint) {
                section.classList.add("animated");
            }
        });
    }

    // Back to Top Button
    function handleScroll() {
        if (window.scrollY > 200) {
            backToTopBtn.style.opacity = 1;
        } else {
            backToTopBtn.style.opacity = 0;
        }
        revealSections();
    }

    // Smooth Scroll
    function smoothScroll(target, duration) {
        let targetPosition = document.querySelector(target).offsetTop;
        let startPosition = window.pageYOffset;
        let distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Event Listeners
    window.addEventListener("scroll", handleScroll);

    backToTopBtn.addEventListener("click", () => {
        smoothScroll("body", 1000);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("href");
            smoothScroll(target, 1000);
            if (nav.classList.contains("open")) {
                nav.classList.remove("open");
                menuToggle.classList.remove("open");
            }
        });
    });

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuToggle.classList.toggle("open");
    });

    // Initial animation on load
    revealSections();

    // Scroll Indicator
    const scrollIndicator = document.createElement("div");
    scrollIndicator.classList.add("scroll-indicator");
    document.body.appendChild(scrollIndicator);

    function updateScrollIndicator() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = (window.scrollY / maxScroll) * 100;
        scrollIndicator.style.width = `${percentage}%`;
    }

    window.addEventListener("scroll", updateScrollIndicator);
    updateScrollIndicator();

    // Form Validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            // Simulate form submission
            alert("Form submitted successfully!");
            form.reset();
        });
    }
});
