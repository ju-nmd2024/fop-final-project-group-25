export default class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Draw the wall
  draw() {
    fill(0, 122); // Wall color
    rect(this.x, this.y, this.width, this.height);
  }

  // Check if a point collides with this wall
  collides(nextX, nextY, princessW, princessH) {
    return (
      nextX + 13 < this.x + this.width &&
      nextX + princessW - 13 > this.x &&
      nextY + 13 < this.y + this.height &&
      nextY + princessH - 13 > this.y
    );
  }
}
