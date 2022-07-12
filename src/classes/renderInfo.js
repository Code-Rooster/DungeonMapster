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
        let rotOffsets = this.parentComposite.rotation;

        console.log(this.parentComposite.position);

        this.points.forEach(point => {
            let rotatedX = ((point.x) * Math.cos(rotOffsets.z) - (point.y) * Math.sin(rotOffsets.z));
            let rotatedY = (point.x) * Math.sin(rotOffsets.z) + (point.y) * Math.cos(rotOffsets.z);

            newPoints.push({ x: rotatedX + posOffsets.x, y: rotatedY + posOffsets.y, z: point.z + posOffsets.z });
        });

        return new renderInfo(newPoints, this.isFilled, this.isClosed, this.parentComposite);
    }
}