export default class Screen {
  constructor(message, buttonText, buttonAction) {
    this.message = message; // Message to display on the screen
    this.button = new Button(
      width / 2,
      height / 2 + 100,
      150,
      50,
      buttonText,
      buttonAction
    );
  }

  draw() {
    background(50); // Dark background

    // Draw the message
    fill(255); // text
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.message, width / 2, height / 2 - 60);

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
    fill(100, 150, 255); // Button background color
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    //button text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
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
