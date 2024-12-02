import MonsterVertical from "./monster-vertical.js";
import MonsterHorizontal from "./monster-horizontal.js";
import Wall from "./walls.js";
import Screen from "./startScreen.js";
import RepeatScreen from "./repeatScreen.js";
import Collectibles from "./collectibles.js";
import Princess from "./princess.js";
import WinScreen from "./winScreen.js";

let walls = [];
let monsters = [];
let strawberries = [];
let strawberryCount = 0;

let princess;
let princessLives = 3;

let gameStarted = false;
let startScreen;
let winScreen;
let repeatScreen;

let bgImage;
let menuImage;
let menu1Image;
let dragonImage;
let livesBg;
let autumnLevel;
let winterLevel;
let strawberryImg;

let levelBackgrounds = {};
let currentLevel = 1;

function preload() {
  // Loading images

  princess = loadImage("princess.png");
  bgImage = loadImage("blurry-background.png");
  menuImage = loadImage("start-screen.png");
  menu1Image = loadImage("repeat-screen.png");
  dragonImage = loadImage("monster.png");
  livesBg = loadImage("livesBg.png");
  strawberryImg = loadImage("Strawberry.png");

  levelBackgrounds[1] = loadImage("summer-map.png");
  levelBackgrounds[2] = loadImage("autumnMap.png");
  levelBackgrounds[3] = loadImage("winter-map.png");
  levelBackgrounds[4] = loadImage();
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

  princess = new Princess(580, 580, 80, 90, 5, princess);

  loadLevel(currentLevel);
}
window.setup = setup;

function draw() {
  clear(); // Removes the blue path princess leaves

  if (gameStarted) {
    image(livesBg, 492, 10);

    // Draw the maze
    for (let wall of walls) {
      wall.draw(); // Draw walls
    }

    // Draw the player
    princess.draw();
    princess.move(walls);

    for (let monster of monsters) {
      monster.update();
      monster.draw();
    }

    for (let strawberry of strawberries) {
      strawberry.draw();
      if (strawberry.checkCollected(princess.x, princess.y)) {
        strawberryCount++;
      }
    }

    if (currentLevel === 1 && princess.x <= 10 && princess.y <= 10) {
      nextLevel();
    } else if (currentLevel === 2 && princess.x >= 670 && princess.y <= 10) {
      nextLevel();
    } else if (currentLevel === 3 && princess.x <= 50 && princess.y <= 10) {
      nextLevel();
    }

    if (collidesMonster(princess.x, princess.y)) {
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
  if (winScreen) {
    winScreen.draw();
  }
}

window.draw = draw;

function nextLevel() {
  currentLevel++;

  if (currentLevel > 4) {
    winGame();
    return;
  }

  loadLevel(currentLevel); // Load the next level
}
window.nextLevel = nextLevel;

function winGame() {
  gameStarted = false;
  winScreen = new Screen(
    "Congratulations!",
    "Play Again",
    startGame,
    bgImage,
    menuImage
  );
}

function loadLevel(level) {
  walls = [];
  monsters = [];
  strawberries = [];

  currentBackground = levelBackgrounds[1];

  if (level === 1) {
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

    monsters = [
      new MonsterVertical(220, 501, 3, 400, 560, dragonImage, 70, 65),
      new MonsterHorizontal(260, 50, 3, 220, 590, dragonImage, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, strawberryImg),
      new Collectibles(400, 400, 50, 50, strawberryImg),
      new Collectibles(70, 280, 50, 50, strawberryImg),
    ];

    princess.resetPosition(580, 580);
  } else if (level === 2) {
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

    monsters = [
      new MonsterVertical(220, 501, 3, 400, 560, dragonImage, 70, 65),
      new MonsterHorizontal(260, 50, 3, 220, 590, dragonImage, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, strawberryImg),
      new Collectibles(400, 400, 50, 50, strawberryImg),
      new Collectibles(70, 280, 50, 50, strawberryImg),
    ];

    princess.resetPosition(600, 600);

    currentBackground = levelBackgrounds[2];
  } else if (level === 3) {
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

    monsters = [
      new MonsterVertical(220, 501, 3, 400, 560, dragonImage, 70, 65),
      new MonsterHorizontal(260, 50, 3, 220, 590, dragonImage, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, strawberryImg),
      new Collectibles(400, 400, 50, 50, strawberryImg),
      new Collectibles(70, 280, 50, 50, strawberryImg),
    ];

    princess.resetPosition(600, 600);

    currentBackground = levelBackgrounds[3];
  } else if (level === 4) {
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

    monsters = [
      new MonsterVertical(220, 501, 3, 400, 560, dragonImage, 70, 65),
      new MonsterHorizontal(260, 50, 3, 220, 590, dragonImage, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, strawberryImg),
      new Collectibles(400, 400, 50, 50, strawberryImg),
      new Collectibles(70, 280, 50, 50, strawberryImg),
    ];

    princess.resetPosition(600, 600);

    currentBackground = levelBackgrounds[4];
  }
}

window.loadLevel = loadLevel;

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

  winScreen = null;

  currentLevel = 1;

  loadLevel(currentLevel);

  strawberryCount = 0;
}
window.startGame = startGame;

function drawLivesCounter() {
  push();
  textSize(16);
  textStyle(BOLD);
  fill(255); // text color
  textAlign(RIGHT, TOP);
  text("Lives: " + princessLives, 602, 24); //the lives text
  pop();
}

function drawStrawberryCounter() {
  push();
  image(strawberryImg, 615, 12, 40, 40);
  textSize(16);
  textStyle(BOLD);
  fill(255);
  textAlign(RIGHT, TOP);

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

function loseLife() {
  princessLives--;
  princess.resetPosition(580, 580);
}
window.loseLife = loseLife;

function collidesMonster(nextX, nextY) {
  for (let monster of monsters) {
    if (monster.collides(nextX, nextY, princess.width, princess.height)) {
      return true;
    }
  }
  return false;
}
window.collidesMonster = collidesMonster;
