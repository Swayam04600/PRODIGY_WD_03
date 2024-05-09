// script.js
// Game variables
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const resetCountersButton = document.getElementById('resetCountersButton');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let xWinsCount = 0;
let oWinsCount = 0;
let drawCount = 0;

const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id.replace('cell', ''), 10);

    // If cell is already filled or game over, return
    if (gameState[cellIndex] !== null) {
        return;
    }

    // Update the cell and game state
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute('data-player', currentPlayer);

    // Check if there's a winner
    if (checkWinner()) {
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            updateWinCounters(currentPlayer);
            resetGame();
        }, 500);
        return;
    }

    // Check for a draw
    if (gameState.every(cell => cell !== null)) {
        setTimeout(() => {
            alert('It\'s a draw!');
            updateDrawCounter();
            resetGame();
        }, 500);
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            combination.forEach(index => {
                const winningCell = document.getElementById(`cell${index}`);
                winningCell.style.backgroundColor = currentPlayer === 'X' ? '#ff6347' : '#4682b4';
            });
            return true;
        }
    }
    return false;
}

// Update win counters
function updateWinCounters(player) {
    if (player === 'X') {
        xWinsCount++;
        xWinsDisplay.textContent = xWinsCount;
    } else {
        oWinsCount++;
        oWinsDisplay.textContent = oWinsCount;
    }
}

// Update draw counter
function updateDrawCounter() {
    drawCount++;
    drawsDisplay.textContent = drawCount;
}

// Reset the game
function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-player');
        cell.style.backgroundColor = '#ffffff';
    });
}

// Reset counters
function resetCounters() {
    xWinsCount = 0;
    oWinsCount = 0;
    drawCount = 0;
    xWinsDisplay.textContent = xWinsCount;
    oWinsDisplay.textContent = oWinsCount;
    drawsDisplay.textContent = drawCount;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetCountersButton.addEventListener('click', resetCounters);
