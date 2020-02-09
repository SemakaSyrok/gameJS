import Engine from "./vendor/Engine.js";
import Hero from "./models/Hero.js";

let canvas = document.querySelector('#canvas');
window.ENGINE = new Engine(canvas);

ENGINE.DUMP();

// ENGINE.START();