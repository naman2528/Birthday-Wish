document.addEventListener('DOMContentLoaded', () => {
    const wishCards = document.querySelectorAll('.wish-transition');
    
    // Check if the page is loaded before proceeding
    if (wishCards.length === 0) return;

    // --- Intersection Observer Logic ---

    const observerOptions = {
        root: null, // Relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = card.getAttribute('data-delay') || 0;

                // Add the 'is-visible' class after the custom delay
                setTimeout(() => {
                    card.classList.add('is-visible');
                    // Remove observer after showing the card to save resources
                    observer.unobserve(card); 
                }, delay);
            }
        });
    }, observerOptions);

    // Apply the observer to all wish cards
    wishCards.forEach(card => {
        observer.observe(card);
    });

    // --- Style Update (Adding the visible class) ---
    // You must also add the definition for 'is-visible' to your CSS
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .wish-transition.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
});