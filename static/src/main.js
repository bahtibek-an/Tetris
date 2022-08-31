import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";
import FX from "./soundFX.js";

const fx = new FX();
const game = new Game(fx);
const view = new View(480,640,20,10);
const controller = new Controller(game,view,fx);

window.game = game;
window.view = view;
window.controller = controller;



