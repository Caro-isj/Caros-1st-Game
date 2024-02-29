class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.enemyPositions = [10, 100, 200, 300, 410];
    this.top =
      this.enemyPositions[
        Math.floor(Math.random() * this.enemyPositions.length)
      ];
    this.left = 1000;
    this.width = 110;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "images/enemy 2.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left -= 15;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
