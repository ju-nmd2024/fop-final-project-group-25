export default class Princess {
  constructor(x, y, width, height, speed, images) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.images = images;
    this.currentImage = images.down;
  }
  draw() {
    push();
    translate(this.x + this.width / 2, this.y + this.height / 2);
    image(
      this.currentImage,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    pop();
  }

  move(walls) {
    let nextX = this.x;
    let nextY = this.y;

    // Position and rotation- key presses

    if (keyIsDown(LEFT_ARROW)) {
      nextX -= this.speed;
      this.currentImage = this.images.left;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      nextX += this.speed;
      this.currentImage = this.images.right;
    }
    if (keyIsDown(UP_ARROW)) {
      nextY -= this.speed;
      this.currentImage = this.images.up;
    }
    if (keyIsDown(DOWN_ARROW)) {
      nextY += this.speed;
      this.currentImage = this.images.down;
    }

    // Move only if there isn't a collision
    if (!this.collidesWithAnyWall(nextX, nextY, walls)) {
      this.x = nextX;
      this.y = nextY;
    }
  }

  //the lines of code connected to princesss collision with the walls were inspired by chatgpt at this link https://chatgpt.com/c/674ee26b-07c4-8003-be98-b0d7f0068d59
  collidesWithAnyWall(nextX, nextY, walls) {
    for (let wall of walls) {
      if (wall.collides(nextX, nextY, this.width, this.height)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  //resetting when losing a life
  resetPosition(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.currentImage = this.images.down;
  }
}
