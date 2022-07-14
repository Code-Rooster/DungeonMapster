import { world } from '../classes/world.js';
import { composite } from '../classes/composite.js';

const thetaSlider = document.getElementById("thetaSlider");
const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const zSlider = document.getElementById("zSlider");

const quad = new composite("quad", 2, { x: 0, y: 0, z: 0 }, { w: 0, x: 0, y: 0, z: 1 }, [[{ x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: -1, z: 0 }]]);

const compositeToRender = quad;

const testWorld = new world([compositeToRender]);

window.onload = testWorld.update(testWorld);

var axisSliderVals = { x: 1, y: 0, z: 0 };

thetaSlider.oninput = rotate;
xSlider.oninput = xBTR;
ySlider.oninput = yBTR;
zSlider.oninput = zBTR;

xSlider.onchange = axisUpdate;
ySlider.onchange = axisUpdate;
zSlider.onchange = axisUpdate;

function axisUpdate() {
    axisSliderVals = { x: Math.pow(parseFloat(xSlider.value / 360), 2), y: Math.pow(parseFloat(ySlider.value / 360), 2), z: Math.pow(parseFloat(zSlider.value / 360), 2) };
}

function xBTR() {
    balanceThenRotate(xSlider);
}

function yBTR() {
    balanceThenRotate(ySlider);
}

function zBTR() {
    balanceThenRotate(zSlider);
}

function balanceThenRotate(input) {
    let ratio = 0.0;

    if(input == xSlider) {
        ratio = (axisSliderVals.z && axisSliderVals.y != 0 ? axisSliderVals.z : 0.5) / (axisSliderVals.y + axisSliderVals.z != 0 ? axisSliderVals.y + axisSliderVals.z : 1);

        let newZ = Math.sqrt((1 - Math.pow(parseFloat(xSlider.value / 360), 2)) * ratio);
        let newY = Math.sqrt((1 - Math.pow(parseFloat(xSlider.value / 360), 2)) * (1 - ratio));

        ySlider.value = newY * 360;
        zSlider.value = newZ * 360;
    } else if(input == ySlider) {
        ratio = (axisSliderVals.z && axisSliderVals.x != 0 ? axisSliderVals.z : 0.5) / (axisSliderVals.x + axisSliderVals.z != 0 ? axisSliderVals.x + axisSliderVals.z : 1);

        let newZ = Math.sqrt((1 - Math.pow(parseFloat(ySlider.value / 360), 2)) * ratio);
        let newX = Math.sqrt((1 - Math.pow(parseFloat(ySlider.value / 360), 2)) * (1 - ratio));

        xSlider.value = newX * 360;
        zSlider.value = newZ * 360;
    } else if(input == zSlider) {
        ratio = (axisSliderVals.y && axisSliderVals.x != 0 ? axisSliderVals.y : 0.5) / (axisSliderVals.x + axisSliderVals.y != 0 ? axisSliderVals.x + axisSliderVals.y : 1);

        let newY = Math.sqrt((1 - Math.pow(parseFloat(zSlider.value / 360), 2)) * ratio);
        let newX = Math.sqrt((1 - Math.pow(parseFloat(zSlider.value / 360), 2)) * (1 - ratio));

        xSlider.value = newX * 360;
        ySlider.value = newY * 360;
    }

    rotate();
}

function rotate() {
    compositeToRender.changeRot({ w: parseInt(thetaSlider.value) * Math.PI / 180, x: Math.pow(parseFloat(xSlider.value / 360), 2), y: Math.pow(parseFloat(xSlider.value / 360), 2), z: Math.pow(parseFloat(xSlider.value / 360), 2) });
    testWorld.update(testWorld);
}