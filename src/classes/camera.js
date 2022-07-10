import world from './world.js';

class camera {
    constructor(position) {
        this.pos = position;
    }

    /**
     * @param {world} world 
     */
    render(world) {
        world.objects.forEach(object => {
            object.renderInfos.forEach(renderInfo => {
                renderInfo.points.forEach(point => {
                    console.log(object.name);
                    console.log(point);
                });
            });
        });
    }
}