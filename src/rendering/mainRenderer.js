import { world } from '../classes/world.js';
import { composite } from '../classes/composite.js';

const zSlider = document.getElementById("zSlider");

const quad = new composite("quad", 2, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, [[{ x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: -1, z: 0 }]]);

const compositeToRender = quad;

const testWorld = new world([compositeToRender]);

window.onload = testWorld.update(testWorld);

zSlider.oninput = changeZ;

function changeZ() {
    compositeToRender.changeRot({ x: 0, y: 0, z: parseInt(this.value) * (Math.PI / 180) });
    testWorld.update(testWorld);
}