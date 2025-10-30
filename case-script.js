// ===== FADE-IN ON SCROLL =====
const faders = document.querySelectorAll('.fade-in');
// Options for the Intersection Observer
const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fadeEl => {
  appearOnScroll.observe(fadeEl);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterOptions = { threshold: 0.6 };

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const update = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        // Increment calculated to finish the count within a set time (e.g., ~1.5 seconds)
        const increment = target / 60; 
        
        if (count < target) {
          // Use Math.ceil to ensure we don't count fractional numbers, making it look smoother
          counter.innerText = Math.ceil(count + increment);
          setTimeout(update, 25); // Faster interval for smoother animation
        } else {
          counter.innerText = target;
        }
      };
      update();
      observer.unobserve(counter);
    }
  });
}, counterOptions);

counters.forEach(counter => counterObserver.observe(counter));