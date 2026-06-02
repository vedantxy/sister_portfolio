/* ═══════════════════════════════════════════════════════════════
   PRIYABEN PATEL — PORTFOLIO INTERACTIVE JAVASCRIPT
   Premium animations, smooth scrolling, and interactive UI
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────────────────
    // NAVBAR — Scroll effects & active link tracking
    // ─────────────────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    const sections = document.querySelectorAll('.section[id]');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // Navbar scroll effect
    let lastScrollY = 0;
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide scroll to top button
        if (scrollToTopBtn) {
            if (currentScrollY > 600) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        // Hide scroll indicator after scrolling
        if (currentScrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Active section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Scroll to top
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ─────────────────────────────────────────────────────────
    // MOBILE NAVIGATION — Hamburger menu
    // ─────────────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile nav on outside click
    navMobile.addEventListener('click', (e) => {
        if (e.target === navMobile) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    // ─────────────────────────────────────────────────────────
    // SCROLL REVEAL ANIMATIONS
    // ─────────────────────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, stop observing for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    // ─────────────────────────────────────────────────────────
    // SKILL BAR ANIMATIONS
    // ─────────────────────────────────────────────────────────
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                // Slight delay for visual effect
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
                skillBarObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillBarObserver.observe(bar);
    });


    // ─────────────────────────────────────────────────────────
    // SMOOTH SCROLL — for navigation links
    // ─────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ─────────────────────────────────────────────────────────
    // CONTACT FORM — Visual feedback
    // ─────────────────────────────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;

            // Visual feedback
            submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Message Sent!
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }


    // ─────────────────────────────────────────────────────────
    // HERO PARALLAX SUBTLE EFFECT
    // ─────────────────────────────────────────────────────────
    const heroSection = document.getElementById('home');
    const floatingShapes = document.querySelectorAll('.floating-shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            // Subtle parallax on floating shapes
            floatingShapes.forEach((shape, index) => {
                const speed = 0.02 + (index * 0.01);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }, { passive: true });


    // ─────────────────────────────────────────────────────────
    // TYPING EFFECT — Hero subtitle
    // ─────────────────────────────────────────────────────────
    const heroTag = document.querySelector('.hero-tag');
    if (heroTag) {
        heroTag.style.opacity = '0';
        heroTag.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroTag.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTag.style.opacity = '1';
            heroTag.style.transform = 'translateY(0)';
        }, 500);
    }

    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // Hero subtitle animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 700);
    }

    // Hero description animation
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        heroDesc.style.opacity = '0';
        heroDesc.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroDesc.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroDesc.style.opacity = '1';
            heroDesc.style.transform = 'translateY(0)';
        }, 900);
    }

    // Hero buttons animation
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroButtons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 1100);
    }

    // Hero image animation
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper) {
        heroImageWrapper.style.opacity = '0';
        heroImageWrapper.style.transform = 'scale(0.9)';
        setTimeout(() => {
            heroImageWrapper.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            heroImageWrapper.style.opacity = '1';
            heroImageWrapper.style.transform = 'scale(1)';
        }, 600);
    }


    // ─────────────────────────────────────────────────────────
    // CARD TILT EFFECT — subtle 3D tilt on hover
    // ─────────────────────────────────────────────────────────
    const glassCards = document.querySelectorAll('.glass-card, .glass-card-sm');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });


    // ─────────────────────────────────────────────────────────
    // CURSOR GLOW EFFECT — on hero section
    // ─────────────────────────────────────────────────────────
    if (heroSection && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            heroSection.style.setProperty('--cursor-x', `${x}px`);
            heroSection.style.setProperty('--cursor-y', `${y}px`);
        });
    }


    // ─────────────────────────────────────────────────────────
    // COUNTER ANIMATION — for stats (if any)
    // ─────────────────────────────────────────────────────────
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };


    // ─────────────────────────────────────────────────────────
    // KEYBOARD NAVIGATION — Escape to close mobile menu
    // ─────────────────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    // ─────────────────────────────────────────────────────────
    // PRELOADER — Fade in page content
    // ─────────────────────────────────────────────────────────
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

});
