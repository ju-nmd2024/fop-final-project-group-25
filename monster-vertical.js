class Monster {
  constructor(y, speed) {
    this.y = y;
    this.speed = speed;
  }

  update() {
    this.y = this.y + this.speed;
    if (this.y - 25 >= width || this.y - 25 <= 0) {
      this.speed = -this.speed;
    }
  }

  draw() {
    fill(255);
    ellipse(50, this.y, 50, 50);
  }
}

let monster;

function setup() {
  createCanvas(700, 700);
  monster = new Monster(50, 3);
}

function draw() {
  background(0);
  monster.update(); // Update position
  monster.draw(); // Draw the monster
}
