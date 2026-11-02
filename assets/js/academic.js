document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('navbarNav');
    document.querySelectorAll('.navbar .nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            // A fast selection can arrive while Bootstrap is still opening.
            if (mobileMenu?.classList.contains('collapsing')) {
                mobileMenu.addEventListener('shown.bs.collapse', () => {
                    window.bootstrap?.Collapse.getInstance(mobileMenu)?.hide();
                }, { once: true });
            }
        });
    });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const controllers = [];

    document.querySelectorAll('[data-demo]').forEach((button) => {
        const video = button.querySelector('video');
        const symbol = button.querySelector('.demo-symbol');
        const caption = button.querySelector('.demo-caption');
        const label = button.dataset.demo;
        let requested = false;
        let visible = false;
        let requestVersion = 0;

        const renderState = (playing) => {
            button.setAttribute('aria-pressed', String(playing));
            button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${label} preview`);
            symbol.textContent = playing ? 'Ⅱ' : '▶';
            caption.textContent = playing ? 'Pause' : 'Demo';
        };
        const pause = () => {
            requested = false;
            requestVersion += 1;
            video.pause();
            renderState(false);
        };
        const play = async () => {
            // Keyboard focus may scroll here before the observer's next update.
            const rect = button.getBoundingClientRect();
            visible = rect.bottom > 0 && rect.top < window.innerHeight;
            if (button.disabled || document.hidden || !visible) return;
            requested = true;
            const version = ++requestVersion;
            try {
                await video.play();
                if (!requested || version !== requestVersion || document.hidden || !visible) {
                    if (!requested || document.hidden || !visible) video.pause();
                    return;
                }
                renderState(true);
            } catch {
                if (version === requestVersion) pause();
            }
        };
        button.addEventListener('pointerenter', (event) => {
            if (event.pointerType === 'mouse' && !reducedMotion.matches) play();
        });
        button.addEventListener('pointerleave', pause);
        button.addEventListener('focus', () => {
            const rect = button.getBoundingClientRect();
            if (rect.top < 80 || rect.bottom > window.innerHeight) {
                button.scrollIntoView({ block: 'nearest', behavior: 'instant' });
            }
        });
        button.addEventListener('click', () => requested ? pause() : play());
        button.addEventListener('focusout', pause);
        video.addEventListener('error', () => {
            pause();
            button.disabled = true;
            button.setAttribute('aria-label', `${label} preview unavailable`);
            caption.textContent = 'Unavailable';
        });
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (!visible) pause();
        }, { threshold: 0.15 });
        observer.observe(button);
        controllers.push({ pause });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) controllers.forEach(({ pause }) => pause());
    });
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) controllers.forEach(({ pause }) => pause());
    });
});
