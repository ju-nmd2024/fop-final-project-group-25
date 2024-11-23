export class Princess {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
  preload() {
      // Loading the princess image
      this.img = loadImage("princess.png"); // Replace with the actual path to the image
    }
 draw() {
      if (this.img) {
        // Draw the image if loaded
        image(this.img, this.x, this.y, this.width, this.height);
      } else {
        // Fallback to a rectangle if image is not loaded
        fill(100, 150, 255);
        rect(this.x, this.y, this.width, this.height);
      }
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
    if (this.collides(nextX, nextY, walls) === false) {
        this.x = nextX;
        this.y = nextY;
      }
  }

  collides(nextX, nextY, walls) {
      for (let wall of walls) {
        if (
          nextX < wall[0] + wall[2] && //charachters right edge doesnt touch the walls left edge
          nextX + this.width > wall[0] && // charachters left edge doesnt touch the wall's right edge
          nextY < wall[1] + wall[3] && // charachters bottom edge doesnt touch the wall's top edge
          nextY + this.height > wall[1] // charachters top edge doesnt touch the wall's bottom edge
        ) {
          return true; // Collision detected
        }
      }
      return false; // No collision
    }
  }
