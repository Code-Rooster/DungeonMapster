import { world } from './world.js';

export class camera {
    /**
     * @param {{x: number, y: number, z: number}} position 3D position
     * @param {{x: radians, y: radians, z: radians}} rotation 3D rotation
     * @param {radians} HFoV horizontal FoV
     * @param {radians} VFoV vertical FoV
     */
    constructor(position, rotation, HFoV, VFoV) {
        this.pos = position;
        this.rot = rotation;
        this.HFoV = HFoV;
        this.VFoV = VFoV;

        /** @type {Canvas} canvas */
        this.canvas = document.getElementById('canvas');

        /** @type {CanvasRenderingContext2D} ctx */
        this.ctx = this.canvas.getContext('2d');
    }

    /** @param {world} world */
    render(world) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        world.composites.forEach(composite => {
            composite.faces.forEach(face => {

                this.ctx.beginPath();

                let firstPoint = face.renderInfo.getTransformedRenderInfo.points.shift();

                let firstCamPoint = this.worldToCamPoint(firstPoint);

                this.ctx.moveTo(firstCamPoint.x, firstCamPoint.y);

                face.renderInfo.getTransformedRenderInfo.points.forEach(point => {
                    let camPoint = this.worldToCamPoint(point);

                    this.ctx.lineWidth = camPoint.lineThickness;

                    this.ctx.lineTo(camPoint.x, camPoint.y);
                });

                this.ctx.closePath();

                this.ctx.stroke();
            });
        });
    }

    /**
     * @param {{x: number, y: number, z: number}} worldPos 
     */
    worldToCamPoint(worldPos) {
        let deltaX = worldPos.x - this.pos.x;
        let deltaY = worldPos.y - this.pos.y;
        let deltaZ = worldPos.z - this.pos.z;

        let canvasWidth = parseFloat(this.canvas.width);
        let canvasHeight = parseFloat(this.canvas.height);

        let screenPos = { 
            x: canvasWidth * (2 * deltaX / (deltaZ * Math.tan(this.VFoV)) + 0.5),
            y: canvasHeight * (2 * deltaY / (deltaZ * Math.tan(this.HFoV)) + 0.5),
            lineThickness: (1 / deltaZ) * ((canvasWidth + canvasHeight) / 100) };

        return screenPos;
    }
}