class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOverScreen = document.getElementById("game-over");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");

    this.player = new Player(
      this.gameScreen,
      40,
      390,
      100,
      100,
      "images/69846b63f30796d.png"
    );
    //this.height = 516; xq se vuelve un cuadro cuando agrego height?
    this.width = 910;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.lives = 3;
    this.gameisOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 60);
    //this.counter = 0;
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.width = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      //this.counter++;
    }, this.gameLoopFrequency);
  }

  restart() {
    console.log(this.obstacles);
    this.gameisOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameOverScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    //this.obstacles.push(new Obstacle(this.gameScreen));
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.start();
    this.livesElement.innerText = this.lives;
    this.scoreElement.innerText = this.score;

    ///como resetear sitio player?
  }

  gameLoop() {
    this.update();
    if (this.gameisOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }

  update() {
    /* if (this.counter % 200 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen)); //regresar a array?
    }*/

    this.player.move();

    this.obstacles.forEach((oneObstacle, index) => {
      oneObstacle.move();
      if (oneObstacle.left < -100) {
        console.log("You scored a point");

        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.score++;
        this.scoreElement.innerText = this.score;
      }

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
