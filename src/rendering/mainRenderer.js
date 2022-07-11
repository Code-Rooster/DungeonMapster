import { world } from '../classes/world.js';
import { object } from '../classes/object.js';
import { renderInfo } from '../classes/renderInfo.js';

const line = new object("line", 0, { x: 0, y: 0, z: 0 }, [new renderInfo([ { x: 0, y: -1, z: 0 }, { x: 0, y: 1, z:0 }], false, false)]);
const quad = new object("quad", 1, { x: 0, y: 0, z: 0 }, [new renderInfo([ { x: -1, y: 1, z: 0 }, { x: 1, y: 1, z:0 }, {x: 1, y: -1, z: 0 }, {x: -1, y: -1, z: 0 } ], true, true)]);
const testWorld = new world([quad]);

window.onload = testWorld.update(testWorld);