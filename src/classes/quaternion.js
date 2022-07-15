import { vector3 } from "./vector3.js";

export class quaternion {
    constructor(w, x, y, z) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

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
}