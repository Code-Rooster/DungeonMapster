import { face } from './face.js'

export class composite {
    /**
     * @param {string} name 
     * @param {number} id 
     * @param {{ x: number, y: number, z: number }} initPosition 
     * @param {quaternion} rotation 
     * @param { points[][] } points2D 
     */
    constructor(name, id, initPosition, rotation, points2D) {
        this.name = name;
        this.id = id;
        this.position = initPosition;
        this.rotation = rotation;

        let newFaces = [];

        points2D.forEach(points => {
            let newFace = this.createFace(points);
            newFaces.push(newFace);
        });

        this.faces = newFaces;
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

    createFace(points) {
        return new face(points, this);
    }
}