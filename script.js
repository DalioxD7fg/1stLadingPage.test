// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('custom-cursor');
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const glow = document.querySelector('.bg-glow');

    // --- Custom Cursor & BG Glow Logic ---
    document.addEventListener('mousemove', (e) => {
        // Update custom cursor
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });

        gsap.to(follower, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3
        });

        // Update background glow position
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        glow.style.setProperty('--x', `${xPercent}%`);
        glow.style.setProperty('--y', `${yPercent}%`);
    });

    // Hover effects for links and buttons
    const interactiveElements = document.querySelectorAll('a, .btn, .project-card, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 });
            gsap.to(follower, { scale: 1.5, borderColor: 'var(--accent-color)', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, borderColor: 'var(--text-primary)', duration: 0.3 });
        });
    });

    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('theme-alt');
            
            // Visual feedback on button
            if (document.documentElement.classList.contains('theme-alt')) {
                themeBtn.innerText = 'Noche';
            } else {
                themeBtn.innerText = 'Día';
            }

            // Pulse the background glow to show change
            gsap.fromTo('.bg-glow', 
                { opacity: 0 }, 
                { opacity: 1, duration: 1, ease: 'power2.out' }
            );
        });
    }

    // --- Rocket Logic ---
    let rocketDur = 20;
    const rocketOrbit = document.getElementById('rocket-orbit');
    const rocket = document.getElementById('rocket');

    let rocketAnimation = gsap.to(rocketOrbit, {
        rotation: 360,
        duration: rocketDur,
        repeat: -1,
        ease: "none"
    });

    rocket.addEventListener('click', () => {
        // Increase speed by decreasing duration, but not below 1s
        rocketDur = Math.max(1, rocketDur * 0.5);
        
        // Smoothly transition to new speed
        gsap.to(rocketAnimation, {
            duration: rocketDur,
            overwrite: true,
            ease: "power2.out"
        });

        // Add a little visual feedback
        gsap.to(rocket, {
            scale: 2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    });

    // --- Preloader Logic ---
    let counter = { value: 0 };
    const loaderText = document.querySelector('.loader-text');
    const loaderBar = document.querySelector('.loader-bar');

    const loaderTl = gsap.timeline({
        onComplete: () => {
            gsap.to('#loader', {
                opacity: 0,
                duration: 0.8,
                ease: 'power4.inOut',
                onComplete: () => {
                    document.getElementById('loader').style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.body.style.overflowX = 'hidden';
                    // Trigger hero animations after loader
                    startHeroAnimations();
                }
            });
        }
    });

    loaderTl.to(counter, {
        value: 100,
        duration: 3,
        ease: 'power2.inOut',
        onUpdate: () => {
            loaderText.innerText = Math.round(counter.value);
        }
    }, 0);

    loaderTl.to(loaderBar, {
        width: '100%',
        duration: 3,
        ease: 'power2.inOut'
    }, 0);

    // --- Hero Animations (Wrapped in function) ---
    function startHeroAnimations() {
        const heroTl = gsap.timeline();
        
        heroTl.to('.hero-tagline', {
            opacity: 1,
            y: -10,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.hero h1', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.2
        }, "-=0.4")
        .to('.hero-cta', {
            opacity: 1,
            y: -10,
            duration: 0.8,
            ease: 'power3.out'
        }, "-=0.6")
        .from('.social-links', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        }, "-=1");
    }

    // Section Titles Reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project Cards Reveal
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            once: true // Ensures they stay visible and don't re-animate
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Skills Reveal
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 90%',
            once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out'
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
