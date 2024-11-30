import MonsterVertical from "./monster-vertical.js";
import MonsterHorizontal from "./monster-horizontal.js";
import Wall from "./walls.js";
import Screen from "./startScreen.js";
import RepeatScreen from "./repeatScreen.js";
import Collectibles from "./collectibles.js";

let walls = [];
let monsters = [];
let princess;
let princessX, princessY, princessW, princessH, princessSpeed;
let rotationAngle = 0; // Tracks the princess's rotation

let gameStarted = false;
let startScreen;
let bgImage;
let menuImage;
let menu1Image;
let dragonImage;
let livesBg;

let princessLives = 3;
let repeatScreen;

let strawberryImg;
let strawberries = [];
let strawberryCount = 0;

function preload() {
  // Loading images
  map = loadImage("summer-map.png");
  princess = loadImage("princess.png");
  bgImage = loadImage("blurry-background.png");
  menuImage = loadImage("start-screen.png");
  menu1Image = loadImage("repeat-screen.png");
  dragonImage = loadImage("monster.png");
  livesBg = loadImage("livesBg.png");
  strawberryImg = loadImage("Strawberry.png");
}
window.preload = preload;

function setup() {
  createCanvas(700, 700);

  if (menuImage && bgImage) {
    startScreen = new Screen(
      "Royal Escape",
      "Start",
      startGame,
      bgImage,
      menuImage
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
    new Wall(492, 10, 208, 48),
  ];

  // Player variables
  princessX = 580;
  princessY = 580;
  princessW = 80;
  princessH = 90;
  princessSpeed = 5;

  monsters = [
    new MonsterVertical(220, 501, 3, 400, 560, dragonImage, 70, 65),
    new MonsterHorizontal(260, 50, 3, 220, 590, dragonImage, 70, 65),
  ];
}
window.setup = setup;

function draw() {
  clear(); // Removes the blue path princess leaves

  if (gameStarted) {
    image(map, 0, 0);
    image(livesBg, 492, 10);

    // Draw the maze
    for (let wall of walls) {
      wall.draw(); // Draw walls
    }

    // Draw the player
    drawPrincess();
    movePrincess();

    for (let monster of monsters) {
      monster.update();
      monster.draw();
    }

    for (let strawberry of strawberries) {
      strawberry.draw();
      if (strawberry.checkCollected(princessX, princessY)) {
        strawberryCount++;
      }
    }

    if (collidesMonster(princessX, princessY)) {
      loseLife();
    }
    if (princessLives <= 0) {
      endGame();
    }
    drawLivesCounter(); //shows how many lives the princess has
    drawStrawberryCounter();
  } else {
    //startScreen is only drawn if its fully initialized
    if (startScreen) {
      startScreen.draw();
    }
  }
  if (repeatScreen) {
    repeatScreen.draw();
  }
}

window.draw = draw;

function mousePressed() {
  if (!gameStarted && startScreen) {
    startScreen.onMousePress();
  }
  if (repeatScreen) {
    repeatScreen.onMousePress();
  }
}
window.mousePressed = mousePressed;

function startGame() {
  gameStarted = true;

  princessLives = 3;

  repeatScreen = null;
  strawberryCount = 0;

  strawberries = [
    new Collectibles(40, 600, 50, 50, strawberryImg),
    new Collectibles(400, 400, 50, 50, strawberryImg),
    new Collectibles(70, 280, 50, 50, strawberryImg),
  ];
}
window.startGame = startGame;

function drawPrincess() {
  push();
  translate(princessX + princessW / 2, princessY + princessH / 2); // Move to the center of the princess
  rotate(rotationAngle); // Rotate based on the direction
  image(princess, -princessW / 2, -princessH / 2, princessW, princessH); // Draw the princess image
  pop();
}
window.drawPrincess = drawPrincess;

function movePrincess() {
  let nextX = princessX;
  let nextY = princessY;

  // Position and rotation- key presses
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
window.movePrincess = movePrincess;

// Check if the princess collides with any wall
function collidesWithAnyWall(nextX, nextY) {
  for (let wall of walls) {
    if (wall.collides(nextX, nextY, princessW, princessH)) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}
window.collidesWithAnyWall = collidesWithAnyWall;

function collidesMonster(nextX, nextY) {
  for (let monster of monsters) {
    if (monster.collides(nextX, nextY, princessW, princessH)) {
      return true; // Collision with a monster
    }
  }
  return false;
}
window.collidesMonster = collidesMonster;

function loseLife() {
  princessLives--;
  // Reset princess position
  princessX = 580;
  princessY = 580;
  rotationAngle = 0;
}
window.loseLife = loseLife;

function drawLivesCounter() {
  push();
  textSize(16); // Set font size
  textStyle(BOLD);
  fill(255); // Set text color (red in this case)
  textAlign(RIGHT, TOP); // Align text to the top-right corner
  text("Lives: " + princessLives, 602, 24); // Display the lives text
  pop();
}

function drawStrawberryCounter() {
  push();
  image(strawberryImg, 615, 12, 40, 40);
  textSize(16); // Set font size
  textStyle(BOLD);
  fill(255); // Set text color (red in this case)
  textAlign(RIGHT, TOP); // Align text to the top-right corner

  text(`: ${strawberryCount}`, 680, 24);
  pop();
}

function endGame() {
  gameStarted = false;
  repeatScreen = new RepeatScreen(
    "Game Over! You lost all your lives",
    "Try again",
    startGame,
    bgImage,
    menu1Image
  );
}
window.endGame = endGame;
