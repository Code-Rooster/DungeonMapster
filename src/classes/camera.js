import { world } from './world.js';

export class camera {
    /**
     * @param {{x: number, y: number, z: number}} position 
     */
    constructor(position) {
        this.pos = position;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * @param {world} world 
     */
    render(world) {
        console.log(this.ctx);
        world.objects.forEach(object => {
            object.renderInfos.forEach(renderInfo => {
                renderInfo.points.forEach(point => {
                    console.log(object.name);
                    console.log(point);
                });
            });
        });
    }

    /**
     * @param {{x: number, y: number, z: number}} worldPos 
     */
    worldToCamPoint(worldPos) {
        let zOffset = this.pos.z - worldPos.z;


    }
}