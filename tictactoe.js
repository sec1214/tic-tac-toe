const TicTacToe = (function () {
  const BOARD_SIZE = 3;
  const EMPTY_CELL = "";
  const PLAYER_X = "X";
  const PLAYER_O = "O";

  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(EMPTY_CELL));

  let currentPlayer = PLAYER_X;
  let playerXWins = 0; // 🔹 Added: Player X wins counter
  let playerOWins = 0; // 🔹 Added: Player O wins counter
  let gameActive = true; // 🔹 Added: Flag to control if the game is active

  const messageDiv = document.getElementById("message");
  const playerXScoreSpan = document.getElementById("playerXScore"); // 🔹 Added: Reference to player X score span
  const playerOScoreSpan = document.getElementById("playerOScore"); // 🔹 Added: Reference to player O score span

  function updateMessage(msg) {
    messageDiv.textContent = msg;
  }

  function updateScoreUI() { // 🔹 Added: Function to update score display
    playerXScoreSpan.textContent = `Player X: ${playerXWins}`;
    playerOScoreSpan.textContent = `Player O: ${playerOWins}`;
  }

  function updateUI() {
    document.querySelectorAll(".cell").forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
        cell.textContent = board[row][col];
      }
    });
  }

  const resetBoard = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = EMPTY_CELL;
      }
    }
    updateUI();
    updateMessage("Game reset. Player X's turn.");
    currentPlayer = PLAYER_X;
    gameActive = true; // 🔹 Added: Activate the game
  };

  const checkWinner = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
    return null;
  };

  const isBoardFull = () => {
    return board.flat().every(cell => cell !== EMPTY_CELL);
  };

  const handleCellClick = (event) => {
    if (!gameActive) return; // 🔹 Added: Exit function if game is over

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] === EMPTY_CELL) {
      board[row][col] = currentPlayer;
      updateUI();

      const winner = checkWinner();
      if (winner) {
        if (winner === PLAYER_X) {
          playerXWins++; // 🔹 Added: increment playerXWins
        } else if (winner === PLAYER_O) {
          playerOWins++; // 🔹 Added: increment playerOWins
        }

        updateMessage(`Player ${winner} wins!`);
        updateScoreUI();
        gameActive = false; // 🔹 Added: Deactivate the game
        return;
      }

      if (isBoardFull()) {
        updateMessage("It's a draw!");
        gameActive = false; // 🔹 Added: Deactivate the game
        return;
      }

      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      updateMessage(`Player ${currentPlayer}'s turn.`);
    } else {
      updateMessage("Cell is already occupied! Choose another.");
    }
  };

  const init = () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");

    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetBoard);
    updateScoreUI(); // 🔹 Added: Initialize score UI
    resetBoard();
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", TicTacToe.init);