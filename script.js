const board = document.querySelector("#gameBoard");
const information = document.querySelector("#information");
//const resetGame = document.getElementById("#resetGame");
const boardStartingCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
let playerMove = 0; // tracks player movement for draw game
information.textContent = "Circle goes first";

const addGo = (e) => {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);

  if (go === "circle") {
    go = "cross";
    playerMove++;
  } else {
    go = "circle";
    playerMove++;
  }

  information.textContent = "Its now turn for " + go;

  // remove event listerner so we cant click on the same box twice
  e.target.removeEventListener("click", addGo);

  checkScore();
};

const checkScore = () => {
  const winningBoxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal matches
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical matches
    [0, 4, 8],
    [2, 4, 6], // cross matches
  ];

  console.log("original Wining boxes: ", winningBoxes);

  winningBoxes.forEach((array) => {
    let circleWins = false;
    let crossWins = false;
    let hasCirclesArray = [];
    let hasCrossArray = [];

    console.log("each array: ", array);

    array.forEach((cell) => {
      console.log("forEach cell: ", cell);

      // Gets element ID based on cell to push to array
      const square = document.getElementById(`${cell}`);

      console.log("getting the ID for each cell (square): ", square);

      // checks if we have class of 'circle' or 'cross' is true
      const hasCircle = !!square.querySelector(".circle");
      const hasCross = !!square.querySelector(".cross");

      console.log(
        "checks if query selector .circle class is true: ",
        hasCircle
      );
      console.log("checks if query selector .circle class is true: ", hasCross);

      // pushes index to has circle or corss array
      hasCirclesArray.push(hasCircle);
      hasCrossArray.push(hasCross);

      console.log(
        "pushes boolean value if true to an array called hasCircleArray",
        hasCirclesArray
      );
      console.log(
        "pushes boolean value if true to an array called hasCrossArray",
        hasCrossArray
      );
    });

    // checks all items in array and returns a boolan value
    // every() method check for items in array and returns a boolean value
    circleWins = hasCirclesArray.every((item) => item);
    crossWins = hasCrossArray.every((item) => item);

    // since every method above returns a boolean value, we want to pick the winner and display win message
    // & execute the function to remove further clicks on board game
    if (circleWins) {
      information.textContent = "Circle wins";
      removeEventListener();
    } else if (crossWins) {
      information.textContent = "Cross wins";
      removeEventListener();
    } else if (playerMove === 9) {
      information.textContent = "Game draw!";
    }
  });
};

const removeEventListener = () => {
  boardStartingCells.forEach((cell, index) => {
    // console.log('this are the cells: ',cell)
    // console.log('this are the index: ',index)
    const div = document.getElementById(`${index}`);
    div.removeEventListener("click", addGo);
  });
};

const createBoard = () => {
  boardStartingCells.forEach((cell, index) => {
    //console.log(cell, index);
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    board.append(cellElement);
  });
};

createBoard();

const restartGame = () => {
  window.location.reload();
};
