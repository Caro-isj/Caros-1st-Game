class Player {
  constructor(
    gameScreen,
    playerLeft,
    playerTop,
    playerWidth,
    playerHeight,
    imgSrc
  ) {
    this.gameScreen = gameScreen;
    this.left = playerLeft;
    this.top = playerTop;
    this.width = playerWidth;
    this.height = playerHeight;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  jump() {
    if (this.top >= 0 && this.top < 420) {
      let maxHeight = 200;
      let tracker = 0;

      this.jumpTimer = setInterval(() => {
        if (tracker === maxHeight * 2) {
          clearInterval(this.jumpTimer);
        }
        if (tracker < maxHeight) {
          // this.left += 7;
          this.top -= 17;
        } else {
          // this.left += 7;
          this.top += 17;
        }
        tracker += 10;
      }, 30);

      //**bug: stuck at limits when jump pressed and lowers a few pixels when comes down**

      if (this.left < 10) {
        this.left = 10;
      }
      if (this.top < 10) {
        this.top = 10;
      }
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
      if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
        this.top = this.gameScreen.offsetHeight - this.height - 10;
      }

      this.updatePosition();
    }
  }

  /*jump(command) {
    if (command === "stop-jump") {
      clearInterval(this.jumpTimer);
      return;
    }
  }*/

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  //COFFEE

  didCollide(coffee) {
    const playerRect = this.element.getBoundingClientRect();
    const coffeeRect = coffee.element.getBoundingClientRect();

    if (
      playerRect.left < coffeeRect.right &&
      playerRect.right > coffeeRect.left &&
      playerRect.top < coffeeRect.bottom &&
      playerRect.bottom > coffeeRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
