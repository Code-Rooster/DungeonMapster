/**
 * @description a hexagon object
 */
export class hexagon {
    /**
     * @param {number} topWidth - the width of the top side of the hexagon
     * @param {number} height - the height of the hexagon
     * @param {radians} angle - the angle between the top and adjacent sides of the hexagon
     * @param {number} sCoord - the S coordinate of the hexagon
     * @param {number} rCoord - the R coordinate of the hexagon
     */
    constructor(topWidth, height, angle, sCoord, rCoord) {
        this.topWidth = topWidth;
        this.height = height;
        this.angle = angle;
        this.s = sCoord;
        this.r = rCoord;
        this.q = sCoord + rCoord;
    }

    /**
     * @param {skeletonHexagon} skelHex - a hexagon with no coordinates
     * @param {number} sCoord - the S coordinate of the new hexagon
     * @param {number} rCoord - the R coordinate of the new hexagon
     */
    static hexFromSkel(skelHex, sCoord, rCoord) {
        return new hexagon(skelHex.topWidth, skelHex.height, skelHex.angle, sCoord, rCoord);
    }

    get cartCoords() {
        return { x: (this.q), y: ((this.s - this.r) / 2) };
    }
}

/**
 * @description a barebones hexagon without coordinates
 */
export class skeletonHexagon {
    /**
     * @param {number} topWidth - the width of the top side of the hexagon
     * @param {number} height - the height of the hexagon
     * @param {radians} angle - the angle between the top and adjacent sides of the hexagon
     */
    constructor(topWidth, height, angle) {
        this.topWidth = topWidth;
        this.height = height;
        this.angle = angle;
    }
}