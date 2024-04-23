const cardContainer = document.getElementById('card-container');
const symbols = ['♠', '♣', '♥', '♦']; // Символи для карток
let cards = symbols.concat(symbols); // Пари символів для карток
let level = 1;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span>${symbol}</span>`;
    cardContainer.appendChild(card);
}

function createCards() {
    shuffle(cards).forEach(symbol => createCard(symbol));
}

createCards(cards);

let openedCards = [];

function checkWin() {
    const allCards = document.querySelectorAll('.card');
    const winCards = [...allCards].filter(card => card.classList.contains('opened'))

    if (winCards.length === allCards.length) {
        alert(`You win ${level} level`);
        cardContainer.innerHTML = '';
        level++;

        if (level === 2) {
            symbols.push('§', '⊕');
        }
    
        if (level === 3) {
            symbols.push('⇐', '⇑', '⇒', '⇓');
        }

        cards = symbols.concat(symbols);
        createCards();
    }
}

cardContainer.addEventListener('click', event => {
    const card = event.target.closest('.card');
    
    if (!card || openedCards.length >= 2 || openedCards.includes(card)) return;
    
    card.classList.add('flipped');
    openedCards.push(card);
    if (openedCards.length === 2) {
        checkMatch();
    }
    checkWin();
});

function checkMatch() {
    const [firstCard, secondCard] = openedCards;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        openedCards.forEach(card => card.classList.add('opened'));
        openedCards = [];
    } else {
        setTimeout(() => {
            openedCards.forEach(card => card.classList.remove('flipped'));
            openedCards = [];
        }, 500);
    }
}