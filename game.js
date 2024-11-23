import { Princess } from "./character.js";

let walls = [];
let princess;

function setup() {
  createCanvas(400, 400);
  // Define the maze walls as arrays [x, y, w, h]
  walls = [
    [100, 0, 20, 300], // Vertical wall
    [200, 100, 150, 20], // Horizontal wall
    [300, 200, 20, 150],//vertical
    [0, 390, 400, 30], // Bottom wall
    [0, 0, 20, 400],//left wall vertical
    [400, 50, 20, 350]//right wall vertical
    
  ];

  // Initialize the princess character
  princess = new Princess(50, 50, 20, 20, 3);
}

function draw() {
  background(220);
  // Draw the maze walls
  drawWalls();
  // Draw and move the princess
  princess.draw();
  princess.move(walls);
}

function drawWalls() {
  fill(0);
  for (let wall of walls) {
    rect(wall[0], wall[1], wall[2], wall[3],wall[4],wall[5]); // Access wall properties using array indices
  }
}
