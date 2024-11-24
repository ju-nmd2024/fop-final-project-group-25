import Button from "./button.js";

export default class Screen {
  constructor(message) {
    this.message = message; // Message to display
    this.buttons = []; // empty Array of the buttons
  }

  addButton(x, y, width, height, text, onClick) {
    // to add a new button to the screen
    const button = new Button(x, y, width, height, text, onClick);
    this.buttons.push(button);
  }

  draw() {
    background(50);
    fill(255);

    // Draws the screen message(we should put in theguide to the game)
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.message, width / 2, height / 2 - 60);

    // Draw all buttons
    for (let button of this.buttons) {
      button.draw();
    }
  }

  onMousePress() {
    // Checks if the mouse is pressed on the first button
    //following 3 lines of code are acquired through chatgpt
    if (
      mouseX > this.buttons[0].x - this.buttons[0].width / 2 &&
      mouseX < this.buttons[0].x + this.buttons[0].width / 2 &&
      mouseY > this.buttons[0].y - this.buttons[0].height / 2 &&
      mouseY < this.buttons[0].y + this.buttons[0].height / 2
    ) {
      this.buttons[0].onClick(); // makes the button work onclick
    }

    // Check if the mouse is pressed on the second button
    if (
      mouseX > this.buttons[1].x - this.buttons[1].width / 2 &&
      mouseX < this.buttons[1].x + this.buttons[1].width / 2 &&
      mouseY > this.buttons[1].y - this.buttons[1].height / 2 &&
      mouseY < this.buttons[1].y + this.buttons[1].height / 2
    ) {
      this.buttons[1].onClick();
    }
  }
}
