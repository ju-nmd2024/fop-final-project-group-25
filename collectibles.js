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
    //checks if its collected or not
    if (!this.collected) {
      image(this.strawberryImg, this.x, this.y, this.width, this.height);
    }
  }

  checkCollected(princessX, princessY) {
    if (!this.collected) {
      let distanceX = abs(this.x - princessX);
      let distanceY = abs(this.y - princessY);
      // the following line of code was written using help from chatgpt
      if (distanceX < this.width / 2 && distanceY < this.height / 2) {
        this.collected = true;
        return true;
      }
    }
    return false;
  }
}
