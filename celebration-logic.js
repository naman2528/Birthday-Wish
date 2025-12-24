document.addEventListener('DOMContentLoaded', () => {
    const countdownEl = document.getElementById('countdown-timer');
    const messageEl = document.getElementById('birthday-message');
    
    // ------------------------------------------------------------------
    // *** IMPORTANT: SET HER BIRTHDAY DATE AND TIME HERE ***
    // Format: Year, Month (0=Jan, 11=Dec), Day, Hour, Minute, Second
    // Example: December 25th, 2025 at 00:00:00 (Midnight)
    const birthday = new Date(2025, 11, 25, 0, 0, 0).getTime();
    // ------------------------------------------------------------------


    // --- Confetti Cannon Function ---
    function launchConfetti() {
        // Basic Confetti burst
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
        
        // Secondary, delayed burst for a bigger effect
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#D2B48C', '#A52A2A', '#FAF0E6'] // Using your theme colors
            });
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#D2B48C', '#A52A2A', '#FAF0E6']
            });
        }, 300);
    }
    
    // --- Countdown Timer Function ---
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthday - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            // Target time has passed!
            clearInterval(countdownInterval);
            countdownEl.classList.add('hidden');
            messageEl.classList.remove('hidden');
            messageEl.style.animation = 'fadeIn 2s forwards'; // Ensure it animates in
            launchConfetti(); // Launch confetti for the big reveal!

        } else {
            // Display the time remaining
            countdownEl.innerHTML = `
                <div class="time-unit"><span>${days}</span> Days</div>
                <div class="time-unit"><span>${hours}</span> Hours</div>
                <div class="time-unit"><span>${minutes}</span> Minutes</div>
                <div class="time-unit"><span>${seconds}</span> Seconds</div>
            `;
        }
    }

    // Launch confetti immediately if the birthday has passed when loading the page
    if (new Date().getTime() >= birthday) {
         countdownEl.classList.add('hidden');
         messageEl.classList.remove('hidden');
         launchConfetti();
    } else {
         // Start the countdown timer
         const countdownInterval = setInterval(updateCountdown, 1000);
         updateCountdown(); // Run immediately to avoid 1-second delay
    }
});