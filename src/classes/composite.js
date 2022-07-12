import { shape } from './shape.js'

export class composite {
    /**
     * @param {string} name 
     * @param {number} id 
     * @param {{ x: number, y: number, z: number }} initPosition 
     * @param {{x: radians, y: radians, z: radians }} rotation 
     * @param { points[][] } points2D 
     */
    constructor(name, id, initPosition, rotation, points2D) {
        this.name = name;
        this.id = id;
        this.position = initPosition;
        this.rotation = rotation;

        let newShapes = [];

        points2D.forEach(points => {
            let newShape = this.createShape(points);
            newShapes.push(newShape);
        });

        this.shapes = newShapes;
    }

    changeRot(newRot) {
        this.rotation = newRot;
    }

    changePos(newPos) {
        this.position = newPos;
    }

    translatePos(units) {
        this.position = { x: this.position.x + units.x, y: this.position.y + units.y, z: this.position.z + units.z};
    }

    createShape(points) {
        return new shape(points, this);
    }
}