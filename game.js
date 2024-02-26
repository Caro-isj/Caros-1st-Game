class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOverScreen = document.getElementById("game-over");
    this.player = new Player(
      this.gameScreen,
      70,
      350,
      100,
      100,
      "images/69846b63f30796d.png"
    );
    this.height = 600;
    this.width = 1000;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 24); //24fps
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.width = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    console.log("game loop");
    this.update();
    if (this.gameOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {}
}
