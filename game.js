import MonsterVertical from "./monster-vertical.js";
import Wall from "./walls.js";
import Screen from "./startScreen.js";

let walls = [];
let princess;
let monster;
let princessX, princessY, princessW, princessH, princessSpeed;
let rotationAngle = 0; // Tracks the princess's rotation

let gameStarted = false;
let startScreen;
let bgImage;
let menuImage;

function preload() {
  // Load assets
  map = loadImage("summer-map.png");
  princess = loadImage("princess.png");
  bgImage = loadImage("blurry-background.png");
  menuImage = loadImage("start-screen.png");

  // Uncomment if you add the monster image
  // monster = loadImage("dragon.png");
}
window.preload = preload;

function setup() {
  createCanvas(700, 700);

  // Ensure assets are loaded before creating startScreen
  if (menuImage && bgImage) {
    startScreen = new Screen(
      "Royal Escape",
      "Start",
      startGame,
      bgImage,
      menuImage // Pass the loaded menuImage here
    );
  }

  // Create walls
  walls = [
    new Wall(175, 0, 50, 240), // Top Vertical wall
    new Wall(0, 351, 450, 50), // Middle Horizontal wall
    new Wall(399, 143, 50, 250), // Middle long vertical wall
    new Wall(0, 0, 32, 700), // Left side wall
    new Wall(667, 0, 33, 700), // Right side wall
    new Wall(0, 672, 560, 30), // Bottom wall
    new Wall(175, 527, 50, 150), // Bottom vertical wall
    new Wall(180, -17, 550, 50), // Top wall
    new Wall(495, 495, 230, 50), // Right short vertical wall
    new Wall(400, 239, 160, 50), // Middle short horizontal wall
    new Wall(0, 0, 65, 30), //Tiny top horizontal wall
  ];

  // Player variables
  princessX = 580;
  princessY = 580;
  princessW = 80;
  princessH = 90;
  princessSpeed = 5;
}
window.setup = setup;

function draw() {
  clear(); // Remove the princess's trail around the maze

  if (gameStarted) {
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
  } else {
    // Ensure startScreen is only drawn if it's fully initialized
    if (startScreen) {
      startScreen.draw();
    }
  }
}
window.draw = draw;

function mousePressed() {
  if (!gameStarted && startScreen) {
    startScreen.onMousePress();
  }
}

function startGame() {
  gameStarted = true;

  // Create the monster
  monster = new MonsterVertical(260, 501, 3, 430, 600);
}

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

  // Position and rotation angle based on key presses
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

  // Move only if there isn't a collision
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
