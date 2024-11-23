export class Princess {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {
    fill(100, 150, 255); // Blue color for the princess
    rect(this.x, this.y, this.width, this.height);// this is where we will put in the .png image of the princess
  }

  move(walls) {
    let nextX = this.x;// puts in the new position of the charachter, memorizes it so it knows where it is currently
    let nextY = this.y;

    // control princess with arrow keys
    if (keyIsDown(LEFT_ARROW)) nextX -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) nextX += this.speed;
    if (keyIsDown(UP_ARROW)) nextY -= this.speed;
    if (keyIsDown(DOWN_ARROW)) nextY += this.speed;

    // Return if there is a collision
    if (this.collides(nextX, nextY, walls)) return;// if the charachter hits the wall it stops and "returns", it doesnt continue

    // Update position if there is no collision
    this.x = nextX;
    this.y = nextY;
  }

  collides(nextX, nextY, walls) {
    for (let wall of walls) {
      if (
        //the following five lines of code were written through consulting chatgpt
        nextX < wall[0] + wall[2]+wall[4]+wall[5] &&// added this check if it works
        nextX + this.width > wall[0] &&
        nextY < wall[1] + wall[3] &&
        nextY + this.height > wall[1]
        ) {
        return true; // Collision happens
      }
    }
    return false; // No collision
  }
}
