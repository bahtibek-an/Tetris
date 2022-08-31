export default class Controller {
    constructor (game,view,fx) {
        this.game = game;
        this.view = view;
        this.fx = fx;
        this.intervalId = null;
        this.isPlaying = false;


        

        document.addEventListener('keydown',this.handleKeyDown.bind(this));
        // document.addEventListener('keydown',this.hotkeys.bind(this));
        document.addEventListener('keyup',this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.view.renderMainScreen(this.game.getState());
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.fx.pauseFX();
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    reset() {
        this.game.reset();
        this.play();
    }
    
    updateView() {
        const state = this.game.getState()

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        }else if(!this.isPlaying){
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
        
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        const state = this.game.getState();
        switch (event.keyCode) {
            case 13: // Enter
            case 112: // Escape and F1
            case 27:
                this.fx.soundPause();
                if(state.isGameOver) {
                    this.reset();
                }
                else if(this.isPlaying){
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 39:  // RIGHT ARROW
            case 102:   
            case 68: 
                this.game.movePieceRigth()
                this.updateView();
                break;
            case 37:  // LEFT ARROW
            case 100:
            case 65:
                this.game.movePieceLeft()
                this.updateView();
                break;
            case 40:  // DOWN ARROW
            case 101:
            case 83:
                this.fx.moveFX();
                this.stopTimer();
                this.game.movePieceDown()
                this.updateView();
                break; 
            case 87:  // UP ARROW Rotate Piece
            case 97: 
            case 105: 
            case 104:  
            case 88:  
            case 38: 
                this.rotatePieceClockWise();
                break;
            case 17:  // UP ARROW Counter Rotate Piece
            case 90:
            case 99:
            case 103:
                this.game.rotatePieceCounterClock();
                this.updateView();
                break; 
            case 16: // HOLD
            case 67:
                this.game.saveHold();
                this.game.activeHoldPiece();
                break;
            case 32: // Hard Drop
            case 98:
                this.fx.dropFX();
                this.game.hardDrop();
                this.updateView();
                break;
        }
    }

    
    // hotkeys(event) {
    //     let flag = false;
    //     if (event.key === "Control") {
    //         flag = true;
    //     }
    //     if (event.key === "z") {
    //         this.game.rotatePieceCounterClock();
    //         flag = false;
    //     }
    // }

    rotatePieceClockWise() {
        this.game.rotatePiece();
        this.updateView();
    }

    handleKeyUp(event) {
        switch (event.key) {
            case "s": // DOWN ARROW
                this.startTimer();
                break; 
        }
    }
}