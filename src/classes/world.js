import { camera } from './camera.js';
import { composite } from './composite.js';

const canvas = document.getElementById('canvas');

export class world {
    /** @param {composite[]} composites */
    constructor(composites) {
        this.composites = composites;
        this.cam = new camera({x: 0, y: 0, z: -10}, {w: 0, x: 0, y: 0, z: 1}, Math.PI / 4.5, Math.PI / 4);
    }

    update(world) {
        this.cam.render(world);
    }
}