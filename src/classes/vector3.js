export class vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        let magnitude = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y);
        this.w /= magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
    }
}