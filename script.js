document.addEventListener('DOMContentLoaded', () => {

    // --- LIGHT/DARK THEME TOGGLE ENGINE ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved preference or fallback to default dark mode
    const storedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', storedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    });

    // --- MOBILE BURGER NAVIGATION ENGINE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-content a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // --- CURSOR REACTIVE MOUSE GLOW PARALLAX (HERO) ---
    const heroVisual = document.getElementById('heroVisual');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroVisual.getBoundingClientRect();
            const x = (e.clientX - left) - width / 2;
            const y = (e.clientY - top) - height / 2;
            
            // Subtle premium tilt/parallax vector calculation
            const card = heroVisual.querySelector('.hero-glow-card');
            if (card) {
                card.style.transform = `rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg) translateY(${-y * 0.02}px)`;
            }
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            const card = heroVisual.querySelector('.hero-glow-card');
            if (card) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
            }
        });
    }

    // --- ANIMATED COUNTERS ENGINE (SCROLL DRIVEN) ---
    const counterBoxes = document.querySelectorAll('.counter-box');
    
    const runCounters = (box) => {
        const counter = box.querySelector('.stat-number');
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let count = 0;
        const speed = target / 60; // Standardize across numbers
        
        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count).toLocaleString() + (target === 84 ? 'M+' : target === 94 ? '%' : '+');
                setTimeout(updateCount, 16);
            } else {
                counter.innerText = target.toLocaleString() + (target === 84 ? 'M+' : target === 94 ? '%' : '+');
            }
        };
        updateCount();
    };

    // Incremental simulation loop on Hero badge counter
    const kpiCounter = document.getElementById('kpiCounter');
    if (kpiCounter) {
        setInterval(() => {
            let cur = parseInt(kpiCounter.innerText, 10);
            kpiCounter.innerText = cur + Math.floor(Math.random() * 2);
        }, 4000);
    }

    // --- EXPANDABLE TIMELINE ENGINE & PROGRESS LINE ---
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.getElementById('timelineProgress');

    timelineSteps.forEach((step, index) => {
        const card = step.querySelector('.step-card');
        card.addEventListener('click', () => {
            // Toggle open states smoothly
            step.classList.toggle('expanded');
            
            // Adjust step progress bar tracking position dynamically
            const activeSteps = document.querySelectorAll('.timeline-step.expanded').length;
            const percentage = (activeSteps / timelineSteps.length) * 100;
            timelineProgress.style.height = `${percentage}%`;
        });
    });

    // --- TESTIMONIAL CAROUSEL MECHANICS ---
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    // --- FAQ ACCORDION MECHANICS ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        
        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Reset previous opens for accordion cleanliness
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-content').style.maxHeight = null;
            });
            
            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- INTERSECTION OBSERVER FOR VISIBILITY REVEALS ---
    const revealElements = document.querySelectorAll('.reveal');
    let countersFired = false;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger statistics metrics animations once visible
                if (entry.target.classList.contains('metrics-section') && !countersFired) {
                    counterBoxes.forEach(box => runCounters(box));
                    countersFired = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
    // Explicitly append observer to the metrics row
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) revealObserver.observe(metricsSection);

    // --- INTERACTIVE MOCK BOOKING CTA SYSTEM ---
    const timeSlots = document.querySelectorAll('.time-slot');
    const calDays = document.querySelectorAll('.cal-day:not(.empty)');
    const bookingAction = document.getElementById('bookingAction');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
        });
    });

    calDays.forEach(day => {
        day.addEventListener('click', () => {
            calDays.forEach(d => d.classList.remove('active'));
            day.classList.add('active');
        });
    });

    if (bookingAction) {
        bookingAction.addEventListener('click', () => {
            bookingAction.innerHTML = 'Session Confirmed <i class="fas fa-check-circle"></i>';
            bookingAction.style.background = '#4ade80';
            bookingAction.style.color = '#0f1117';
        });
    }
});