//* imports the SCSS file
import "./styles.scss";

//* gets the board from the page
const board: HTMLElement | null = document.querySelector("#board");

//* gets attempts text
const attemptsText: HTMLElement | null = document.querySelector("#attempts");

//* gets matches text
const matchesText: HTMLElement | null = document.querySelector("#matches");

//* gets message text
const messageText: HTMLElement | null = document.querySelector("#message");

//* gets restart button
const restartBtn: HTMLButtonElement | null =
  document.querySelector("#restartBtn");

//* array for card values
let cards: string[] = [];

//* saves first clicked card
let firstCard: HTMLButtonElement | null = null;

//* saves second clicked card
let secondCard: HTMLButtonElement | null = null;

//* keeps track of attempts left
let attemptsLeft: number = 3;

//* keeps track of matches found
let matchesFound: number = 0;

//* stops extra clicks while checking cards
let canClick: boolean = true;

//* shuffles the cards
const shuffleCards = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }

  return array;
};

//* creates cards for a new game
const makeCards = (): void => {
  cards = ["A", "A", "B", "B", "C", "C"];
  shuffleCards(cards);
};

//* updates page text
const updateText = (): void => {
  if (!attemptsText || !matchesText) {
    return;
  }

  attemptsText.textContent = attemptsLeft.toString();
  matchesText.textContent = matchesFound.toString();
};

//* draws the board
const drawBoard = (): void => {
  if (!board) {
    throw new Error("Board not found.");
  }

  board.innerHTML = "";

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("button");

    card.className = "card";
    card.dataset.value = cards[i];
    card.dataset.index = i.toString();
    card.textContent = "?";
    card.type = "button";

    card.addEventListener("click", () => {
      handleCardClick(card);
    });

    board.appendChild(card);
  }
};

//* handles card click
const handleCardClick = (card: HTMLButtonElement): void => {
  if (!messageText) {
    throw new Error("Message element not found.");
  }

  //*stop if clicks are locked
  if (!canClick) {
    return;
  }

  // *stop if card is already matched
  if (card.classList.contains("matched")) {
    return;
  }

  //* stop if card is already flipped
  if (card.textContent !== "?") {
    return;
  }

  // *show the card value
  card.textContent = card.dataset.value || "";
  card.classList.add("flipped");

  // *save first card
  if (firstCard === null) {
    firstCard = card;
    messageText.textContent = "Pick one more card.";
    return;
  }

  //* save second card
  secondCard = card;

  //* lock clicking while comparing
  canClick = false;

  // check for match
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchesFound++;
    updateText();

    messageText.textContent = "Match found!";

    firstCard = null;
    secondCard = null;
    canClick = true;

    if (matchesFound === 3) {
      messageText.textContent = "You won!";
    }
  } else {
    attemptsLeft--;
    updateText();

    messageText.textContent = "Not a match.";

    setTimeout(() => {
      if (firstCard) {
        firstCard.textContent = "?";
        firstCard.classList.remove("flipped");
      }

      if (secondCard) {
        secondCard.textContent = "?";
        secondCard.classList.remove("flipped");
      }

      firstCard = null;
      secondCard = null;
      canClick = true;

      if (attemptsLeft === 0 && messageText) {
        messageText.textContent = "Game over!";
      }
    }, 1000);
  }
};

// starts a new game
const startGame = (): void => {
  firstCard = null;
  secondCard = null;
  attemptsLeft = 3;
  matchesFound = 0;
  canClick = true;

  makeCards();
  updateText();
  drawBoard();

  if (messageText) {
    messageText.textContent = "Pick a card.";
  }
};

// make sure page elements exist
if (!board || !attemptsText || !matchesText || !messageText || !restartBtn) {
  throw new Error("One or more elements not found.");
}

// restart button starts a new game
restartBtn.addEventListener("click", () => {
  startGame();
});

// starts game when page loads
startGame();
