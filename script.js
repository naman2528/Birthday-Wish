document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. Music Player Logic
    // ------------------------------------------------------------------
    const music = document.getElementById('bday-music');
    const btn = document.getElementById('music-toggle-btn');
    let isPlaying = false;

    // Optional: Auto-play is often blocked by browsers, so prompt the user on interaction
    btn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            btn.textContent = 'Play Music 🎶';
        } else {
            // Attempt to play, catch potential errors if browser blocks it
            music.play().catch(error => {
                console.error("Autoplay was prevented:", error);
                alert("Please click 'Play Music' again after interacting with the page.");
            });
            btn.textContent = 'Pause Music 🛑';
        }
        isPlaying = !isPlaying;
    });


    // ------------------------------------------------------------------
    // 2. Autotyping Love Letter Logic (For the Love Letter Page)
    // ------------------------------------------------------------------
    const typedTextElement = document.getElementById('typed-text');
    
    // IMPORTANT: Replace this text with your actual, heartfelt letter!
    const fullText = `My dearest [Betuu❤️],

Aaj ka din mere liye bhott khaas hai kuki aaj tera janamdin hai jisse mera har din hai, aaj ka din mere liye bhott khaas isiliye bhi hai kuki aaj us shaks ka birthday hai jisne mere motape ko nazar andaaz kiyaa or meri ugly face ko accept kiaa or mujhee pyaar kiaa, you are my world betuu, tere saath mujhe pta laga actual love kaisa hota hai.

Mai tujhe ye kehna chata hu ki betuu tu duniyaa ki sabse sundar ladki hai mere liye meri maa ke baad, or betee tu mayus mat hoyaa kr tere paas mai hu na betuu har time, teri har baat sunne ko ready hu, or betee overthinking kam kara kr sugli jaada mat socha kar itni to teri height ni hai jitni tu tension letii hai pagal sii.

Ye website ek choti si glimpse hai hmari journey ki jo mai tujhe dedicate krra hu, or abhi to bhott time or abhi to apne ko bhott kuch karna hai future mai, so enjoy your day betuu with lots of love and care❤️🎂.

Happy Birthday, my everything.

Forever yours,
[Your Nammu]`;
    
    let charIndex = 0;

    // Check if the element exists (only run on index.html)
    if (typedTextElement) {
        function typeWriter() {
            if (charIndex < fullText.length) {
                // Use innerHTML to handle line breaks/formatting
                typedTextElement.innerHTML += fullText.charAt(charIndex);
                charIndex++;
                // Set the speed of the typing (e.g., 50ms)
                setTimeout(typeWriter, 50); 
            } else {
                // Remove the blinking cursor once typing is done
                const cursor = document.querySelector('.cursor');
                if(cursor) cursor.style.display = 'none';
            }
        }
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
});