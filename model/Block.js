class Block {
    constructor(img, x, y, width, height, dx, dy) {
        this.img = img
        this.x = x
        this.y = y
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }

    //check if two objects collide
    intersects(other) {
        let tw = this.width;
        let th = this.height;
        let rw = other.width;
        let rh = other.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        let tx = this.x;
        let ty = this.y;
        let rx = other.x;
        let ry = other.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return (
            (rw < rx || rw > tx) &&
            (rh < ry || rh > ty) &&
            (tw < tx || tw > rx) &&
            (th < ty || th > ry)
        );
    }

    //move object
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

}

export default Block;