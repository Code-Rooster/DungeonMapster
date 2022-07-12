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
            let r = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2) + Math.pow(point.z, 2));
            let xOffset = (point.x * Math.cos(rotOffsets.z) - point.y * Math.sin(rotOffsets.z))  + posOffsets.x;
            let yOffset = point.x * Math.sin(rotOffsets.z) + point.y * Math.cos(rotOffsets.z) + posOffsets.y;
            let zOffset = posOffsets.z;

            console.log(zOffset);

            newPoints.push({ x: point.x + xOffset, y: point.y + yOffset, z: point.z + zOffset });
        });

        return new renderInfo(newPoints, this.isFilled, this.isClosed, this.parentComposite);
    }
}