// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initAnimations();
});

// ==================== CAROUSEL ====================
function initCarousels() {
    // Get ALL carousels instead of just one
    const carousels = document.querySelectorAll('.custom-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev-control');
        const nextBtn = carousel.querySelector('.next-control');
        
        let currentIndex = 0;
        let autoTimer = null;

        function goToSlide(index) {
            currentIndex = index;
            
            // Move track
            track.style.transform = `translateX(-${currentIndex * 33.333}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Handle video playback
            slides.forEach((slide, i) => {
                const video = slide.querySelector('video');
                if (video) {
                    if (i === index) {
                        video.play();
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
            
            scheduleNext();
        }

        function scheduleNext() {
            clearTimeout(autoTimer);
            
            const video = slides[currentIndex].querySelector('video');
            
            if (video && !video.loop) {
                video.onended = next;
            } else {
                autoTimer = setTimeout(next, 4000);
            }
        }

        function next() {
            goToSlide((currentIndex + 1) % slides.length);
        }

        function prev() {
            goToSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        // Event listeners
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i));
        });

        // Start
        goToSlide(0);
    });
}

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll reveal for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Parallax header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrolled = window.pageYOffset;
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = Math.max(1 - scrolled / 500, 0);
        }
    });

    // Tilt effect on cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 1000);
    }

    // Glowing mouse effect on header
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('mousemove', (e) => {
            const rect = header.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            header.style.background = `
                radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%),
                linear-gradient(135deg, #15803d 0%, #34d399 50%, #65a30d 100%)
            `;
        });
    }

    // Stagger animation for social links
    document.querySelectorAll('.social-links a').forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 1500 + (i * 100));
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Section reveal on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Header particles
    createParticles();
}

// ==================== PARTICLES ====================
function createParticles() {
    const header = document.querySelector('header');
    if (!header) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 15}s linear infinite;
        `;
        header.appendChild(particle);
    }
}

// ==================== DYNAMIC STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');