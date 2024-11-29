export default class MonsterHorizontal {
  constructor(x, y, speed, minX, maxX, dragonImage, width, height) {
    this.x = x; // Fixed x position
    this.y = y; // Starting y position
    this.speed = speed; // Movement speed
    this.minX = minX; // Minimum y boundary
    this.maxX = maxX; // Maximum y boundary
    this.dragonImage = dragonImage;
    this.width = width;
    this.height = height;
  }

  update() {
    this.x += this.speed;

    // Reverse direction when reaching the bounds
    if (this.x >= this.maxX || this.x <= this.minX) {
      this.speed = -this.speed;
    }
  }

  draw() {
    image(this.dragonImage, this.x, this.y, this.width, this.height);
  }

  collides(nextX, nextY, princessW, princessH) {
    return (
      nextX < this.x + this.width &&
      nextX + princessW > this.x &&
      nextY < this.y + this.height &&
      nextY + princessH > this.y
    );
  }
}
