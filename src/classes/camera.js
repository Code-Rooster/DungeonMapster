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
     * @param {vector3} rotatedPos 
     */
    worldToCamPoint(worldPos) {
        let rotatedPos = quaternion.multiply(this.rot.inverse, quaternion.quatFromPoint(worldPos));
        rotatedPos = quaternion.multiply(rotatedPos, this.rot);

        let firstPerpendicularVecRot = quaternion.unitQuatFromAngleAxis(Math.PI / 2, new vector3(1, 0, 0));
        let secondPerpendicularVecRot = quaternion.unitQuatFromAngleAxis(Math.PI / 2, new vector3(0, 1, 0));
        let firstPerpendicularVec = quaternion.multiply(firstPerpendicularVecRot, this.rot);
        firstPerpendicularVec = quaternion.multiply(firstPerpendicularVec, firstPerpendicularVecRot.inverse).normalized();
        let secondPerpendicularVec = quaternion.multiply(secondPerpendicularVecRot, this.rot);
        secondPerpendicularVec = quaternion.multiply(secondPerpendicularVec, secondPerpendicularVecRot.inverse).normalized();

        let firstPerpendicularAxis = firstPerpendicularVec.axis;
        let secondPerpendicularAxis = secondPerpendicularVec.axis;

        let camAxis = this.rot.axis;

        let canvasWidth = parseFloat(this.canvas.width);
        let canvasHeight = parseFloat(this.canvas.height);

        let posDelta = vector3.subtract(rotatedPos, this.pos);

        let theta = - Math.acos(vector3.dotProduct(camAxis, posDelta) / (camAxis.magnitude * posDelta.magnitude));
        let alpha = - Math.acos(vector3.dotProduct(firstPerpendicularAxis, posDelta) / (firstPerpendicularAxis.magnitude * posDelta.magnitude));
        let gamma = - Math.acos(vector3.dotProduct(secondPerpendicularAxis, posDelta) / (secondPerpendicularAxis.magnitude * posDelta.magnitude));

        let h = Math.sqrt(Math.pow(rotatedPos.x - this.pos.x, 2) + Math.pow(rotatedPos.y - this.pos.y, 2) + Math.pow(rotatedPos.z - this.pos.z, 2));

        let thetaLength = h * Math.cos(theta);
        let alphaLength = h * Math.cos(alpha);
        let gammaLength = h * Math.cos(gamma);

        if(true) {
            let screenPos = { 
                x: canvasWidth * (1 - ((alphaLength / (thetaLength) + 0.5))),
                y: canvasHeight * (1 - ((gammaLength / (thetaLength) + 0.5))),
                lineThickness: (1 / thetaLength) * ((canvasWidth + canvasHeight) / 100) };

            return screenPos;
        } else {
            return { x: 0, y: 0, lineThickness: 0 };
        }
    }
}