// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput.value) {
                // In a real application, you would send this to a server
                // For now, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Add active class to nav links based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop() ||
            (currentLocation.split('/').pop() === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animate elements when they come into view
    const animateOnScroll = function () {
        const animatedElements = document.querySelectorAll('.feature-card, .event-card, .testimonial-card');

        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .event-card, .testimonial-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Run once on initial load
    animateOnScroll();

    // Add floating animation to hero elements
    const heroElements = document.querySelector('.hero-section h1');
    if (heroElements) {
        heroElements.classList.add('animate-float');
    }

    // Add randomized colors to feature icons for visual interest
    const featureIcons = document.querySelectorAll('.feature-icon');
    const colors = [
        'var(--primary-color)',
        'var(--secondary-color)',
        'var(--accent-color-1)',
        'var(--accent-color-2)',
        'var(--accent-color-3)'
    ];

    featureIcons.forEach(icon => {
        // Add subtle animation to icons
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Responsive navigation menu behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function () {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Create a simple image carousel for the gallery page if it exists
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        const images = galleryCarousel.querySelectorAll('.gallery-image');
        let currentImageIndex = 0;

        const showImage = (index) => {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        };

        const prevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        };

        // Add navigation buttons if they exist
        const nextButton = document.querySelector('.gallery-next');
        const prevButton = document.querySelector('.gallery-prev');

        if (nextButton) nextButton.addEventListener('click', nextImage);
        if (prevButton) prevButton.addEventListener('click', prevImage);

        // Initialize the carousel
        showImage(currentImageIndex);

        // Auto-rotate every 5 seconds
        setInterval(nextImage, 5000);
    }
}); 