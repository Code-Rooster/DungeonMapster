import { world } from '../classes/world.js';
import { vector3 } from '../classes/vector3.js';
import { composite } from '../classes/composite.js';
import { quaternion } from '../classes/quaternion.js';

const thetaSlider = document.getElementById("thetaSlider");
const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const zSlider = document.getElementById("zSlider");
const zPosSlider = document.getElementById("zPosSlider");

const quad = new composite("quad", 2, new vector3(0, 0, 0), quaternion.identity, [[new vector3(-1, 1, 0), new vector3(1, 1, 0), new vector3(1, -1, 0), new vector3(-1, -1, 0)]]);

const compositeToRender = quad;

const testWorld = new world([compositeToRender]);

window.onload = testWorld.update(testWorld);

thetaSlider.oninput = balanceThenRotate;
xSlider.oninput = balanceThenRotate;
ySlider.oninput = balanceThenRotate;
zSlider.oninput = balanceThenRotate;

zPosSlider.oninput = moveZ;

function balanceThenRotate() {
    let axis = new vector3(parseFloat(xSlider.value), parseFloat(ySlider.value), parseFloat(zSlider.value));
    axis.normalize();

    xSlider.value = axis.x * 360;
    ySlider.value = axis.y * 360;
    zSlider.value = axis.z * 360;

    rotate();
}

function moveZ() {
    testWorld.cam.pos = new vector3(testWorld.cam.pos.x, testWorld.cam.pos.y, parseFloat(zPosSlider.value));
    testWorld.update(testWorld);
}

function rotate() {
    console.log(testWorld.cam.rot);
    let axis = new vector3(parseFloat(xSlider.value), parseFloat(ySlider.value), parseFloat(zSlider.value));
    axis.normalize();
    let angle = parseFloat(thetaSlider.value) * Math.PI / 180;
    testWorld.cam.rot = quaternion.unitQuatFromAngleAxis(angle, axis);
    console.log(testWorld.cam.rot);
    testWorld.update(testWorld);
}