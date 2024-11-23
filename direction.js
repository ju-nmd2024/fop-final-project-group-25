export default class Direction {
  turnLeft() {
    this.x = -1;
    this.y = 0;
  }

  turnRight() {
    this.x = 1;
    this.y = 0;
  }

  turnUp() {
    this.x = 0;
    this.y = -1;
  }

  turnDown() {
    this.x = 0;
    this.y = 1;
  }
}
