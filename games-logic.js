document.addEventListener('DOMContentLoaded', () => {
    // Only run the game logic if we are on the games.html page
    if (document.getElementById('games-section')) {
        
        // --- 1. Quiz Game Data ---
        const quizQuestions = [
            {
                question: "Humne sabse pehle saath m konsi movie dekhi thi ?",
                options: ["Action Flick", "Rom-Com", "Horror Movie", "Animated Film"],
                answer: "Horror"
            },
            {
                question: "Maine tujhe konse stuffed animal ka naam diaa tha ?",
                options: ["Panda", "Teddy Bear", "Llama", "Bunny"],
                answer: "Panda"
            },
            {
                question: "Mere Saath m sabse pehle konsi jagah ghumna chati hai ?",
                options: ["Goa", "Vrindavan", "Leh Ladakh", "Jaipur"],
                answer: "Vrindavan"
            },
            {
                question: "Sabse pehla nickname kya diaa tha maine tujhe ?",
                options: ["Betuu", "Princess", "Pharmacist", "Baby"],
                answer: "Betuu"
            },
            {
                question: "Sabse pehla aapa kaha mile the ?",
                options: ["Bus", "Bhuna", "Bus Stand", "College"],
                answer: "Bus Stand"
            },
            {
                question: "Longest Video Call duration apne dono ki ?",
                options: ["10 Hours", "8 Hours", "12 Hours", "14 Hours"],
                answer: "10 Hours"
            },
            {
                question: "Who is over protective ?",
                options: ["Betuu", "Nammu", "dono", "koi bhi ni"],
                answer: "Naman"
            },
            {
                question: "Who is more overthinker ?",
                options: ["Betuu", "Nammu", "Dono", "koi bhi ni"],
                answer: "Dono"
            },
            {
                question: "Who is more Caring one ?",
                options: ["Betuu", "Nammu", "Dono", "koi bhi ni"],
                answer: "Dono"
            },
            {
                question: "Who is more Gajni ?",
                options: ["Betuu", "Nammu", "Dono", "koi bhi ni"],
                answer: "Betuu"
            },// ADD AT LEAST 6 MORE QUESTIONS HERE! Make them personal and meaningful.
        ];

        // --- 2. Quiz Game Variables ---
        const quizArea = document.getElementById('quiz-area');
        const questionEl = document.getElementById('quiz-question');
        const optionsEl = document.getElementById('quiz-options');
        const nextBtn = document.getElementById('next-btn');
        const resultEl = document.getElementById('quiz-result');

        let currentQuestionIndex = 0;
        let score = 0;

        // --- 3. Core Quiz Functions ---

        function loadQuestion() {
            // Check if all questions are answered
            if (currentQuestionIndex >= quizQuestions.length) {
                showResults();
                return;
            }

            const currentQ = quizQuestions[currentQuestionIndex];
            questionEl.textContent = `Q${currentQuestionIndex + 1}: ${currentQ.question}`;
            optionsEl.innerHTML = ''; // Clear previous options
            nextBtn.classList.add('hidden'); // Hide Next button

            currentQ.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-button');
                // Add click listener to check the answer
                button.addEventListener('click', () => checkAnswer(button, option, currentQ.answer));
                optionsEl.appendChild(button);
            });
        }

        function checkAnswer(selectedButton, selectedOption, correctAnswer) {
            // Disable all option buttons after one is clicked
            Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

            if (selectedOption === correctAnswer) {
                score++;
                selectedButton.style.backgroundColor = 'green';
                selectedButton.style.color = 'white';
            } else {
                selectedButton.style.backgroundColor = 'red';
                selectedButton.style.color = 'white';
                // Highlight the correct answer
                Array.from(optionsEl.children).forEach(btn => {
                    if (btn.textContent === correctAnswer) {
                        btn.style.border = '2px solid green';
                    }
                });
            }
            
            // Show the next button
            nextBtn.classList.remove('hidden');
        }

        function showResults() {
            quizArea.classList.add('hidden');
            resultEl.classList.remove('hidden');

            let message = '';
            if (score === quizQuestions.length) {
                message = "🤯 PERFECT SCORE! You know our love story inside and out! Truly meant to be! ❤️";
            } else if (score >= quizQuestions.length / 2) {
                message = `Great job! You scored ${score} out of ${quizQuestions.length}. Our bond is strong! 💪`;
            } else {
                message = `You scored ${score} out of ${quizQuestions.length}. We need to make more memories! 😉`;
            }

            resultEl.innerHTML = `<h3>Quiz Complete!</h3><p>${message}</p>`;
        }

        // Event listener for the Next button
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });

        // Start the Quiz when the page loads
        loadQuestion();


        // ------------------------------------------------------------------
        // 4. Future Do's Game (Simple Random Picker)
        // ------------------------------------------------------------------
        const futureDreams = [
            "Randomly ek trip per jaana.",
            "Saath m khaan banana.",
            "khoob saari shopping karna.",
            "Milkar kuch naya sikhna koi new skill.",
            "Future m bhi aise hi ek dusre ka saath dete rehna aise hi Love & Care ke saath.",
            "Write down 10 things we love about each other."
        ];
        
        const spinButton = document.querySelector('.spin-button');
        const outcomeEl = document.getElementById('future-outcome');

        spinButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * futureDreams.length);
            const chosenDream = futureDreams[randomIndex];

            outcomeEl.textContent = 'Spinning...';
            spinButton.disabled = true;

            // Simple animation to make it feel like a spin
            setTimeout(() => {
                outcomeEl.textContent = `Future Do's: "${chosenDream}"`;
                outcomeEl.style.animation = 'fadeIn 1s ease-out';
                spinButton.disabled = false;
            }, 2000);
        });
        
        // You will need to write the logic for the Matching Game!
        // --- 5. Matching Pairs Game Logic ---
// NOTE: Use symbols or small icons that represent shared memories or inside jokes.
const memoryPairs = [
    { name: "Coffee", icon: "☕" },
    { name: "Movie", icon: "🎬" },
    { name: "Travel", icon: "✈️" },
    { name: "Heart", icon: "💖" },
    { name: "Kiss", icon: "💋" },
    { name: "Cake", icon: "🎂" },
    { name: "Music", icon: "🎶" },
    { name: "Star", icon: "⭐" },
];

const matchingGrid = document.getElementById('matching-grid');
const startMatchBtn = document.getElementById('start-match-btn');
const matchStatus = document.getElementById('match-status');

let cards = [];
let cardsFlipped = [];
let cardsMatched = 0;
let lockBoard = false; // To prevent clicking during transition

// --- Core Game Functions ---

function shuffleArray(array) {
    // Standard Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    // 1. Create a full deck by duplicating the pairs
    const fullDeck = memoryPairs.concat(memoryPairs);
    // 2. Shuffle the deck
    cards = shuffleArray(fullDeck);
    
    matchingGrid.innerHTML = ''; // Clear the grid (removing the start button)
    cardsMatched = 0;
    
    // 3. Create the card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('match-card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;
        
        // Front (visible side - a question mark or heart)
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.innerHTML = '💖'; 

        // Back (hidden side - the actual icon)
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.innerHTML = card.icon;

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        
        cardElement.addEventListener('click', flipCard);
        matchingGrid.appendChild(cardElement);
    });

    matchStatus.textContent = 'Find all the pairs!';
}

function flipCard() {
    if (lockBoard) return;
    if (this.classList.contains('is-flipped')) return; // Prevent double clicking the same card

    this.classList.add('is-flipped');
    cardsFlipped.push(this);

    if (cardsFlipped.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = cardsFlipped;
    const isMatch = card1.dataset.name === card2.dataset.name;

    if (isMatch) {
        matchStatus.textContent = "It's a match! 💕";
        disableCards(card1, card2);
    } else {
        matchStatus.textContent = "No match. Try again! 🤔";
        unflipCards(card1, card2);
    }
}

function disableCards(card1, card2) {
    // Permanently disable match cards from future clicks
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    
    cardsFlipped = [];
    lockBoard = false;
    cardsMatched += 2;

    if (cardsMatched === cards.length) {
        setTimeout(() => {
            matchStatus.innerHTML = "🎉 **CONGRATULATIONS!** You found all our memories! 🎉";
            // Optional: Add a button to play again
            const playAgainBtn = document.createElement('button');
            playAgainBtn.classList.add('game-button');
            playAgainBtn.textContent = "Play Again?";
            playAgainBtn.addEventListener('click', createBoard);
            matchStatus.appendChild(playAgainBtn);
        }, 800);
    }
}

function unflipCards(card1, card2) {
    // Flip cards back after a delay
    setTimeout(() => {
        card1.classList.remove('is-flipped');
        card2.classList.remove('is-flipped');
        resetBoard();
    }, 1200);
}

function resetBoard() {
    cardsFlipped = [];
    lockBoard = false;
}

// Event listener to start the game
startMatchBtn.addEventListener('click', createBoard);

// Note: You must initialize the music player logic on games-logic.js if you want it to run on this page only
// (But since you included script.js in games.html, it's already there)
    }
});

