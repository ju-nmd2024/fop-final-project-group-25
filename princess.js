export default class Princess {
  constructor(x, y, width, height, speed, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = image;
    this.rotationAngle = 0;
  }
  draw() {
    push();
    translate(this.x + this.width / 2, this.y + this.height / 2);
    rotate(this.rotationAngle);
    image(
      this.image,
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
    //arrow key movement inspired by a youtube video at: https://www.youtube.com/watch?v=SatRryVpAKE
    if (keyIsDown(LEFT_ARROW)) {
      nextX -= this.speed;
      this.rotationAngle = -HALF_PI; // Turns left
    }
    if (keyIsDown(RIGHT_ARROW)) {
      nextX += this.speed;
      this.rotationAngle = HALF_PI; // Turns right
    }
    if (keyIsDown(UP_ARROW)) {
      nextY -= this.speed;
      this.rotationAngle = 0; // Keeps facing up
    }
    if (keyIsDown(DOWN_ARROW)) {
      nextY += this.speed;
      this.rotationAngle = PI; // Turns down
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
    this.rotationAngle = 0; // Reset rotation
  }
}
