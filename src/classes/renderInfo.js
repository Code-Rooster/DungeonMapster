import { composite } from "./composite.js";

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
        let rotUnitQ = this.parentComposite.rotation;

        this.points.forEach(point => {
            let pointQ = { w: 0, x: point.x, y: point.y, z: point.z };
            let rotQInverse = { w: rotUnitQ.w, x: -rotUnitQ.x, y: -rotUnitQ.y, z: -rotUnitQ.z };

            let rotatedQuaternion = this.multiplyQuaternions(this.multiplyQuaternions(rotUnitQ, pointQ), rotQInverse);

            console.log(rotatedQuaternion);

            newPoints.push({ x: rotatedQuaternion.x + posOffsets.x, y: rotatedQuaternion.y + posOffsets.y, z: rotatedQuaternion.z + posOffsets.z });
        });

        return new renderInfo(newPoints, this.isFilled, this.isClosed, this.parentComposite);
    }

    multiplyQuaternions(q0, q1) {
        let qProd = { w: 0, x: 0, y: 0, z: 0}
        qProd.w = q0.w * q1.w - q0.x * q1.x - q0.y * q1.y - q0.z * q1.z;
        qProd.x = q0.w * q1.x + q0.x * q1.w - q0.y * q1.z + q0.z * q1.y;
        qProd.y = q0.w * q1.y + q0.x * q1.z + q0.y * q1.w - q0.z * q1.x;
        qProd.z = q0.w * q1.z - q0.x * q1.y + q0.y * q1.x + q0.x * q1.w;

        return qProd;
    }
}