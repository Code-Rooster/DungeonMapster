import { camera } from './camera.js';
import { composite } from './composite.js';

const canvas = document.getElementById('canvas');

export class world {
    /** @param {composite[]} composites */
    constructor(composites) {
        this.composites = composites;
        this.cam = new camera({x: 0, y: 0, z: -10}, {x: 0, y: 0, z: 0}, Math.PI / 3, (Math.PI / 3));
    }

    update(world) {
        this.cam.render(world);
    }
}