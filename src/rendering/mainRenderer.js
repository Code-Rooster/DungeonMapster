const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext('2d');

const rowSlider = document.getElementById("rowSlider");
const columnSlider = document.getElementById("columnSlider");

var topWidth = 50;
var hexHeight = 50;
var angle = 135;
var hex = { topWidth: topWidth, height: hexHeight, angle: angle };

var rows = 1;
var columns = 1;

window.onresize = redrawCanvas;

rowSlider.oninput = function() {
    rows = this.value;
    redrawCanvas();
}

columnSlider.oninput = function() {
    columns = this.value;
    redrawCanvas();
}

init();

function init() {
    console.log("initializing :)");

    drawGrid(hex, rows, columns);
}

function redrawCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawGrid(hex, rows, columns);
}

function drawGrid(hexagon, rows, columns) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#19181A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let offset = getOffset(rows, columns, hexagon.topWidth, hexagon.height);

    for (let s = 0; s < rows; s++) {
        for (let r = 0; r < columns; r++) {
            let q = s + r;
            let baseCoords = hexToCartCoords(s, q, r);
            baseCoords.x *= -(hexagon.height * Math.tan(angleToRad(hexagon.angle)) / 2 - hexagon.topWidth);
            baseCoords.y *= hexagon.height;
            drawHex({ x: baseCoords.x + offset.x, y: baseCoords.y + offset.y } , hexagon.topWidth, hexagon.height, angleToRad(hexagon.angle));
        }
    }
}

function getOffset(rows, columns, topWidth, height) {
    let xOffset = (canvas.width) - ((rows + columns - 1) * topWidth / 1.5);
    let yOffset = canvas.height / 2;
    return { x: xOffset, y: yOffset };
}

function drawHex(cartCoords, topWidth, height, rad) {
    let initX = cartCoords.x - (topWidth / 2);
    let initY = cartCoords.y - (height / 2);
    
    console.log(topWidth);

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

    ctx.lineWidth = 3;

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