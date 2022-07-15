import { composite } from "./composite.js";
import { quaternion } from "./quaternion.js";

export class renderInfo {
    /**
     * @param {{ x: number, y: number, z: number }[]} points
     * @param {boolean} isFilled 
     * @param {boolean} isClosed 
     * @param {composite} parentComposite
     */
    constructor(points, isFilled, isClosed, parentComposite) {
        this.points = points;
        this.isFilled = isFilled;
        this.isClosed = isClosed;
        this.parentComposite = parentComposite;
    }

    get getTransformedRenderInfo() {
        let newPoints = [];

        let posOffsets = this.parentComposite.position;
        let rotUnitQ = new quaternion(this.parentComposite.rotation.w, this.parentComposite.rotation.x,
            this.parentComposite.rotation.y, this.parentComposite.rotation.z);
        let invUnitQ = new quaternion(rotUnitQ.w, -rotUnitQ.x, -rotUnitQ.y, -rotUnitQ.z);
        rotUnitQ.normalize();

        this.points.forEach(point => {
            let posQuat = new quaternion(0, point.x, point.y, point.z);

            let rotatedQuaternion = quaternion.multiply(rotUnitQ, posQuat);
            rotatedQuaternion = quaternion.multiply(rotatedQuaternion, invUnitQ);

            console.log(rotatedQuaternion);

            newPoints.push({ x: rotatedQuaternion.x, y: rotatedQuaternion.y, z: rotatedQuaternion.z });
        });

        return new renderInfo(newPoints, this.isFilled, this.isClosed, this.parentComposite);
    }
}