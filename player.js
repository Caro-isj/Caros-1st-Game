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
    /*if (
      this.left >= 0 &&
      this.left + this.width <= 910 &&
      this.top <= 0 &&
      this.top + this.height >= 516
    ) {*/
    this.left += this.directionX;
    this.top += this.directionY;
    this.updatePosition();
    // }
  }

  jump() {
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
      console.log(tracker);
      this.updatePosition();
    }, 30);
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
}
