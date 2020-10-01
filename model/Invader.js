import Block from "./Block.js"

const gameOver = new CustomEvent("gameover");

class Invader extends Block {
    constructor(img, x, y, width, height, dx, dy, canvasWidth) {
        super(img, x, y, width, height, dx, dy);
        //start from random position
        this.x = Math.random() * canvasWidth;
        var rand = Math.random();
        //randomly decide the speed 
        if (rand >= 0.5 && rand < 0.75) {
            this.dy = 1;
        }
        else if (rand >= 0.75) {
            this.dy = 2;
        }

    }

    move(canvasWidth, canvasHeight) {
        var rand = Math.random();
        //randomly move left&right
        if (rand >= 0.5 && rand < 0.55) {
            this.dx = 2;
        }
        else if (rand >= 0.55 && rand < 0.6) {
            this.dx = -2;
        }
        else {
            this.dx = 0;
        }
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
            //if invader reaches the bottom, game over
            document.dispatchEvent(gameOver);
        }
    }
}
export default Invader;