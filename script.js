const emojis = ['🖊️', '✏️', '📚', '📓', '🖍️', '📏'];

let gameBoard = [];
let flippedCards = [];
let matches = 0;
let moves = 0;
let gameTime = 0;
let timer = null;
let gameStarted = false;

function initializeGame() {
    gameBoard = [...emojis, ...emojis];
    
    // Shuffle board
    for (let i = gameBoard.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameBoard[i], gameBoard[j]] = [gameBoard[j], gameBoard[i]];
    }
    
    flippedCards = [];
    matches = 0;
    moves = 0;
    gameTime = 0;
    gameStarted = false;
    
    updateStats();
    renderBoard();
    
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function renderBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    
    gameBoard.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-back">?</div>
            <div class="card-front">${emoji}</div>
        `;
        card.onclick = () => flipCard(index);
        board.appendChild(card);
    });
}

function flipCard(index) {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    const cards = document.querySelectorAll('.card');
    const card = cards[index];
    
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(index);
    
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [first, second] = flippedCards;
    
    if (gameBoard[first] === gameBoard[second]) {
        cards[first].classList.add('matched');
        cards[second].classList.add('matched');
        matches++;
        
        if (matches === emojis.length) {
            setTimeout(() => {
                showCelebration();
                clearInterval(timer);
            }, 500);
        }
    } else {
        cards[first].classList.remove('flipped');
        cards[second].classList.remove('flipped');
    }
    
    flippedCards = [];
    updateStats();
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matches;
    
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    timer = setInterval(() => {
        gameTime++;
        updateStats();
    }, 1000);
}

function resetGame() {
    if (timer) clearInterval(timer);
    initializeGame();
}

function showHint() {
    const cards = document.querySelectorAll('.card:not(.matched)');
    const unmatched = Array.from(cards).filter(card => !card.classList.contains('flipped'));
    
    if (unmatched.length >= 2) {
        const randomCard = unmatched[Math.floor(Math.random() * unmatched.length)];
        randomCard.style.transform = 'scale(1.1)';
        randomCard.style.boxShadow = '0 0 20px #667eea';
        
        setTimeout(() => {
            randomCard.style.transform = '';
            randomCard.style.boxShadow = '';
        }, 1500);
    }
}

function showCelebration() {
    document.getElementById('celebration').classList.add('show');
}

function hideCelebration() {
    document.getElementById('celebration').classList.remove('show');
}

// Start game on page load
initializeGame();
