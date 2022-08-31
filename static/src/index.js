import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";

const game = new Game();
const view = new View(480,640,20,10);
const controller = new Controller(game,view);

window.game = game;
window.view = view;
window.controller = controller;



