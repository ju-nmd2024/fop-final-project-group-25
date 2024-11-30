export default class Collectibles {
  constructor(x, y, width, height, strawberryImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.strawberryImg = strawberryImg;
    this.collected = false; // To track if the collectible is collected
  }
  draw() {
    if (!this.collected) {
      image(this.strawberryImg, this.x, this.y, this.width, this.height);
    }
  }

  checkCollected(princessX, princessY) {
    if (!this.collected) {
      if (
        abs(this.x - princessX) < this.size / 2 &&
        abs(this.y - princessY) < this.size / 2
      ) {
        this.collected = true;
        return true;
      }
    }
    return false;
  }
}
