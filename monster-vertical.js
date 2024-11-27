export default class MonsterVertical {
  constructor(x, y, speed, minY, maxY) {
    this.x = x; // Fixed x position
    this.y = y; // Starting y position
    this.speed = speed; // Movement speed
    this.minY = minY; // Minimum y boundary
    this.maxY = maxY; // Maximum y boundary
  }

  update() {
    this.y += this.speed;

    // Reverse direction when reaching the bounds
    if (this.y >= this.maxY || this.y <= this.minY) {
      this.speed = -this.speed;
    }
  }

  draw() {
    fill(255); // Monster color
    ellipse(this.x, this.y, 50, 50); // Draw monster at its current position
  }
}
