//import scss file
import "./scss";

//get board from page
const board: Element | null = document.querySelector("#board");
//gets attemp text
const attemptsText = document.querySelector("#attempts");
//gets match text
const matchesText = document.querySelector("#matches");
//gets message text
const messageText = document.querySelector("#message");
//gets restart button
const restartBtn = document.querySelector("#restartBtn");

//array for the card values
let cards: string[] = [];
//saves the first card picked
let firstCard: HTMLButtonElement | null = null;
//saves second card picked
let secondCard: HTMLButtonElement | null = null;
//keeps track of attempts left
let attemptsLeft: number = 3;
//keeps track of matches found
let matchesFound: number = 0;
//stops extra clicks while checking cards
let canClick: boolean = true;

//creates a function to shuffle cards
const shuffleCards = (array: string[]): string[] => {
  //loops through array from end
  for (let i = array.length - 1; i > 0; i--) {
    //picks random spot
    let randomNumber = Math.floor(Math.random() * (i + 1));

    //swaps the 2 values
    let temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }
  //sends back the shuffled array
  return array;
};

//creates the card values for new game
const makeCards = (): void => {
  //makes 3 matching pairs
  cards = ["A", "A", "B", "B", "C", "C"];
  //shuffles the cards
  shuffleCards(cards);
};

//make sure everything exists before running the game
if (!board || !attemptsText || !matchesText || !messageText || !restartBtn) {
  throw new Error("One or more elements not found.");
}
