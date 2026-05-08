function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {
    getCell: (index) => board[index],
    placeMarker: (index, marker) => {
      if (board[index] === "") board[index] = marker;
    },
    reset: () => {
      for (let i = 0; i < 9; i++) board[i] = "";
    }
  };
}


function Player(name, marker) {
  return { name, marker };
}


const GameController = (function () {
  const board = Gameboard();
  const players = [Player("Player 1", "X"), Player("Player 2", "O")];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {
    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];

    for (const [a, b, c] of winCombos) {
      if (
        board.getCell(a) &&
        board.getCell(a) === board.getCell(b) &&
        board.getCell(a) === board.getCell(c)
      ) {
        return getCurrentPlayer();
      }
    }
    return null;
  };

  const checkTie = () => {
    for (let i = 0; i < 9; i++) {
      if (board.getCell(i) === "") return false;
    }
    return true;
  };

  const playTurn = (index) => {
    if (gameOver || board.getCell(index) !== "") return { status: "invalid" };

    board.placeMarker(index, getCurrentPlayer().marker);

    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      return { status: "win", player: winner };
    }

    if (checkTie()) {
      gameOver = true;
      return { status: "tie" };
    }

    switchPlayer();
    return { status: "next", player: getCurrentPlayer() };
  };

  const reset = () => {
    board.reset();
    currentPlayerIndex = 0;
    gameOver = false;
    return getCurrentPlayer();
  };

  return { playTurn, reset, getCurrentPlayer, getCell: board.getCell };
})();

const DisplayController = (function () {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.querySelector("#status");
  const restartBtn = document.querySelector("#restart");

  const render = () => {
  cells.forEach((cell, index) => {
    const val = GameController.getCell(index);
    cell.textContent = val;
    cell.dataset.marker = val;  
  });
};

  const setStatus = (message) => {
    statusText.textContent = message;
  };


  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = Number(cell.dataset.cellIndex); // matches your data-cell-index
      const result = GameController.playTurn(index);

      render();

      if (result.status === "win") {
        setStatus(`${result.player.name} wins`);
      } else if (result.status === "tie") {
        setStatus("A tie");
      } else if (result.status === "next") {
        setStatus(`${result.player.name}'s turn`);
      }
      
    });
  });

  restartBtn.addEventListener("click", () => {
  const firstPlayer = GameController.reset();
  render();  
  cells.forEach(cell => cell.dataset.marker = "");  
  setStatus(`${firstPlayer.name}'s turn`);
});

  setStatus(`${GameController.getCurrentPlayer().name}'s turn`);
})();