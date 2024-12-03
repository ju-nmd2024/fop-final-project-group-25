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
 // the following 5 lines of code were inspired by help from chatgpt https://chatgpt.com/c/674ede53-e838-8003-aa06-f7f4912041be
  checkCollected(princessX, princessY) {
    if (!this.collected) {
      let distanceX = abs(this.x - princessX);
      let distanceY = abs(this.y - princessY);
     
      if (distanceX < this.width / 2 && distanceY < this.height / 2) {
        this.collected = true;
        return true;
      }
    }
    return false;
  }
}
