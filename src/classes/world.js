import { render } from './camera.js';

class world {
    constructor(objects) {
        this.objects = objects;
    }

    update() {
        render(this);
    }
}