import Engine from "./vendor/Engine.js";
import Hero from "./models/Hero.js";

let canvas = document.querySelector('#canvas');
window.ENGINE = new Engine(canvas);

ENGINE.render();
ENGINE.DUMP();

setTimeout(ENGINE.render(), 1000);