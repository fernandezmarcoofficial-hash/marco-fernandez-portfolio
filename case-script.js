/**
 * CASE-SCRIPT.JS
 * * Provides interactive features for the case study pages:
 * 1. Fade-in animation for elements on scroll visibility.
 * 2. Animated counter for metric sections upon visibility.
 */

// --------------------------------------------------
// 1. FADE-IN ON SCROLL (Visibility Animation)
// --------------------------------------------------

const faders = document.querySelectorAll('.fade-in');

// Options: Triggers when 20% of the element is visible.
const fadeOptions = {
    threshold: 0.2, 
    rootMargin: '0px 0px -50px 0px' // Starts slightly before bottom of viewport
};

const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return; // If not visible, do nothing
        
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animated
    });
}, fadeOptions);

faders.forEach(fadeEl => {
    fadeObserver.observe(fadeEl);
});


// --------------------------------------------------
// 2. COUNTER ANIMATION (Metrics Section)
// --------------------------------------------------

const counters = document.querySelectorAll('.counter');

// Options: Triggers when 60% of the counter area is visible.
const counterOptions = { 
    threshold: 0.6 
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // Total animation time in milliseconds
            const steps = 60; // Number of update cycles (adjusts smoothness)
            const interval = duration / steps;
            const increment = target / steps;

            const updateCount = () => {
                const count = +counter.innerText;
                
                if (count < target) {
                    // Use Math.ceil to ensure numbers are whole and count up smoothly
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, interval);
                } else {
                    // Ensure the final number is exactly the target number
                    counter.innerText = target;
                }
            };
            
            updateCount();
            observer.unobserve(counter); // Stop observing after animation starts
        }
    });
}, counterOptions);

counters.forEach(counter => counterObserver.observe(counter));