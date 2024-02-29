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
    //this.height = 516; **Bugs: Becomes square when adding height**
    this.width = 910;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.coffees = [new Coffee(this.gameScreen)];
    this.score = 0;
    this.lives = 3;
    this.gameisOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.song = new Audio("images/POL-super-match-short.wav");

    this.song.volume = 0.1;
    // this.counter = 0;
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.width = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.song.loop = true;
    this.song.play();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      //  this.counter++;
    }, this.gameLoopFrequency);
  }

  restart() {
    this.gameisOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameOverScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    // this.obstacles.push(new Obstacle(this.gameScreen));
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.coffees = [new Coffee(this.gameScreen)];
    this.start();
    this.livesElement.innerText = this.lives; //didnt show the reset score/point without this
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

    //**Bugs: doesn't reset player initial position**
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

    /*if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }*/

    this.obstacles.forEach((oneObstacle, index) => {
      oneObstacle.move();
      if (oneObstacle.left < -100) {
        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        // this.score++;
        // this.scoreElement.innerText = this.score;
      }

      if (this.player.didCollide(oneObstacle)) {
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
        this.coffees.splice(index, 1);
        oneCoffee.element.remove();
        this.coffees.push(new Coffee(this.gameScreen));
        this.score++;
        this.scoreElement.innerText = this.score;
      }
    });
  }

  gameOver() {
    this.song.pause();
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
  }
}
