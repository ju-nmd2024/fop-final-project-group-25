export default class Button {
  constructor(x, y, width, height, text, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text; // text in the button
    this.onClick = onClick;
  }

  draw() {
    // Draws the button
    fill(100, 150, 255); // Button background color
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    // text in the button so that its in the center and at a specific position
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.text, this.x, this.y);
  }
}
