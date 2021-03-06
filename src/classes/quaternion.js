import { vector3 } from "./vector3.js";

export class quaternion {
    constructor(w, x, y, z) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static identity = new quaternion(1, 0, 0, 0)

    static multiply(q0, q1) {
        let prodW = q0.w * q1.w - q0.x * q1.x - q0.y * q1.y - q0.z * q1.z;
        let prodX = q0.w * q1.x + q0.x * q1.w + q0.y * q1.z - q0.z * q1.y;
        let prodY = q0.w * q1.y - q0.x * q1.z + q0.y * q1.w + q0.z * q1.x;
        let prodZ = q0.w * q1.z + q0.x * q1.y - q0.y * q1.x + q0.z * q1.w;

        return new quaternion(prodW, prodX, prodY, prodZ);
    }

    normalize() {
        let magnitude = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        this.w /= magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;
    }

    normalized() {
        let magnitude = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        let normW = this.w / magnitude;
        let normX = this.x / magnitude;
        let normY = this.y / magnitude;
        let normZ = this.z / magnitude;

        return new quaternion(normW, normX, normY, normZ);
    }

    /**
     * @param { radians } angle 
     * @param { vector3 } axis 
     * @returns { quaternion }
     */
    static unitQuatFromAngleAxis(angle, rawAxis) {
        let axis = new vector3(rawAxis.x, rawAxis.y, rawAxis.z);
        axis.normalize();

        let sAngle = Math.sin(angle / 2);

        let unitQuat = new quaternion(Math.cos(angle / 2), axis.x * sAngle, axis.y * sAngle, axis.z * sAngle);
        unitQuat.normalize();

        return unitQuat;
    }

    static quatFromPoint(point) {
        return new quaternion(0, point.x, point.y, point.z);
    }

    get axis() {
        if(this.w != 1) {
            let wComp = Math.sqrt(1 - (this.w * this.w));
            return new vector3(this.x / wComp, this.y / wComp, this.z / wComp);
        } else {
            return new vector3(0, 0, 1);
        }
    }

    get angle() {
        let normQuat = this.normalized()
        return 2 * Math.acos(normQuat.w);
    }

    get inverse() {
        return new quaternion(this.w, -this.x, -this.y, -this.z);
    }
}