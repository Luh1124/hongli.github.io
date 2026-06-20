document.addEventListener('DOMContentLoaded', () => {

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const prefersDark = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : { matches: false, addEventListener: () => {} };

    const getStoredTheme = () => {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            return null;
        }
    };

    const setStoredTheme = (theme) => {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            root.dataset.theme = theme;
        }
    };

    const getPreferredTheme = () => getStoredTheme() || (prefersDark.matches ? 'dark' : 'light');

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        root.dataset.theme = theme;
        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            setStoredTheme(nextTheme);
            applyTheme(nextTheme);
        });
    }

    prefersDark.addEventListener('change', () => {
        if (!getStoredTheme()) {
            applyTheme(getPreferredTheme());
        }
    });

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
