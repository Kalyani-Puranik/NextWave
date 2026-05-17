document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // STATE REGISTRY
    // ==========================================================================
    let selectedDateState = null;
    let selectedTimeState = null;

    const timeSlotPoolTable = {
        typical: ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'],
        limited: ['11:00 AM', '02:00 PM'],
        packed:  ['08:30 AM', '10:00 AM', '11:30 AM', '04:00 PM', '05:30 PM']
    };

    // ==========================================================================
    // DOM CACHE REGISTRY
    // ==========================================================================
    const calendarGrid    = document.getElementById('calendarGrid');
    const timeSlotsContainer = document.getElementById('timeSlotsContainer');
    const bookingAction   = document.getElementById('bookingAction');
    const bookingFeedback = document.getElementById('bookingFeedback');
    const heroVisual      = document.getElementById('heroVisual');

    // ==========================================================================
    // INITIALIZATION PIPELINE
    // ==========================================================================
    const initApp = () => {
        buildCalendarDOM();
        initTimelineAccordion();
        initScrollIntersectionObserver();
    };

    // ==========================================================================
    // CALENDAR MATRIX GENERATION Engine
    // ==========================================================================
    const buildCalendarDOM = () => {
        if (!calendarGrid) return;
        calendarGrid.innerHTML = '';

        // Generate structural paddings for previous month boundary offset
        for (let i = 0; i < 2; i++) {
            const blankNode = document.createElement('div');
            blankNode.className = 'cal-day-unit';
            calendarGrid.appendChild(blankNode);
        }

        // Build Active Bookable Nodes
        for (let day = 1; day <= 28; day++) {
            const dayNode = document.createElement('div');
            dayNode.className = 'cal-day-unit bookable-day-node';
            dayNode.innerText = day;
            dayNode.setAttribute('data-day', day);

            dayNode.addEventListener('click', (e) => handleDaySelection(e, day));
            calendarGrid.appendChild(dayNode);
        }
    };

    const handleDaySelection = (event, day) => {
        const target = event.currentTarget;
        
        // Remove prior active structural classes safely
        document.querySelectorAll('.bookable-day-node').forEach(node => {
            node.classList.remove('selected-active-day');
        });

        // Mutate local state & bind presentation styles
        target.classList.add('selected-active-day');
        selectedDateState = day;
        
        // Synchronize and cascade down to time engine elements
        updateAvailableSlotsUI(day);
    };

    // ==========================================================================
    // TIME SLOTS CASCADING STAGGER ENGINE
    // ==========================================================================
    const updateAvailableSlotsUI = (day) => {
        selectedTimeState = null; 
        bookingAction.disabled = true;
        bookingAction.innerText = 'Select a Time Slot';
        
        // Dynamic availability parsing logic
        let chosenPool = timeSlotPoolTable.typical;
        if (day % 3 === 0) chosenPool = timeSlotPoolTable.limited;
        if (day % 5 === 0) chosenPool = timeSlotPoolTable.packed;
        
        timeSlotsContainer.innerHTML = ''; 

        chosenPool.forEach((timeStr, index) => {
            const btn = document.createElement('button');
            btn.className = 'time-slot';
            btn.setAttribute('data-time', timeStr);
            btn.innerText = timeStr;
            
            // Inline Hardware Vector Pre-styling for Cascading Animation Stagger
            btn.style.opacity = '0';
            btn.style.transform = 'translate3d(0, 16px, 0)';
            btn.style.transition = 'opacity 0.5s var(--ease-premium), transform 0.5s var(--ease-premium), background-color 0.3s var(--ease-premium), border-color 0.3s var(--ease-premium), color 0.3s var(--ease-premium)';
            
            timeSlotsContainer.appendChild(btn);

            // Sequential Execution Frame Rendering
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translate3d(0, 0, 0)';
            }, index * 45); // Elegant, micro-staggered cascade window delay
        });

        // Register event hooks to the newly created time slots
        const slotButtons = timeSlotsContainer.querySelectorAll('.time-slot');
        slotButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                slotButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedTimeState = btn.getAttribute('data-time');
                
                bookingAction.disabled = false;
                bookingAction.innerText = `Confirm Appointment: Oct ${selectedDateState} @ ${selectedTimeState}`;
                
                // Clear state warnings cleanly
                bookingFeedback.className = 'booking-feedback-msg';
                bookingFeedback.innerText = '';
            });
        });
    };

    // Form submission processing pipeline
    if (bookingAction) {
        bookingAction.addEventListener('click', () => {
            if (!selectedDateState || !selectedTimeState) return;

            bookingFeedback.innerText = `Processing confirmation request...`;
            bookingFeedback.className = 'booking-feedback-msg success-state';

            setTimeout(() => {
                bookingFeedback.innerText = `Success! Appointment confirmed for October ${selectedDateState} at ${selectedTimeState}.`;
                bookingFeedback.className = 'booking-feedback-msg success-state';
            }, 850);
        });
    }

    // ==========================================================================
    // ACCORDION EXPANSION ENGINE (WITH LAYOUT FLUIDITY)
    // ==========================================================================
    const initTimelineAccordion = () => {
        const steps = document.querySelectorAll('.timeline-step');
        
        steps.forEach(step => {
            const header = step.querySelector('.step-header');
            const expandable = step.querySelector('.step-expandable');

            header.addEventListener('click', () => {
                const isExpanded = step.classList.contains('expanded');

                // Cleanly collapse alternative open states (Mutex Layout Logic)
                steps.forEach(s => {
                    s.classList.remove('expanded');
                    s.querySelector('.step-expandable').style.maxHeight = null;
                });

                if (!isExpanded) {
                    step.classList.add('expanded');
                    // Compute accurate layout bounds dynamically without forcing hard code rewrites
                    expandable.style.maxHeight = expandable.scrollHeight + "px";
                }
            });
        });
    };

    // ==========================================================================
    // 3D PARALLAX TELEMETRY MATRIX CONTROLLER
    // ==========================================================================
    if (heroVisual) {
        let frameTrackingId = null;
        const card = heroVisual.querySelector('.hero-glow-card');
        
        heroVisual.addEventListener('mousemove', (e) => {
            if (frameTrackingId) cancelAnimationFrame(frameTrackingId);
            
            frameTrackingId = requestAnimationFrame(() => {
                const rect = heroVisual.getBoundingClientRect();
                const x = (e.clientX - rect.left) - rect.width / 2;
                const y = (e.clientY - rect.top) - rect.height / 2;
                
                if (card) {
                    // Precision angular dampening multiplier matrix
                    card.style.transform = `rotateY(${x * 0.02}deg) rotateX(${-y * 0.02}deg) translate3d(${-x * 0.015}px, ${-y * 0.015}px, 15px)`;
                    card.style.boxShadow = `${-x * 0.05}px ${-y * 0.05}px 30px rgba(168, 85, 247, 0.15)`;
                }
            });
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            if (frameTrackingId) cancelAnimationFrame(frameTrackingId);
            if (card) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }
        });
    }

    // ==========================================================================
    // INTERSECTION OBSERVER PIPELINE
    // ==========================================================================
    const initScrollIntersectionObserver = () => {
        const observerConfig = {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Kill monitoring overhead once completed
                }
            });
        }, observerConfig);

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    };

    // Launch Application Runtime Core
    initApp();
});