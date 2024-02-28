class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOverScreen = document.getElementById("game-over");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");

    this.player = new Player(
      this.gameScreen,
      70,
      350,
      100,
      100,
      "images/mainchar 2.png"
    );
    //this.height = 910;
    this.width = 910;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameisOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 60); //60fps
    this.counter = 0;
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.width = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      this.counter++;
    }, this.gameLoopFrequency);
  }

  //POR QUE NO REFRESCA SCORE Y LIVES?

  restart() {
    this.gameisOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameOverScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.obstacles.push(new Obstacle(this.gameScreen));
    this.start();
  }

  gameLoop() {
    this.update();
    if (this.gameisOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }

  update() {
    //adding more enemies after certain frames
    if (this.counter % 200 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen)); //regresar a array?
    }

    this.player.move();

    this.obstacles.forEach((oneObstacle, index) => {
      oneObstacle.move();
      if (oneObstacle.left < -200) {
        console.log("You scored a point");

        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.score++;
        this.scoreElement.innerText = this.score;
      }

      //collision

      if (this.player.didCollide(oneObstacle)) {
        console.log("collision!");
        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.lives--;
        this.livesElement.innerText = this.lives;
        if (this.lives === 0) {
          this.gameisOver = true;
        }
      }
    });
  }

  gameOver() {
    console.log("you've fallen into eternal slumber");
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
  }
}
