
        const gameState = {
            board: Array(9).fill(''),
            currentPlayer: 'x',
            gameActive: true
        };

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        const cells = document.querySelectorAll('.cell');
        const status = document.querySelector('.status');
        const resetBtn = document.querySelector('.reset-btn');

        function handleCellClick(e) {
            const cell = e.target;
            const index = cell.dataset.index;

            if (gameState.board[index] !== '' || !gameState.gameActive) return;

            gameState.board[index] = gameState.currentPlayer;
            cell.classList.add(gameState.currentPlayer);

            if (checkWin()) {
                status.textContent = `Player ${gameState.currentPlayer.toUpperCase()} wins!`;
                gameState.gameActive = false;
                return;
            }

            if (checkDraw()) {
                status.textContent = "It's a draw!";
                gameState.gameActive = false;
                return;
            }

            gameState.currentPlayer = gameState.currentPlayer === 'x' ? 'o' : 'x';
            status.textContent = `Player ${gameState.currentPlayer.toUpperCase()}'s Turn`;
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return gameState.board[a] &&
                    gameState.board[a] === gameState.board[b] &&
                    gameState.board[a] === gameState.board[c];
            });
        }

        function checkDraw() {
            return gameState.board.every(cell => cell !== '');
        }

        function resetGame() {
            gameState.board = Array(9).fill('');
            gameState.currentPlayer = 'x';
            gameState.gameActive = true;
            
            cells.forEach(cell => {
                cell.classList.remove('x', 'o');
            });
            
            status.textContent = "Player X's Turn";
        }

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        resetBtn.addEventListener('click', resetGame);
    