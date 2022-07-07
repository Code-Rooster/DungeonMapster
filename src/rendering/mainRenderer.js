const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext('2d');

init();

function init() {
    let tW = 50;
    let h = 50;
    let a = 135;

    let hex = { topWidth: tW, height: h, angle: a };

    console.log("initializing :)");

    drawGrid(hex, 10, 10);
}

function drawGrid(hexagon, rows, columns) {
    for (let s = 0; s < rows; s++) {
        for (let r = 0; r < columns; r++) {
            let q = s + r;
            let baseCoords = hexToCartCoords(s, q, r);
            baseCoords.x *= -(hexagon.height * Math.tan(angleToRad(hexagon.angle)) / 2 - hexagon.topWidth);
            baseCoords.y *= hexagon.height;
            let offset = getOffset(rows, columns, hexagon.topWidth, hexagon.height);
            drawHex({ x: baseCoords.x + offset.x, y: baseCoords.y + offset.y } , hexagon.topWidth, hexagon.height, angleToRad(hexagon.angle));
        }
    }
}

function getOffset(rows, columns, topWidth, height) {
    let xOffset = 400 + (((rows + columns) / 2 - 1) * -(200 / 3));
    let yOffset = 250;
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