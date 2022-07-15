import { world } from '../classes/world.js';
import { vector3 } from '../classes/vector3.js';
import { composite } from '../classes/composite.js';
import { quaternion } from '../classes/quaternion.js';

const thetaSlider = document.getElementById("thetaSlider");
const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const zSlider = document.getElementById("zSlider");

const quad = new composite("quad", 2, { x: 0, y: 0, z: 0 }, new quaternion(1, 0, 0, 0), [[{ x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: -1, z: 0 }]]);

const compositeToRender = quad;

const testWorld = new world([compositeToRender]);

window.onload = testWorld.update(testWorld);

var axisSliderVals = { x: 1, y: 0, z: 0 };

thetaSlider.oninput = balanceThenRotate;
xSlider.oninput = balanceThenRotate;
ySlider.oninput = balanceThenRotate;
zSlider.oninput = balanceThenRotate;

function balanceThenRotate() {
    let q = new quaternion(thetaSlider.value, xSlider.value, ySlider.value, zSlider.value);
    q.normalize();

    thetaSlider.value = q.w * 360;
    xSlider.value = q.x * 360;
    ySlider.value = q.y * 360;
    zSlider.value = q.z * 360;

    rotate();
}

function rotate() {
    let q = new quaternion(thetaSlider.value, xSlider.value, ySlider.value, zSlider.value);
    q.normalize();
    let rotation = quaternion.unitQuatFromAngleAxis(q.w, new vector3(q.x, q.y, q.z));
    compositeToRender.changeRot(q);
    testWorld.update(testWorld);
}