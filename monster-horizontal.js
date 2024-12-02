export default class MonsterHorizontal {
  constructor(x, y, speed, minX, maxX, dragonImage, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed; // Movement speed
    this.minX = minX; // Minimum y boundary
    this.maxX = maxX; // Maximum y boundary
    this.dragonImage = dragonImage;
    this.width = width;
    this.height = height;
  }

  update() {
    this.x += this.speed;

    // Reverses direction when reaching the walls
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
