import Block from "./Block.js"

const addMissile = new CustomEvent("addMissile");

class Tank extends Block {
  constructor(img, x, y, width, height, dx, dy) {
    super(img, x, y, width, height, dx, dy);
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }
  //change the speed after press key
  keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = 5;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = -5;
    }
    if (e.key === "Up" || e.key === "ArrowUp") {
      this.dy = -5;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      this.dy = 5;
    }
  }
  //zero the speed after release key
  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = 0;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = 0;
    }
    if (e.key === "Up" || e.key === "ArrowUp") {
      this.dy = 0;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      this.dy = 0;
    }
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
      this.y = canvasHeight - this.height;
      //add missile if tank reach the top of canvas
      document.dispatchEvent(addMissile);
    } else if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
    }
  }
}
export default Tank;