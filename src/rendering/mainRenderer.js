const canvas = document.getElementById("hexCanvas");
const bgCan = document.getElementById("bgCanvas");
const ctx = canvas.getContext('2d');
const bgCtx = bgCan.getContext('2d');

const rowSlider = document.getElementById("rowSlider");
const columnSlider = document.getElementById("columnSlider");
const zoomSlider = document.getElementById("zoomSlider");

var topWidth = 50;
var hexHeight = 50;
var angle = 135;
var hex = { topWidth: topWidth, height: hexHeight, angle: angle };

var rows = 1;
var columns = 1;

var rawScale = 1;

window.onresize = redrawCanvas;

rowSlider.oninput = function() {
    rows = parseInt(this.value, 10);
    redrawCanvas();
}

columnSlider.oninput = function() {
    columns = parseInt(this.value, 10);
    redrawCanvas();
}

zoomSlider.oninput = function(){
    rawScale = parseInt(this.value, 10);
    redrawCanvas();
}

function redrawCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    bgCan.width = window.innerWidth;
    bgCan.height = window.innerHeight;

    drawGrid(hex, rows, columns);
}

function processScale() {
    return 2 / (1 + Math.pow(Math.E, -0.5 * rawScale));
}

function drawGrid(hexagon, rows, columns) {
    let scale = processScale();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgCtx.fillStyle = "#19181A";
    bgCtx.fillRect(0, 0, canvas.width, canvas.height);

    let offset = getOffset(rows, columns, hexagon.topWidth * scale, hexagon.height * scale);

    for (let s = 0; s < rows; s++) {
        for (let r = 0; r < columns; r++) {
            let q = s + r;
            let baseCoords = hexToCartCoords(s, q, r);
            baseCoords.x *= -(hexagon.height * Math.tan(angleToRad(hexagon.angle)) / 2 - (hexagon.topWidth)) * scale;
            baseCoords.y *= hexagon.height * scale;
            drawHex({ x: baseCoords.x + offset.x, y: baseCoords.y + offset.y } , hexagon.topWidth * scale, hexagon.height * scale, angleToRad(hexagon.angle));
        }
    }
}

function getOffset(rows, columns, topWidth, height) {
    let xOffset = (canvas.width / 2) - ((rows + columns - 1) * topWidth / 1.5);
    console.log("rows type: " + typeof rows + ", columns type: " + typeof columns);
    let yOffset = (canvas.height / 2) - ((rows - columns - 1) * height / 4);
    console.log("xOffset: " + xOffset);
    return { x: xOffset, y: yOffset };
}

function drawHex(cartCoords, topWidth, height, rad) {
    let initX = cartCoords.x - (topWidth / 2);
    let initY = cartCoords.y - (height / 2);
    
    let x = initX;
    let y = initY;

    let a = height / 2;
    let b = a * Math.tan(rad);

    ctx.beginPath();
    ctx.moveTo(x, y);

    x += topWidth;
    ctx.lineTo(x, y);

    x -= b;
    y += a;
    ctx.lineTo(x, y);

    x += b;
    y += a;
    ctx.lineTo(x, y);

    x -= topWidth;
    ctx.lineTo(x, y);

    x += b;
    y -= a;
    ctx.lineTo(x, y);

    ctx.lineTo(initX, initY);

    // this last one makes sure that there is not a gap between the first and final points
    ctx.lineTo(initX + topWidth / 2, initY);

    ctx.lineWidth = 3 * processScale();

    ctx.strokeStyle = "#CEBC81";
    ctx.stroke();
}

function hexToCartCoords(s, q, r) {
    return { x: q, y: ((s - r) / 2) };
}

function cartToHexCoords(x, y) {
    return { s: (x / 2 + y), q: x, r: (x / 2 - y) };
}

function angleToRad(angle) {
    return angle * (Math.PI / 180);
}