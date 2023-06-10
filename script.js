const board = document.querySelector("#gameBoard");
const information = document.querySelector("#information");
const boardStartingCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
information.textContent = "Circle goes first";

const addGo = (e) => {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);

  if (go === "circle") {
    go = "cross";
  } else {
    go = "circle";
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

  winningBoxes.forEach((array) => {
    let circleWins = false;
    let crossWins = false;
    let hasCirclesArray = [];
    let hasCrossArray = [];

    array.forEach((cell) => {
      console.log(cell);

      // Gets element ID based on cell to push to array
      const square = document.getElementById(`${cell}`);

      // checks if we have class of 'circle' or 'cross' present
      const hasCircle = !!square.querySelector(".circle");
      const hasCross = !!square.querySelector(".cross");

      // pushes index to has circle or corss array
      hasCirclesArray.push(hasCircle);
      hasCrossArray.push(hasCross);
    });

    // checks all items in array and returns a boolan value
    circleWins = hasCirclesArray.every((item) => item);
    crossWins = hasCrossArray.every((item) => item);

    // if all items in array are true, then show message who wins
    if (circleWins) {
      information.textContent = "Circle wins";
      const removeCircleListener = document.querySelector('.circle')
      removeCircleListener.removeEventListener("click", addGo)
    }

    if (crossWins) {
      information.textContent = "Cross wins";
    }
  });
};

const createBoard = () => {
  boardStartingCells.forEach((cell, index) => {
    console.log(cell, index);
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    board.append(cellElement);
  });
};

createBoard();
