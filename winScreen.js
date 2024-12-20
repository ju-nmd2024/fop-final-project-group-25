export default class WinScreen {
  constructor(
    message,
    instructions,
    buttonText,
    buttonAction,
    bgImage,
    menuImage
  ) {
    this.message = message; // Message to display on the screen
    this.button = new Button(350, 420, 150, 50, buttonText, buttonAction);
    this.bgImage = bgImage;
    this.menuImage = menuImage;
    this.instructions = instructions;
  }

  draw() {
    image(this.bgImage, 0, 0, 700, 700);
    image(this.menuImage, 150, 180, 400, 320);

    // Draw the message
    textFont("Courier New");
    fill(255); // text
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.message, 350, 260);
    push();
    textFont("Courier New");
    fill(255); // text
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.instructions, 352, 300, 320);
    pop();

    // Draw the button
    this.button.draw();
  }

  onMousePress() {
    //mouse is pressed on the button
    this.button.onMousePress();
  }
}

// Button class draw and button click logic
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
