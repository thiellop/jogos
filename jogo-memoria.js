const gameBoard = document.querySelector('.memory-game');
const moveCountElem = document.getElementById('move-count');
const restartBtn = document.getElementById('restart-btn');

const cardValues = [
    { name: 'CELULAR', emoji: '📲' },
    { name: 'E-MAIL', emoji: '📧' },
    { name: 'INTERNET', emoji: '📶' },
    { name: 'I.A', emoji: '🤖' },
    { name: 'LAPTOP', emoji: '💻' },
    { name: 'COMPUTADOR', emoji: '🖥️' },
    { name: 'WINDOWS', emoji: '🪟' },
    { name: 'LINUX', emoji: '🐧' }
];

// Duplica os valores para formar pares e os embaralha
const gameCards = [...cardValues, ...cardValues];
gameCards.sort(() => 0.5 - Math.random());

let moves = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    gameBoard.innerHTML = ''; // Limpa o tabuleiro antes de criar os cartões
    gameCards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = item.name;

        card.innerHTML = `
            <div class="front-face">
                <div class="card-emoji">${item.emoji}</div>
                <div class="card-text">${item.name}</div>
            </div>
            <div class="back-face"></div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    moves++;
    moveCountElem.textContent = moves;
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    moves = 0;
    moveCountElem.textContent = moves;
    resetBoard();
    gameCards.sort(() => 0.5 - Math.random());
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Inicia o jogo
createBoard();
