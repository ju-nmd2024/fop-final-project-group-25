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

let princessUpImage;
let princessDownImage;
let princessLeftImage;
let princessRightImage;
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
let mushroomImg;
let snowflakeImg;
let collectiblesImg;
let strawberryImg;
let flowerImg;
let castleImg;
<<<<<<< HEAD
let castle = null;
=======
>>>>>>> 1d76b8745c768026d07f2e0ec8a94467762ebd07

let dragonSummer;
let dragonAutumn;
let dragonWinter;
let dragonSpring;

let levelBackgrounds = {};
let currentBackground;
let currentLevel = 1;

let collecting = 0; //variable to count the lives for increasing with collectibles

function preload() {
  // Loading images
  princessUpImage = loadImage("princess-back.png");
  princessDownImage = loadImage("princess-front.png");
  princessLeftImage = loadImage("princess-left.png");
  princessRightImage = loadImage("princess-right.png");

  bgImage = loadImage("blurry-background.png");
  menuImage = loadImage("start-screen.png");
  menu1Image = loadImage("repeat-screen.png");
  dragonImage = loadImage("monster.png");
  livesBg = loadImage("livesBg.png");
  strawberryImg = loadImage("Strawberry.png");
  mushroomImg = loadImage("mushroom2.png");
  snowflakeImg = loadImage("snowflake.png");
  collectiblesImg = loadImage("collectibles.png");
  flowerImg = loadImage("flower.png");
  castleImg = loadImage("castle.png");

  dragonSummer = loadImage("monster-summer2.png");
  dragonAutumn = loadImage("monster-autumn2.png");
  dragonWinter = loadImage("monster-winter.png");
  dragonSpring = loadImage("monster-spring2.png");

  levelBackgrounds[1] = loadImage("summer-map.png");
  levelBackgrounds[2] = loadImage("autumnMap.png");
  levelBackgrounds[3] = loadImage("winter-map.png");
  levelBackgrounds[4] = loadImage("spring-map2.png");
}
window.preload = preload;

function setup() {
  createCanvas(700, 700);

  if (menuImage && bgImage) {
    startScreen = new Screen(
      "Royal Escape",
      "Use arrow keys to move. The goal is for the princess to get all of the collectibles, avoid monsters and enter the castle on the last level.",
      "Start",
      startGame,
      bgImage,
      menuImage
    );
  }

  princess = new Princess(580, 580, 55, 85, 5, {
    up: princessUpImage,
    down: princessDownImage,
    left: princessLeftImage,
    right: princessRightImage,
  });

  loadLevel(currentLevel);
}
window.setup = setup;

function draw() {
  clear(); // Removes the blue path princess leaves

  if (gameStarted) {
    if (currentBackground) {
      image(currentBackground, 0, 0, 700, 700);
    }
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

    if (currentLevel === 4 && castle) {
      image(castle.img, castle.x, castle.y, castle.width, castle.height); //draws the castle in level 4
      let princessRight = princess.x + princess.width;
      let princessBottom = princess.y + princess.height;

      let castleRight = castle.x + castle.width;
      let castleBottom = castle.y + castle.height;
      if (
        princess.x < castleRight &&
        princessRight > castle.x &&
        princess.y < castleBottom &&
        princessBottom > castle.y
      ) {
        winGame();
        return;
      }
    }

    if (currentLevel === 1 && princess.x <= 140 && princess.y <= 5) {
      nextLevel();
    } else if (currentLevel === 2 && princess.x >= 340 && princess.y <= 10) {
      nextLevel();
    } else if (currentLevel === 3 && princess.x >= 205 && princess.y <= 10) {
      nextLevel();
    } else if (currentLevel === 4 && princess.x >= 300 && princess.y <= 10) {
      winGame();
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
    // Draw appropriate screen if game is not running
    if (startScreen) {
      startScreen.draw();
    }
    if (repeatScreen) {
      repeatScreen.draw();
    }
    if (winScreen) {
      winScreen.draw();
    }
  }
}

window.draw = draw;

function nextLevel() {
  currentLevel++;

  // if (currentLevel > 4) {
  // winGame();
  // return;
  //}

  loadLevel(currentLevel); // Load the next level
}
window.nextLevel = nextLevel;

function winGame() {
<<<<<<< HEAD
  gameStarted = false; //stops the game
=======
  gameStarted = false;
  walls = [];
  monsters = [];
  strawberries = [];
  currentBackground = null;
>>>>>>> 1d76b8745c768026d07f2e0ec8a94467762ebd07
  winScreen = new WinScreen(
    "Congratulations!",
    "You have successfully helped the princess find her way home!",
    "Play Again",
    startGame,
    bgImage,
    menuImage
  );
}
window.winGame = winGame;

function loadLevel(level) {
  walls = [];
  monsters = [];
  strawberries = [];

  currentBackground = levelBackgrounds[level];

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
      new MonsterVertical(220, 501, 2, 400, 560, dragonSummer, 70, 65),
      new MonsterHorizontal(260, 50, 1.5, 220, 590, dragonSummer, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, strawberryImg),
      new Collectibles(400, 400, 50, 50, strawberryImg),
      new Collectibles(70, 280, 50, 50, strawberryImg),
      new Collectibles(590, 120, 50, 50, strawberryImg),
    ];

    princess.resetPosition(580, 580);
  } else if (level === 2) {
    walls = [
      new Wall(0, 0, 370, 35),
      new Wall(0, 0, 35, 700),
      new Wall(0, 670, 67, 35),
      new Wall(175, 670, 500, 35),
      new Wall(205, 550, 55, 145),
      new Wall(205, 510, 216, 55),
      new Wall(30, 335, 245, 50),
      new Wall(157, 158, 360, 55),
      new Wall(380, 188, 55, 150),
      new Wall(400, 239, 160, 50),
      new Wall(407, 284, 300, 55),
      new Wall(407, 284, 300, 55),
      new Wall(670, 20, 55, 680),
      new Wall(560, 465, 300, 45),
      new Wall(480, 0, 220, 33),
      new Wall(492, 10, 208, 48),
    ];

    monsters = [
      new MonsterVertical(550, 50, 1.1, 50, 200, dragonAutumn, 70, 65),
      new MonsterHorizontal(300, 590, 1, 300, 430, dragonAutumn, 70, 65), //monsterlowest?
      new MonsterHorizontal(330, 370, 1.5, 330, 570, dragonAutumn, 70, 65),
    ];

    strawberries = [
      new Collectibles(40, 600, 50, 50, mushroomImg),
      new Collectibles(600, 520, 50, 50, mushroomImg),
      new Collectibles(100, 400, 50, 50, mushroomImg),
      new Collectibles(150, 220, 50, 50, mushroomImg),
      new Collectibles(290, 90, 50, 50, mushroomImg),
      new Collectibles(620, 70, 50, 50, mushroomImg),
    ];

    princess.resetPosition(100, 680);

    currentBackground = levelBackgrounds[2];
  } else if (level === 3) {
    walls = [
      new Wall(0, 0, 205, 32), // Top Vertical wall
      new Wall(0, 0, 32, 700), // Middle Horizontal wall
      new Wall(0, 672, 368, 32), // Middle long vertical wall
      new Wall(0, 287, 80, 50), // Left side wall
      new Wall(321, 0, 383, 32), // Right side wall
      new Wall(448, 0, 50, 160), // Bottom wall
      new Wall(672, 0, 32, 700), // Bottom vertical wall
      new Wall(672, 0, 32, 700), // Top wall
      new Wall(271, 146, 50, 145), // Right short vertical wall
      new Wall(227, 287, 480, 50), // Middle short horizontal wall
      new Wall(223, 287, 50, 256), //Tiny top horizontal wall
      new Wall(223, 496, 110, 50),
      new Wall(480, 464, 50, 240),
      new Wall(480, 673, 230, 32),
      new Wall(160, 144, 110, 50),
      new Wall(492, 10, 208, 48),
    ];

    monsters = [
      new MonsterVertical(136, 386, 2, 210, 610, dragonWinter, 70, 65),
      new MonsterHorizontal(350, 356, 1.1, 350, 600, dragonWinter, 70, 65),
      new MonsterVertical(516, 75, 1.1, 75, 225, dragonWinter, 70, 65),
    ];

    strawberries = [
      new Collectibles(303, 366, 50, 50, snowflakeImg),
      new Collectibles(580, 611, 50, 50, snowflakeImg),
      new Collectibles(57, 551, 50, 50, snowflakeImg),
      new Collectibles(190, 217, 50, 50, snowflakeImg),
      new Collectibles(610, 75, 50, 50, snowflakeImg),
      new Collectibles(55, 78, 50, 50, snowflakeImg),
    ];

    princess.resetPosition(400, 680);

    currentBackground = levelBackgrounds[3];
  } else if (level === 4) {
    image(castleImg, 300, 300);
    walls = [
      new Wall(0, 0, 222, 30), // Top Vertical wall
      new Wall(0, 0, 30, 704), // Middle Horizontal wall
      new Wall(0, 511, 511, 50), // Middle long vertical wall
      new Wall(0, 672, 208, 32), // Left side wall
      new Wall(176, 159, 530, 50), // Right side wall
      new Wall(319, 113, 50, 90), // Bottom wall
      new Wall(176, 159, 50, 224), // Bottom vertical wall
      new Wall(672, 161, 35, 550), // Top wall
      new Wall(577, 335, 100, 50), // Right short vertical wall
      new Wall(383, 335, 50, 190), // Middle short horizontal wall
      new Wall(321, 673, 370, 35), //Tiny top horizontal wall
      new Wall(492, 10, 208, 48), //collectibles wall
    ];

    monsters = [
      new MonsterVertical(520, 501, 1.3, 400, 560, dragonSpring, 70, 65),
<<<<<<< HEAD
      new MonsterVertical(240, 350, 1.3, 210, 380, dragonSpring, 70, 65), // the one that doesnt move
=======
      new MonsterVertical(240, 350, 1.2, 210, 380, dragonSpring, 70, 65), // the one that doesnt move
>>>>>>> 1d76b8745c768026d07f2e0ec8a94467762ebd07
      new MonsterHorizontal(40, 40, 1, 40, 390, dragonSpring, 70, 65), //needs to be moved
    ];

    strawberries = [
      new Collectibles(65, 600, 40, 40, flowerImg),
      new Collectibles(410, 260, 40, 40, flowerImg),
      new Collectibles(70, 280, 40, 40, flowerImg),
      new Collectibles(630, 75, 40, 40, flowerImg),
      new Collectibles(580, 215, 40, 40, flowerImg),
    ];

    princess.resetPosition(280, 600);
    //created an object literal to implement an image with specific positions and size taht are later used in the if statement for completing the game found here:https://playcode.io/javascript/object-literal
    castle = { x: 300, y: 30, width: 70, height: 70, img: castleImg };
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
  image(collectiblesImg, 615, 12, 40, 40);
  textSize(16);
  textStyle(BOLD);
  fill(255);
  textAlign(RIGHT, TOP);

  text(`: ${strawberryCount}`, 680, 24);
  //increases by 1 life is she collects more then 7 collectibles
  if (strawberryCount >= collecting + 7) {
    princessLives++;
    collecting += 7;
  }
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
  if (currentLevel === 1) {
    princess.resetPosition(580, 580);
  } else if (currentLevel === 2) {
    princess.resetPosition(100, 580);
  } else if (currentLevel === 3) {
    princess.resetPosition(400, 580);
  } else if (currentLevel === 4) {
    princess.resetPosition(280, 580);
  }
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
