import MonsterVertical from "./monster-vertical.js";

let walls = [];
let monster;
let princess;
let princessX, princessY, princessW, princessH, princessSpeed;
let rotationAngle = 0; // keeps track of the princesss rotation

function setup() {
  createCanvas(700, 700);
  monster = new MonsterVertical(50, 3);
  // Maze walls in the array
  walls = [
    [150, 0, 20, 250], // Vertical wall
    [0, 380, 400, 20], // Horizontal wall
    [380, 130, 20, 270], // Another vertical wall
    [0, 0, 10, 700], // Left side wall
    [690, 0, 10, 700], // Right side wall
    [0, 690, 580, 10], // Bottom wall
    [150, 550, 20, 150], // Small vertical wall
    [150, 0, 550, 10], // Top wall
    [470, 500, 230, 20], // Left side small wall
    [400, 250, 150, 20], // Small wall that pops up from the vertical wall
  ];

  // Player variables
  princessX = 580;
  princessY = 580;
  princessW = 80;
  princessH = 90;
  princessSpeed = 5;
}
window.setup = setup;

function preload() {
  map = loadImage("map-2.png");
  princess = loadImage("princess.png");
}
window.preload = preload;

function draw() {
  image(map, 0, 0);

  // Draw the maze
  drawWalls();

  // Draw the player
  drawPrincess();
  movePrincess();

  // Update and draw the monster
  monster.update();
  monster.draw();
}
window.draw = draw;

function drawWalls() {
  fill(0, 122);
  for (let wall of walls) {
    rect(wall[0], wall[1], wall[2], wall[3]); //the maze walls
  }
}

function drawPrincess() {
  push();
  translate(princessX + princessW / 2, princessY + princessH / 2); // Move to the center of the princess
  rotate(rotationAngle); // Apply the rotation based on the direction
  image(princess, -princessW / 2, -princessH / 2, princessW, princessH); // Draw the princess image
  pop();
}

function movePrincess() {
  let nextX = princessX;
  let nextY = princessY;

  // Update the position and rotation angle based on key presses
  if (keyIsDown(LEFT_ARROW)) {
    nextX -= princessSpeed;
    rotationAngle = -HALF_PI; // turns left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    nextX += princessSpeed;
    rotationAngle = HALF_PI; //turns right)
  }
  if (keyIsDown(UP_ARROW)) {
    nextY -= princessSpeed;
    rotationAngle = 0; // keeps facing up
  }
  if (keyIsDown(DOWN_ARROW)) {
    nextY += princessSpeed;
    rotationAngle = PI; // turns down
  }

  // the princess moves only if there isnt collision
  if (canMove(nextX, nextY)) {
    princessX = nextX;
    princessY = nextY;
  }
}

// Check if the princess can move to the next position
function canMove(nextX, nextY) {
  for (let wall of walls) {
    if (
      nextX + 15 < wall[0] + wall[2] &&
      nextX + princessW - 15 > wall[0] &&
      nextY < wall[1] + wall[3] &&
      nextY + princessH > wall[1]
    ) {
      return false; // Collision detected, cannot move
    }
  }
  return true; // No collision, can move
}
