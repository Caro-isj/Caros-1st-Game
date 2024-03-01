window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", () => {
    game.restart();
  });

  document.addEventListener("keydown", (event) => {
    console.log(event.code);
    if (event.code === "KeyD") {
      game.player.directionX = 6;
    } else if (event.code === "KeyA") {
      game.player.directionX = -6;
    }

    if (event.code === "KeyW") {
      game.player.directionY = -6;
    } else if (event.code === "KeyS") {
      game.player.directionY = +6;
    }

    if (event.code === "KeyQ") {
      game.player.directionX = -10;
      game.player.directionY = -10;
    } else if (event.code === "KeyE") {
      game.player.directionX = +10;
      game.player.directionY = -10;
    }

    if (event.code === "Space") {
      game.player.jump();
    }
  });

  document.addEventListener("keyup", () => {
    game.player.directionX = 0;
    game.player.directionY = 0;
  });

  function startGame() {
    console.log("start game");
    game.start();
  }
};
