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
      120,
      120,
      "images/output-onlinegiftools.gif"
    );

    this.width = 910;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.coffees = [new Coffee(this.gameScreen)];
    this.score = 0;
    this.lives = 3;
    this.gameisOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.playingSong = new Audio("sounds/POL-super-match-short.wav");
    this.dyingTune = new Audio("sounds/POL-spirits-dance-short.wav");
    this.coffeeSound = new Audio("sounds/sfx_coin_cluster3.wav");
    this.enemySound = new Audio("sounds/sfx_exp_short_hard1.wav");
    this.playingSong.volume = 0.08;
    this.dyingTune.volume = 0.08;
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.width = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.playingSong.loop = true;
    this.playingSong.play();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  restart() {
    this.dyingTune.pause();
    this.gameisOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameOverScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.coffees = [new Coffee(this.gameScreen)];
    this.start();
    this.livesElement.innerText = this.lives;
    this.scoreElement.innerText = this.score;
    this.player.element.remove();
    this.player = new Player(
      this.gameScreen,
      40,
      390,
      120,
      120,
      "images/output-onlinegiftools.gif"
    );
  }

  gameLoop() {
    this.update();
    if (this.gameisOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }

  update() {
    this.player.move();

    this.obstacles.forEach((oneObstacle, index) => {
      oneObstacle.move();

      if (oneObstacle.left < -100) {
        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
      }

      if (this.player.didCollide(oneObstacle)) {
        this.enemySound.play();
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

    this.coffees.forEach((oneCoffee, index) => {
      oneCoffee.move();

      if (oneCoffee.left < -100) {
        this.coffees.splice(index, 1);
        oneCoffee.element.remove();
        this.coffees.push(new Coffee(this.gameScreen));
      }

      if (this.player.didCollide(oneCoffee)) {
        this.coffeeSound.play();
        this.coffees.splice(index, 1);
        oneCoffee.element.remove();
        this.coffees.push(new Coffee(this.gameScreen));
        this.score++;
        this.scoreElement.innerText = this.score;
      }
    });
  }

  gameOver() {
    this.dyingTune.play();
    this.coffees.forEach((oneCoffee) => oneCoffee.element.remove());
    this.coffees = [];
    this.obstacles.forEach((oneObstacle) => oneObstacle.element.remove());
    this.obstacles = [];
    this.playingSong.pause();
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
  }
}
