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
    this.updatePosition();
    console.log("here");
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.top = `${this.left}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    //check actual directions for mine

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
