import { quaternion } from './quaternion.js';
import { vector3 } from './vector3.js';
import { world } from './world.js';

export class camera {
    /**
     * @param {vector3} position 3D position
     * @param {quaternion} rotation 3D rotation
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
     * @param {vector3} worldPos 
     */
    worldToCamPoint(worldPos) {
        let camAxis = this.rot.axis;

        let canvasWidth = parseFloat(this.canvas.width);
        let canvasHeight = parseFloat(this.canvas.height);

        console.log(camAxis);

        let theta = Math.acos(vector3.dotProduct(camAxis, vector3.subtract(worldPos, this.pos)) / (camAxis.magnitude * Math.sqrt(Math.pow(worldPos.x, 2) + Math.pow(worldPos.y, 2) + Math.pow(worldPos.z, 2))));
        let alpha = Math.acos(vector3.dotProduct(camAxis.firstPerpendicularVec, vector3.subtract(worldPos, this.pos).normalized()) / (camAxis.firstPerpendicularVec.magnitude * Math.sqrt(Math.pow(worldPos.x - this.pos.x, 2) + Math.pow(worldPos.y - this.pos.y, 2) + Math.pow(worldPos.z - this.pos.z, 2))));
        let gamma = Math.acos(vector3.dotProduct(camAxis.secondPerpendicularVec, vector3.subtract(worldPos, this.pos).normalized()) / (camAxis.secondPerpendicularVec.magnitude * Math.sqrt(Math.pow(worldPos.x - this.pos.x, 2) + Math.pow(worldPos.y - this.pos.y, 2) + Math.pow(worldPos.z - this.pos.z, 2))));

        let h = Math.sqrt(Math.pow(worldPos.x - this.pos.x, 2) + Math.pow(worldPos.y - this.pos.y, 2) + Math.pow(worldPos.z - this.pos.y, 2));

        let thetaLength = h * Math.cos(theta);
        let alphaLength = h * Math.cos(alpha);
        let gammaLength = h * Math.cos(gamma);

        console.log("dp: " + vector3.dotProduct(camAxis.firstPerpendicularVec, vector3.subtract(worldPos, this.pos)) / (camAxis.firstPerpendicularVec.magnitude * Math.sqrt(Math.pow(worldPos.x, 2) + Math.pow(worldPos.y, 2) + Math.pow(worldPos.z, 2))));
        console.log(camAxis.firstPerpendicularVec);
        console.log(camAxis.secondPerpendicularVec);
        console.log("theta: " + theta + ", alpha: " + alpha + ", gamma: " + gamma);
        console.log("xpos: " + canvasWidth * (alphaLength / (thetaLength)) + ", ypos: " + canvasHeight * (gammaLength / (thetaLength)))

        let screenPos = { 
            x: canvasWidth * (alphaLength / (thetaLength)),
            y: canvasHeight * (gammaLength / (thetaLength)),
            lineThickness: (1 / thetaLength) * ((canvasWidth + canvasHeight) / 100) };

        return screenPos;
    }
}