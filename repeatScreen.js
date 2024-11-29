export default class RepeatScreen {
  constructor(message, buttonText, buttonAction, bgImage, menuImage) {
    this.message = message; // Message to display on the screen
    this.button = new Button(350, 420, 150, 50, buttonText, buttonAction);
    this.bgImage = bgImage;
    this.menuImage = menuImage;
  }

  draw() {
    image(this.bgImage, 0, 0, 700, 700);
    image(this.menuImage, 150, 180, 400, 320);
    //background(50); // Dark background

    // Draw the message
    textFont("Courier New");
    fill(255); // Text color
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.message, 350, 240, 350);

    // Draw the button
    this.button.draw();
  }

  onMousePress() {
    //mouse is pressed on the button
    this.button.onMousePress();
  }
}
// Button class drawing and click logic
class Button {
  constructor(x, y, width, height, text, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClick = onClick; //to call when button is pressed
  }

  draw() {
    // button
    strokeWeight(1);
    stroke(107, 73, 43);
    fill(86, 180, 179); // Button background color
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 10);

    // Draw the button text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text(this.text, this.x, this.y);
  }

  onMousePress() {
    // Check if the mouse is within the button's size and  onClick
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    ) {
      this.onClick(); //when pressed
    }
  }
}
