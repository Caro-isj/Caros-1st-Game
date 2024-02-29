class Coffee {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.coffeePositions = [50, 150, 220, 350];
    this.top =
      this.coffeePositions[
        Math.floor(Math.random() * this.coffeePositions.length)
      ];
    this.left = 1000;
    this.width = 65;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "images/latteCup.gif";

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
