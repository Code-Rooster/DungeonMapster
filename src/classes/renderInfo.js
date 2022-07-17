import { composite } from "./composite.js";
import { quaternion } from "./quaternion.js";
import { vector3 } from "./vector3.js";

export class renderInfo {
    /**
     * @param {{ vector3 }[]} points
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

            newPoints.push(new vector3(rotatedQuaternion.x + posOffsets.x, rotatedQuaternion.y + posOffsets.y, rotatedQuaternion.z + posOffsets.z));
        });

        return new renderInfo(newPoints, this.isFilled, this.isClosed, this.parentComposite);
    }
}