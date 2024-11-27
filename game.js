import MonsterVertical from "./monster-vertical.js";
import Wall from "./walls.js";

let walls = [];
let monster;
let princess;
let princessX, princessY, princessW, princessH, princessSpeed;
let rotationAngle = 0; // Tracks the princess's rotation

function setup() {
  createCanvas(700, 700);

  // Initialize the monster with configurable positions
  monster = new MonsterVertical(200, 501, 3, 430, 640);

  // Initialize walls
  walls = [
    new Wall(150, 0, 20, 250), // Vertical wall
    new Wall(0, 380, 400, 20), // Horizontal wall
    new Wall(380, 130, 20, 270), // Another vertical wall
    new Wall(0, 0, 10, 700), // Left side wall
    new Wall(690, 0, 10, 700), // Right side wall
    new Wall(0, 690, 580, 10), // Bottom wall
    new Wall(150, 550, 20, 150), // Small vertical wall
    new Wall(150, 0, 550, 10), // Top wall
    new Wall(470, 500, 230, 20), // Left side small wall
    new Wall(400, 250, 150, 20), // Small wall that pops up from the vertical wall
  ];

  // Initialize player variables
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
  clear(); //to remove the princess leaving of blue scattered around the maze
  image(map, 0, 0);

  // Draw the maze
  for (let wall of walls) {
    wall.draw(); // Draw walls
  }

  // Draw the player
  drawPrincess();
  movePrincess();

  // Update and draw the monster
  monster.update();
  monster.draw();
}
window.draw = draw;

function drawPrincess() {
  push();
  translate(princessX + princessW / 2, princessY + princessH / 2); // Move to the center of the princess
  rotate(rotationAngle); // Rotate based on the direction
  image(princess, -princessW / 2, -princessH / 2, princessW, princessH); // Draw the princess image
  pop();
}

function movePrincess() {
  let nextX = princessX;
  let nextY = princessY;

  // Update the position and rotation angle based on key presses
  if (keyIsDown(LEFT_ARROW)) {
    nextX -= princessSpeed;
    rotationAngle = -HALF_PI; // Turns left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    nextX += princessSpeed;
    rotationAngle = HALF_PI; // Turns right
  }
  if (keyIsDown(UP_ARROW)) {
    nextY -= princessSpeed;
    rotationAngle = 0; // Keeps facing up
  }
  if (keyIsDown(DOWN_ARROW)) {
    nextY += princessSpeed;
    rotationAngle = PI; // Turns down
  }

  // Move the princess only if there isn't a collision
  if (!collidesWithAnyWall(nextX, nextY)) {
    princessX = nextX;
    princessY = nextY;
  }
}

// Check if the princess collides with any wall
function collidesWithAnyWall(nextX, nextY) {
  for (let wall of walls) {
    if (wall.collides(nextX, nextY, princessW, princessH)) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}
