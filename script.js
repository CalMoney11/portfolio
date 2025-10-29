// ========================================
// GSAP SETUP
// ========================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ========================================
// PROGRESS BAR ANIMATION
// ========================================
gsap.to(".progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// ========================================
// HERO SECTION ANIMATIONS
// ========================================
function initHeroAnimations() {
    // Animate label
    gsap.from(".hero-content .label", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3
    });

    // Animate heading
    gsap.from(".hero-content h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    // Animate subtitle
    gsap.from(".hero-content .subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7
    });

    // Animate CTA buttons
    gsap.from(".hero-content .cta-buttons", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9
    });

    // Parallax background effect
    gsap.to(".hero-bg", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// ========================================
// HORIZONTAL SCROLL SECTION
// ========================================
function initHorizontalScroll() {
    const horizontalSection = document.querySelector(".horizontal-section");
    const horizontalWrapper = document.querySelector(".horizontal-wrapper");
    const panels = gsap.utils.toArray(".horizontal-panel");

    if (panels.length > 0) {
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: horizontalSection,
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + horizontalWrapper.offsetWidth
            }
        });
    }
}

// ========================================
// SERVICE CARDS ANIMATION - STICK ON SCROLL
// ========================================
function initServiceCards() {
    gsap.utils.toArray(".service-card").forEach((card, i) => {
        // Fade in and stay visible
        gsap.fromTo(card, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                    // Once it's in view, it stays
                    once: false
                }
            }
        );

        // Keep the card visible once it enters
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    });
}

// ========================================
// PARALLAX SECTION ANIMATIONS
// ========================================
function initParallaxSection() {
    // Background parallax
    gsap.to(".parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Content scale animation
    gsap.from(".parallax-content h2", {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
            trigger: ".parallax-content",
            start: "top 80%",
            end: "top 50%",
            scrub: 1
        }
    });
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function initStatsCounter() {
    gsap.utils.toArray(".stat-number").forEach(stat => {
        const target = stat.textContent;
        const num = parseInt(target);
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.inOut",
                    snap: { textContent: 1 },
                    stagger: 1,
                    onUpdate: function() {
                        const currentVal = Math.ceil(this.targets()[0].textContent);
                        if (target.includes('+')) {
                            stat.textContent = currentVal + '+';
                        } else if (target.includes('%')) {
                            stat.textContent = currentVal + '%';
                        } else {
                            stat.textContent = currentVal;
                        }
                    }
                });
            }
        });
    });
}

// ========================================
// CONTACT SECTION ANIMATION
// ========================================
function initContactAnimation() {
    gsap.from(".contact-content h2", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%",
            end: "top 40%",
            scrub: 1
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
function initMagneticButtons() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
}

// ========================================
// CURSOR FOLLOWER (OPTIONAL)
// ========================================
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #667eea;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = 1;
    });

    gsap.to(cursor, {
        duration: 0.3,
        repeat: -1,
        onRepeat: function() {
            gsap.set(cursor, {
                left: mouseX,
                top: mouseY
            });
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
    });
}

// ========================================
// SECTION REVEAL ANIMATION
// ========================================
function initSectionReveal() {
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 60%",
                scrub: 1
            }
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: header
        }
    });
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
}

function initAnimations() {
    initHeroAnimations();
    initHorizontalScroll();
    initServiceCards();
    initParallaxSection();
    initStatsCounter();
    initContactAnimation();
    initSmoothScroll();
    initMagneticButtons();
    initHeaderScroll();
    // initCursorFollower(); // Uncomment if you want the custom cursor
    // initSectionReveal(); // Uncomment for additional section animations
    
    console.log('🚀 All animations initialized!');
}

// Start the initialization
init();

// ========================================
// REFRESH SCROLLTRIGGER ON WINDOW RESIZE
// ========================================
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});