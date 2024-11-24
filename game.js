let walls = [];
let princessX, princessY, princessW, princessH, princessSpeed;

function setup() {
  createCanvas(700, 700);

  // maze walls in the array
  walls = [
    [150, 0, 20, 300], // Vertical wall
    [0, 380, 400, 20], // Horizontal wall
    [300, 50, 20, 250], // Another vertical wall
    [0, 0, 20, 700], // leftside wall
    [680, 0, 20, 700], // rightside wall
    [0, 680, 620, 20], //bottom wall
    [100, 550, 20, 150], //small vertical wall
    [150, 0, 550, 20], //top wall
  ];

  // player variables
  princessX = 50;
  princessY = 50;
  princessW = 20;
  princessH = 20;
  princessSpeed = 3;
}

function draw() {
  background(220);

  // Draws the maze
  drawWalls();

  // Draws the player
  drawPrincess();
  movePrincess();
}

function drawWalls() {
  fill(0);
  for (let wall of walls) {
    rect(wall[0], wall[1], wall[2], wall[3]); // accesses the maze walls
  }
}

function drawPrincess() {
  fill(100, 150, 255);
  rect(princessX, princessY, princessW, princessH); // player drawn
}

function movePrincess() {
  let nextX = princessX;
  let nextY = princessY;

  // position of the princess moved by arrow keys
  if (keyIsDown(LEFT_ARROW)) nextX -= princessSpeed;
  if (keyIsDown(RIGHT_ARROW)) nextX += princessSpeed;
  if (keyIsDown(UP_ARROW)) nextY -= princessSpeed;
  if (keyIsDown(DOWN_ARROW)) nextY += princessSpeed;

  // move only if it doesnt collide
  if (collides(nextX, nextY) === false) {
    princessX = nextX;
    princessY = nextY;
  }
}

function collides(nextX, nextY) {
  for (let wall of walls) {
    if (
      nextX < wall[0] + wall[2] &&
      nextX + princessW > wall[0] &&
      nextY < wall[1] + wall[3] &&
      nextY + princessH > wall[1]
    ) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}
