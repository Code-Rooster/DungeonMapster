import { camera } from './camera.js';
import { composite } from './composite.js';
import { quaternion } from './quaternion.js';
import { vector3 } from './vector3.js';

const canvas = document.getElementById('canvas');

export class world {
    /** @param {composite[]} composites */
    constructor(composites) {
        this.composites = composites;
        this.cam = new camera(new vector3(0, 0, -10), quaternion.unitQuatFromAngleAxis(0, new vector3(0, 1, 0)), Math.PI / 4.5, Math.PI / 4);
    }

    update(world) {
        this.cam.render(world);
    }
}