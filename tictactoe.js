// The TicTacToe module pattern encapsulates the game logic
const TicTacToe = (function () {
  // Initial board as a 2D array
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Keeps track of the current player ("X" or "O")
  let currentPlayer = "X";

  // Updates the user interface to reflect the board state
  function updateUI() {
    document.querySelectorAll(".cell").forEach((cell) => {
      // Retrieves the row and column indices from data attributes
      const row = parseInt(cell.dataset.row); // Converts to number
      const col = parseInt(cell.dataset.col); // Converts to number

      // Updates cell content based on the board array
      if (row >= 0 && row < 3 && col >= 0 && col < 3) {
        cell.textContent = board[row][col];
      } else {
        console.error(`Invalid row or column: row=${row}, col=${col}`);
      }
    });
  }

  // Checks for a winner
  function checkWinner() {
    // Check rows and columns for a win
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        updateUI();
        return board[i][0];
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        updateUI();
        return board[0][i];
      }
    }
    // Check diagonals for a win
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      updateUI()
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      updateUI();
      return board[0][2];
    }
    return null; // No winner
  }

  // Resets the board state
  function resetBoard() {
    // Clears each cell of the board array
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
    updateUI(); // Refresh the UI
  }

  // Handles a cell click event
  function handleCellClick(event) {
    const row = event.target.dataset.row; // Retrieves row index
    const col = event.target.dataset.col; // Retrieves column index

    // Ensures the clicked cell is empty
    if (!board[row][col]) {
      board[row][col] = currentPlayer; // Updates board state
      updateUI();
      const winner = checkWinner(); // Checks for a winner

      if (winner) {
        alert(`Player ${winner} wins!`); // Alerts the winner
        resetBoard(); // Resets the game
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switches players
        updateUI(); // Refreshes the UI
      }
    } else {
      alert("Cell is already occupied! Choose another."); // Alerts if cell is occupied
    }
  }

  // Initializes the game
  function init() {
    const cells = document.querySelectorAll(".cell"); // Selects all cells
    const resetButton = document.getElementById("resetButton"); // Selects the reset button

    // Attaches event listeners to cells
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetBoard); // Attaches reset event

    resetBoard(); // Resets the board on initialization
  }

  // Exposes the init function
  return { init };
})();

// Executes the game initialization after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", TicTacToe.init);
