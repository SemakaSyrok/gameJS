import Engine from "./vendor/Engine.js";
import Hero from "./models/Hero.js";
import Loader from './vendor/Loader.js'
import UI from './vendor/UI.js';
import UserController from './vendor/UserController.js';

let canvas = document.querySelector('#canvas');

Loader.INIT();
UserController.INIT();

window.ENGINE = new Engine(canvas);


setTimeout(ENGINE.render(), 2000);