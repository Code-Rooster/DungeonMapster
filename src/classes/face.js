import { renderInfo } from "./renderInfo.js";

export class face {
    /** 
     * @param {{ x: number, y: number, z: number }[]} points 
     */
    constructor(points, parentComposite) {
        this.points = points;
        /** @type {renderInfo} */
        this.renderInfo = new renderInfo(points, false, true, parentComposite);
    }
}