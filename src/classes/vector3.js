export class vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    normalize() {
        let magnitude = this.magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;
    }

    normalized() {
        let magnitude = this.magnitude;
        let normX = this.x / magnitude;
        let normY = this.y / magnitude;
        let normZ = this.z / magnitude;

        return new vector3(normX, normY, normZ);
    }

    get magnitude(){
        return(Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
    }

    get firstPerpendicularVec() {
        if(this.z != 0) {
            return new vector3(1, 1, -(this.x + this.y) / this.z).normalized();
        } else if(this.y != 0) {
            return new vector3(1, -(this.x + this.z) / this.y, 1).normalized();
        } else if(this.x != 0) {
            return new vector3(-(this.y + this.z) / this.x, 1, 1).normalized();
        } else {
            console.log("vector had no magnitude.");
            return undefined;
        }
    }

    get secondPerpendicularVec() {
        return vector3.crossProduct(this, this.firstPerpendicularVec).normalized();
    }

    /**
     * 
     * @param { vector3 } v0 
     * @param { vector3 } v1 
     */
    static dotProduct(v0, v1) {
        return(v0.x * v1.x + v0.y * v1.y + v0.z * v1.z);
    }

    /**
     * 
     * @param { vector3 } v0 
     * @param { vector3 } v1 
     */
     static crossProduct(v0, v1) {
        return new vector3(v0.y * v1.z - v0.z * v1.y, v0.z * v1.x - v0.x * v1.z, v0.x * v1.y - v0.y * v1.x);
    }

    /**
     * 
     * @param { vector3 } v0 
     * @param { vector3 } v1 
     */
    static subtract(v0, v1) {
        return new vector3(v0.x - v1.x, v0.y - v1.y, v0.z - v1.z);
    }

    /**
     * 
     * @param { vector3 } v0 
     * @param { vector3 } v1 
     */
     static add(v0, v1) {
        return new vector3(v0.x + v1.x, v0.y + v1.y, v0.z + v1.z);
    }
}