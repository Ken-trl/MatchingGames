    <!-- JAVASCRIPT SECTION -->
    <script>
        const emojis = ['🌟', '🎨', '🚀', '🎯', '💡', '🎪'];

        let gameBoard = [];
        let flippedCards = [];
        let matches = 0;
        let moves = 0;
        let gameTime = 0;
        let timer = null;
        let gameStarted = false;

        function initializeGame() {
            // Create pairs of emojis
            gameBoard = [...emojis, ...emojis];
            
            // Shuffle the board
            for (let i = gameBoard.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gameBoard[i], gameBoard[j]] = [gameBoard[j], gameBoard[i]];
            }
            
            // Reset game state
            flippedCards = [];
            matches = 0;
            moves = 0;
            gameTime = 0;
            gameStarted = false;
            
            // Update display
            updateStats();
            renderBoard();
            
            // Clear timer
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
            
            // Don't flip if already flipped or matched
            if (card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }
            
            // Don't flip if two cards are already flipped
            if (flippedCards.length >= 2) {
                return;
            }
            
            // Flip the card
            card.classList.add('flipped');
            flippedCards.push(index);
            
            // Check for match when two cards are flipped
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
                // Match found
                cards[first].classList.add('matched');
                cards[second].classList.add('matched');
                matches++;
                
                // Check if game is complete
                if (matches === emojis.length) {
                    setTimeout(() => {
                        showCelebration();
                        clearInterval(timer);
                    }, 500);
                }
            } else {
                // No match, flip back
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
            if (timer) {
                clearInterval(timer);
            }
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

        // Initialize the game when page loads
        initializeGame();
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9859504b558dbc52',t:'MTc1ODk1ODQxNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script>
