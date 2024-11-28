export default class MonsterVertical {
  constructor(x, y, speed, minY, maxY, dragonImage, width, height) {
    this.x = x; // Fixed x position
    this.y = y; // Starting y position
    this.speed = speed; // Movement speed
    this.minY = minY; // Minimum y boundary
    this.maxY = maxY; // Maximum y boundary
    this.dragonImage = dragonImage;
    this.width = width;
    this.height = height;
  }

  update() {
    this.y += this.speed;

    // Reverse direction when reaching the bounds
    if (this.y >= this.maxY || this.y <= this.minY) {
      this.speed = -this.speed;
    }
  }

  draw() {
    image(this.dragonImage, this.x, this.y, this.width, this.height);
  }
}
