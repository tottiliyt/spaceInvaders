import Block from "./Block.js"

class Missile extends Block {
  constructor(img, x, y, width, height, dx, dy, wasflying) {
    super(img, x, y, width, height, dx, dy);
    this.dy = -5;
    //check if the missile is after shot
    wasflying = false;
  }

  move(canvasWidth, canvasHeight) {
    super.move(this.dx, this.dy);
    this.handleBoundary(canvasWidth, canvasHeight);
  }

  handleBoundary(canvasWidth, canvasHeight) {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
    }
  }
}
export default Missile;