export default class FX{
    constructor() {
        this.hardDrop = new Audio("../FX/harddrop.wav");
        this.hold = new Audio("../FX/hold.wav");
        this.rotate = new Audio("../FX/rotatePiece.wav");
        this.move = new Audio("../FX/movePiece.wav");
        this.single = new Audio("../FX/single.wav");
        this.double = new Audio("../FX/double.wav");
        this.triple = new Audio("../FX/triple.wav");
        this.tetris = new Audio("../FX/tetris.wav");
        this.gameover = new Audio("../FX/game-over.mp3");
        this.pause = new Audio("../FX/pause.wav");
        this.main = document.getElementById("myAudio"); 
    }

    sound() {
        this.main.play();
    }

    soundPause() {
        this.main.pause();
    }

    dropFX() {
        this.hardDrop.play()
    }

    holdFX() {
        this.hold.play();
    }

    rotateFX() {
        this.rotate.play();
    }

    moveFX() {
        this.move.play();
    }

    singleFX() {
        this.single.play();
    }

    doubleFX() {
        this.double.play();
    }

    tripleFX() {
        this.triple.play();
    }

    tetrisFX() {
        this.tetris.play();
    }

    pauseFX() {
        this.pause.play();
    }

    gameOverFX() {
        this.gameover.play();
    }
}