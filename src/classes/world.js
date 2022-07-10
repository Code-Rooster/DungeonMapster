import { camera } from './camera.js';

export class world {
    constructor(objects) {
        this.objects = objects;
        this.cam = new camera({x: 0, y: 0, z: -10});
    }

    update(world) {
        this.cam.render(world);
    }
}