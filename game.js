import MonsterVertical from "./monster-vertical.js";
import Wall from "./walls.js";
import Screen from "./screen.js"; // Import the Screen class

let walls = [];
let monster;
let princess;
let princessX, princessY, princessW, princessH, princessSpeed;
let rotationAngle = 0; // Tracks the princess's rotation

let startScreen;
let gameScreen;
let currentScreen;

function setup() {
  createCanvas(700, 700);

  // Initialize the start screen
  startScreen = new Screen(
    "Welcome to the Game! Press Start to Play.",
    "Start Game",
    startGame
  );

  // Initialize the game screen (but don't show it yet)
  gameScreen = null; // We'll create the game screen later

  // Set the current screen to the start screen
  currentScreen = startScreen;
}

window.setup = setup;

function preload() {
  map = loadImage("summer-map.png");
  princess = loadImage("princess.png");
}

window.preload = preload;

function draw() {
  clear(); // Clear the canvas

  // Draw the current screen (either start screen or game screen)
  currentScreen.draw();
}

window.draw = draw;

function mousePressed() {
  // Check if the mouse was pressed on the current screen
  currentScreen.onMousePress();
}

// Function that transitions to the game screen
function startGame() {
  console.log("Game started!");

  // Initialize the game screen only when the game starts
  gameScreen = new GameScreen(); // Create the actual game screen

  // Set the current screen to the game screen
  currentScreen = gameScreen;
}

// Game screen class for the actual game
class GameScreen {
  constructor() {
    // Initialize game objects
    monster = new MonsterVertical(260, 501, 3, 430, 600);

    // Initialize walls
    walls = [
      new Wall(175, 0, 50, 240), // Top Vertical wall
      new Wall(0, 351, 450, 50), // Middle Horizontal wall
      new Wall(399, 143, 50, 250), // Middle long vertical wall
      new Wall(0, 0, 32, 700), // Left side wall
      new Wall(671, 0, 30, 700), // Right side wall
      new Wall(0, 672, 560, 30), // Bottom wall
      new Wall(175, 527, 50, 150), // Bottom vertical wall
      new Wall(180, -17, 550, 50), // Top wall
      new Wall(495, 495, 230, 50), // Right short vertical wall
      new Wall(400, 239, 160, 50), // Middle short horizontal wall
    ];

    // Initialize player variables
    princessX = 580;
    princessY = 580;
    princessW = 80;
    princessH = 90;
    princessSpeed = 5;
  }

  draw() {
    // Draw the game screen (the maze and the princess)
    image(map, 0, 0);

    // Draw the maze
    for (let wall of walls) {
      wall.draw(); // Draw walls
    }

    // Draw the player
    this.drawPrincess();
    this.movePrincess();

    // Update and draw the monster
    monster.update();
    monster.draw();
  }

  // Draw the princess
  drawPrincess() {
    push();
    translate(princessX + princessW / 2, princessY + princessH / 2); // Move to the center of the princess
    rotate(rotationAngle); // Rotate based on the direction
    image(princess, -princessW / 2, -princessH / 2, princessW, princessH); // Draw the princess image
    pop();
  }

  // Move the princess
  movePrincess() {
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
    if (!this.collidesWithAnyWall(nextX, nextY)) {
      princessX = nextX;
      princessY = nextY;
    }
  }

  // Check if the princess collides with any wall
  collidesWithAnyWall(nextX, nextY) {
    for (let wall of walls) {
      if (wall.collides(nextX, nextY, princessW, princessH)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }
}
