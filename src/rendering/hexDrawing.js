import { hexagon, skeletonHexagon } from "../classes/hexagon.js";

/**
 * @description draws the outline of a hexagon
 * @param {context2D} ctx - the context of the canvas on which to draw the hexagon
 * @param {cartCoords} cartCoords - the cartesian coords at which to render the hexagon
 * @param {skeletonHexagon} skelHex - the skeleton hexagon to render
 * @param {number} outlineWidth - the width of the outline
 * @param {color} outlineColor - the outline color of the hexagon
 */
export function drawHexOutline(ctx, cartCoords, skelHex, outlineWidth, outlineColor) {
    let initX = cartCoords.x - (skelHex.topWidth / 2);
    let initY = cartCoords.y - (skelHex.height / 2);
    
    let x = initX;
    let y = initY;

    let a = skelHex.height / 2;
    let b = a * Math.tan(skelHex.angle);

    ctx.beginPath();
    ctx.moveTo(x, y);

    x += skelHex.topWidth;
    ctx.lineTo(x, y);

    x -= b;
    y += a;
    ctx.lineTo(x, y);

    x += b;
    y += a;
    ctx.lineTo(x, y);

    x -= skelHex.topWidth;
    ctx.lineTo(x, y);

    x += b;
    y -= a;
    ctx.lineTo(x, y);

    ctx.lineTo(initX, initY);

    // this last one makes sure that there is not a gap between the first and final points
    ctx.lineTo(initX + skelHex.topWidth / 2, initY);

    ctx.lineWidth = outlineWidth;

    ctx.strokeStyle = outlineColor;
    ctx.stroke();
}