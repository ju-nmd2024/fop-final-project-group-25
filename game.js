let walls = [];
let princessX, princessY, princessW, princessH, princessSpeed;

function setup() {
  createCanvas(700, 700);

  // maze walls in the array
  walls = [
    [150, 0, 20, 250], // Vertical wall
    [0, 380, 400, 20], // Horizontal wall
    [380, 130, 20, 270], // Another vertical wall
    [0, 0, 10, 700], // leftside wall
    [690, 0, 10, 700], // rightside wall
    [0, 690, 580, 10], //bottom wall
    [150, 550, 20, 150], //small vertical wall
    [150, 0, 550, 10], //top wall
    [470, 500, 230, 20], //left side small wall
    [400, 250, 150, 20], //small wall that pops up from the vertical wall
  ];

  // player variables
  princessX = 580;
  princessY = 580;
  princessW = 80;
  princessH = 90;
  princessSpeed = 5;
}
function preload() {
  map = loadImage("map-2.png");
  princess = loadImage("princess.png");
}

function draw() {
  image(map, 0, 0);

  // Draws the maze
  drawWalls();

  // Draws the player
  drawPrincess();
  movePrincess();
}

function drawWalls() {
  fill(0, 122);
  for (let wall of walls) {
    rect(wall[0], wall[1], wall[2], wall[3]); // accesses the maze walls
  }
}

function drawPrincess() {
  image(princess, princessX, princessY, princessW, princessH);

  fill(100, 150, 255);
  //rect(princessX, princessY, princessW, princessH); // player drawn
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
