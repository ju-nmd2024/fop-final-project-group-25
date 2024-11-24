class Monster {
  constructor(x, speed) {
    this.x = x;
    this.speed = speed;
  }

  update() {
    this.x = this.x + this.speed;
    if (this.x + 25 >= width || this.x - 25 <= 0) {
      this.speed = -this.speed;
    }
  }

  draw() {
    fill(255);
    ellipse(this.x, 50, 50, 50);
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
