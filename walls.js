export default class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Draw the wall
  draw() {
    noStroke();
    fill(0, 0); // Wall color
    rect(this.x, this.y, this.width, this.height);
  }

  // Check if a point collides with this wall
  collides(nextX, nextY, princessW, princessH) {
    return (
      nextX + 8 < this.x + this.width &&
      nextX + princessW - 8 > this.x &&
      nextY + 8 < this.y + this.height &&
      nextY + princessH - 8 > this.y
    );
  }
}
