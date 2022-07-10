import { drawHexOutline } from "./hexDrawing.js";
import { hexagon } from "../classes/hexagon.js";
import { skeletonHexagon } from "../classes/hexagon.js";

const canvas = document.getElementById("hexCanvas");
const bgCan = document.getElementById("bgCanvas");
const ctx = canvas.getContext('2d');
const bgCtx = bgCan.getContext('2d');

const rowSlider = document.getElementById("rowSlider");
const columnSlider = document.getElementById("columnSlider");
const zoomSlider = document.getElementById("zoomSlider");

const hexDiv = document.getElementById("hexDiv");

var topWidth = 50;
var hexHeight = 50;
var angle = 135;
var skelHex = new skeletonHexagon(topWidth, hexHeight, angleToRad(angle));

var rows = 1;
var columns = 1;

window.onresize = redrawCanvas;
window.onload = redrawCanvas;

rowSlider.oninput = function() {
    rows = parseInt(this.value, 10);
    redrawCanvas();
}

columnSlider.oninput = function() {
    columns = parseInt(this.value, 10);
    redrawCanvas();
}

zoomSlider.oninput = function(){
    redrawCanvas();
}

function redrawCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    bgCan.width = window.innerWidth;
    bgCan.height = window.innerHeight;

    drawGrid(skelHex, rows, columns);
}

function getScale() {
    return 2 / (1 + Math.pow(Math.E, -0.5 * parseInt(zoomSlider.value, 10)));
}

function drawGrid(baseHex, rows, columns) {
    let scale = getScale();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgCtx.fillStyle = "#19181A";
    bgCtx.fillRect(0, 0, canvas.width, canvas.height);

    let offset = getOffset(rows, columns, baseHex.topWidth * scale, baseHex.height * scale);

    for (let s = 0; s < rows; s++) {
        for (let r = 0; r < columns; r++) {
            let hex = new hexagon(baseHex.topWidth * scale, baseHex.height * scale, baseHex.angle, s, r);
            var baseCoords = { x: hex.cartCoords.x, y: hex.cartCoords.y };

            baseCoords.x *= -(hex.height * Math.tan(hex.angle) / 2 - (hex.topWidth));
            baseCoords.y *= hex.height;

            let offsetCoords = { x: baseCoords.x + offset.x, y: baseCoords.y + offset.y };

            drawHexOutline(ctx, { x: offsetCoords.x, y: offsetCoords.y }, hex, 3 * scale, "#CEBC81");
        }
    }
}

function getOffset(rows, columns, topWidth, height) {
    let xOffset = (canvas.width / 2) - ((rows + columns - 1) * topWidth / 1.5);
    let yOffset = (canvas.height / 2) - ((rows - columns - 1) * height / 4);

    return { x: xOffset, y: yOffset };
}

function cartToHexCoords(x, y) {
    return { s: (x / 2 + y), q: x, r: (x / 2 - y) };
}

function angleToRad(angle) {
    return angle * (Math.PI / 180);
}