document.addEventListener('DOMContentLoaded', () => {

    // --- LIGHT/DARK THEME TOGGLE ENGINE ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

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
        
        // Native burger UI layout response state transformations
        const spanLines = hamburger.querySelectorAll('span');
        if(hamburger.classList.contains('open')) {
            spanLines[0].style.transform = 'rotate(45deg) translateY(6px) translateX(5px)';
            spanLines[1].style.opacity = '0';
            spanLines[2].style.transform = 'rotate(-45deg) translateY(-6px) translateX(5px)';
        } else {
            spanLines[0].style.transform = 'none';
            spanLines[1].style.opacity = '1';
            spanLines[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => s.style.transform = 'none');
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
        });
    });

    // --- HIGH-FIDELITY LUXURY REALISTIC CALENDAR SCHEDULER GENERATOR ---
    const calendarGridArray = document.getElementById('calendarGridArray');
    
    if (calendarGridArray) {
        // Build actual complete 35-day structure for October 2026 (Begins on Thursday)
        const totalCells = 35;
        const leadingBlanks = 4; // Sun, Mon, Tue, Wed are blank padding
        const totalDaysInMonth = 31;
        
        let calendarHTMLString = '';
        
        // Render leading trailing dead cell offsets
        for (let i = 27; i < 27 + leadingBlanks; i++) {
            calendarHTMLString += `<div class="cal-day-unit inactive-month-day">${i}</div>`;
        }
        
        // Render regular authentic active calendar days
        for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
            // Setup conversion realistic design optimization parameters (Exclude select days)
            const isBookable = dayNum % 7 !== 0 && dayNum % 7 !== 1 && dayNum > 2; 
            const selectionClass = dayNum === 14 ? 'bookable-day-node selected-active-day' : isBookable ? 'bookable-day-node' : '';
            
            calendarHTMLString += `<div class="cal-day-unit ${selectionClass}">${dayNum}</div>`;
        }
        
        calendarGridArray.innerHTML = calendarHTMLString;

        // Attach event dynamic active listener loops directly onto node vectors
        const bookableNodes = calendarGridArray.querySelectorAll('.bookable-day-node');
        bookableNodes.forEach(node => {
            node.addEventListener('click', () => {
                bookableNodes.forEach(n => n.classList.remove('selected-active-day'));
                node.classList.add('selected-active-day');
            });
        });
    }

    // --- TIMELINE EXPERIMENTAL DEPTH ENGINE PROGRESS TRACKING ---
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.getElementById('timelineProgress');

    timelineSteps.forEach((step, index) => {
        const card = step.querySelector('.step-card');
        card.addEventListener('click', () => {
            step.classList.toggle('expanded');
            
            // Recalculate physical scroll progress line metric depths
            const allExpandedNodes = document.querySelectorAll('.timeline-step.expanded');
            if (timelineProgress) {
                const totalStepsCount = timelineSteps.length;
                let deepestActiveIndex = 0;
                
                timelineSteps.forEach((s, idx) => {
                    if(s.classList.contains('expanded') || idx === 0) {
                        deepestActiveIndex = idx;
                    }
                });
                
                const factorPercent = (deepestActiveIndex / (totalStepsCount - 1)) * 100;
                timelineProgress.style.height = `${factorPercent}%`;
            }
        });
    });

    // --- CURSOR REACTIVE MOUSE GLOW PARALLAX (HERO TILT MODULATION) ---
    const heroVisual = document.getElementById('heroVisual');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroVisual.getBoundingClientRect();
            const x = (e.clientX - left) - width / 2;
            const y = (e.clientY - top) - height / 2;
            
            const card = heroVisual.querySelector('.hero-glow-card');
            if (card) {
                card.style.transform = `rotateY(${x * 0.025}deg) rotateX(${-y * 0.025}deg) translateY(${-y * 0.01}px)`;
            }
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            const card = heroVisual.querySelector('.hero-glow-card');
            if (card) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
            }
        });
    }

    // --- SCROLL ACTION REVEALS & NUMBER TICKER MATRIX ---
    const counterBoxes = document.querySelectorAll('.counter-box');
    
    const runCounters = (box) => {
        const counter = box.querySelector('.stat-number');
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let count = 0;
        const speed = target / 50; 
        
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

    const kpiCounter = document.getElementById('kpiCounter');
    if (kpiCounter) {
        setInterval(() => {
            let cur = parseInt(kpiCounter.innerText, 10);
            kpiCounter.innerText = cur + Math.floor(Math.random() * 2);
        }, 4000);
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        
        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
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

    // Carousel Configuration Viewport
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if(track && cards.length > 0) {
        const updateCarousel = () => { track.style.transform = `translateX(-${currentIndex * 100}%)`; };
        nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); });
        prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); });
    }

    let countersFired = false;
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('metrics-section') && !countersFired) {
                    counterBoxes.forEach(box => runCounters(box));
                    countersFired = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) revealObserver.observe(metricsSection);

    // Interactive confirmation handler mockup UI
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
        });
    });

    const bookingAction = document.getElementById('bookingAction');
    if (bookingAction) {
        bookingAction.addEventListener('click', () => {
            bookingAction.innerHTML = 'Session Confirmed <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10.01-3-3"/></svg>';
            bookingAction.style.background = '#4ade80';
            bookingAction.style.color = '#0f1117';
        });
    }
});