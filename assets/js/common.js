document.addEventListener('DOMContentLoaded', () => {

    // Fade-in animation via Intersection Observer
    const fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        fadeEls.forEach((el) => observer.observe(el));
    }

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    if (sections.length && navLinks.length) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 100;
            let current = '';

            sections.forEach((section) => {
                if (scrollY >= section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', highlightNav, { passive: true });
        highlightNav();
    }

    // Back to Top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
    }

    // Close mobile nav on link click
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        document.querySelectorAll('.navbar .nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            });
        });
    }

    // News toggle
    const newsToggle = document.getElementById('newsToggle');
    const newsList = document.getElementById('newsList');
    if (newsToggle && newsList) {
        newsToggle.addEventListener('click', () => {
            const expanded = newsList.classList.toggle('expanded');
            newsToggle.classList.toggle('expanded', expanded);
            newsToggle.innerHTML = expanded
                ? '<i class="fa-solid fa-chevron-up me-1"></i>Show less'
                : '<i class="fa-solid fa-chevron-down me-1"></i>Show more';
        });
    }

});
