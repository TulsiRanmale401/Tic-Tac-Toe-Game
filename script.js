let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // 'O' starts first
let count = 0; // Move counter

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.style.display = "none"; // Hide message container
};

// Function to handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting

        box.innerText = turnO ? "O" : "X";
        box.style.color = turnO ? "#b0413e" : "#0f4c75"; // Different colors for O and X
        box.disabled = true;
        count++;
        turnO = !turnO;

        if (checkWinner()) {
            return; // Stop further execution if we have a winner
        }

        if (count === 9) { // If all boxes are filled, check for a draw
            gameDraw();
        }
    });
});

// Function to show draw message
const gameDraw = () => {
    msg.innerText = "Oops! Game is a Draw. Please try again!";
    msgContainer.style.display = "flex"; // Show message container
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Function to enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.style.display = "none"; // Hide message container when resetting
};

// Function to show the winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! ${winner}, you are the winner!`;
    msgContainer.style.display = "flex"; // Show message container
    disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true; // Stop further execution
        }
    }
    return false; // No winner yet
};

// Add event listeners for new game and reset buttons
newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
