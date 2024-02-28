class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.enemyPositions = [220, 190];
    this.top =
      this.enemyPositions[
        Math.floor(Math.random() * this.enemyPositions.length)
      ];
    this.left = 1100;
    this.width = 150;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src =
      "images/pixel-art-fantasia-calavera-metero_150088-829.png"; //como agrego mas enemigos
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left -= 10;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
