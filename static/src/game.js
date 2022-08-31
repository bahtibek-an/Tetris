export default class Game {
    static points = {
        "1": 100,
        "2": 300,
        "3": 700,
        "4": 1500,
    };

    static lines = {
        "1": 1,
        "2": 3,
        "3": 5,
        "4": 8,
    };
    

    constructor(fx) {
        this.reset();
        this.fx = fx;
    }

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    getState() {
        const {x: pieceX, y:pieceY, block} = this.activePiece;
        const blocks = this.activePiece;
        const playfield = this.createPlayField();
        
        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];
            
            for (let x = 0;x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }   
        }

        for (let y = 0; y < block.length; y++) {
            for (let x = 0; x < block[y].length; x++) {
                if(block[y][x]) {
                    playfield[pieceY + y][pieceX + x] = block[y][x];
                }
            }
        }

        return {
            blocks,
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            playfield,
            isGameOver: this.topOut,
            holdPiece: this.holdPiece
        };
    }

    reset() {
        this.score = 0;
        this.lines = 0;
        this.topOut = false;
        this.playfield = this.createPlayField();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
        this.holdPiece = null;
        this.isHold = false;
    }

    createPlayField() {
        const playfield = [];
        
        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }    
        }

        return playfield;
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IOTSZJL'[index];
        const piece = {}

        switch (type) {
            case 'I':
                piece.block = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;

            case 'O':
                piece.block = [
                    [0,0,0,0],
                    [0,2,2,0],
                    [0,2,2,0],
                    [0,0,0,0]
                ];
                break;

            case 'T':
                piece.block = [
                    [0,0,0],
                    [3,3,3],
                    [0,3,0]
                ];
                break;
            
            case 'S':
                piece.block = [
                    [0,0,0],
                    [0,4,4],
                    [4,4,0]
                ];
                break;

            case 'Z':
                piece.block = [
                    [0,0,0],
                    [5,5,0],
                    [0,5,5]
                ];
                break;

            case 'J':
                piece.block = [
                    [0,0,0],
                    [6,6,6],
                    [0,0,6]
                ];
                break;

            case 'L':
                piece.block = [
                    [0,0,0],
                    [7,7,7],
                    [7,0,0]
                ];
                break;

            default:
                throw new Error("Неизвестный тип фигуры");
        }

        piece.x = Math.floor((10 - piece.block[0].length) / 2);
        piece.y = -1;
        piece.type = type;

        return piece;
    }

    allPieces(type) {
        const piece = {}

        switch (type) {
            case 'I':
                piece.block = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;

            case 'O':
                piece.block = [
                    [0,0,0,0],
                    [0,2,2,0],
                    [0,2,2,0],
                    [0,0,0,0]
                ];
                break;

            case 'T':
                piece.block = [
                    [0,0,0],
                    [3,3,3],
                    [0,3,0]
                ];
                break;
            
            case 'S':
                piece.block = [
                    [0,0,0],
                    [0,4,4],
                    [4,4,0]
                ];
                break;

            case 'Z':
                piece.block = [
                    [0,0,0],
                    [5,5,0],
                    [0,5,5]
                ];
                break;

            case 'J':
                piece.block = [
                    [0,0,0],
                    [6,6,6],
                    [0,0,6]
                ];
                break;

            case 'L':
                piece.block = [
                    [0,0,0],
                    [7,7,7],
                    [7,0,0]
                ];
                break;

            default:
                throw new Error("Неизвестный тип фигуры");
        }

        return piece;
    }    

    movePieceLeft() {
        this.fx.moveFX();
        this.activePiece.x -= 1;

        if(this.hasCollision()){
            this.activePiece.x += 1;
        }
    };

    movePieceRigth() {
        this.fx.moveFX();
        this.activePiece.x += 1;

        if(this.hasCollision()){
            this.activePiece.x -= 1;
        }
    };

    movePieceDown() {
        // this.drawGhost();
        if (this.topOut) return;

        this.activePiece.y += 1;
        if (this.hasCollision()){
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updatePieces();
            const clearedLines = this.clearLines();
            this.updateScore(clearedLines);
            this.isHold = true;
        }
        if (this.hasCollision()) {
            this.fx.gameOverFX();
            this.topOut = true;
        }
    };

    hardDrop() {
        for (let y = this.activePiece.y; y < this.playfield.length; y++) {
            this.activePiece.y += 1;
            if (this.hasCollision()) {
                this.activePiece.y -= 1;
                this.movePieceDown();
                break;
            }
        }
    }

    rotatePiece() {
        this.fx.rotateFX();
        this.rotateBlock();

        if (this.hasCollision()) {
            this.rotateBlock(false);
        }
    }

    rotatePieceCounterClock() {
        this.rotateBlock(false);

        if (this.hasCollision()) {
            this.rotateBlock();
        }
    }

    rotateBlock(clockwise = true) {
        const block = this.activePiece.block;
        const length = block.length;

        const temp = [];
        for(let i = 0;i < length;i++){
            temp[i] = new Array(length).fill(0);   
        }

        for (let y = 0;y < length;y++) {
            for (let x = 0; x < length; x++) {
                if(clockwise) {
                    temp[x][y] = block[length - 1 - y][x];
                } else {
                    temp[length - 1 - x][length - 1 - y] = block[length - 1 - y][x];
                }
            }
        }

        this.activePiece.block = temp;
    }
    

    hasCollision() {
        const {x: pieceX, y:pieceY, block} = this.activePiece;
        const playfield = this.playfield;

        for(let y = 0;y < block.length;y++){
            for(let x = 0;x < block[y].length;x++){
                if(
                    block[y][x] && 
                    ((playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined) || 
                    (playfield[pieceY + y][pieceX + x]))
                    ) {
                    return true;
                }
            }
        }
        return false;
    };

    

    lockPiece() {
        const {x: pieceX, y:pieceY, block} = this.activePiece;

        for(let y = 0;y < block.length;y++){
            for(let x = 0;x < block[y].length;x++){
                if(block[y][x]){
                    this.playfield[pieceY + y][pieceX + x] = block[y][x];
                }
            }
        }
    }

    clearLines() {
        const rows = 20;
        const columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;

            for (let x = 0; x < columns; x++) {
                if(this.playfield[y][x]){
                    numberOfBlocks += 1;
                }
            }

            if(numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < columns) {
                continue;
            } else if (numberOfBlocks === columns) {
                lines.unshift(y);
            }
        }

        for (let i of lines) {
            this.playfield.splice(i,1);
            this.playfield.unshift(new Array(columns).fill(0));
        }

        this.clearLinesFX(lines.length);

        return lines.length;
    }

    clearLinesFX(lines){
        if (lines === 1) {
            this.fx.singleFX();
        } else if (lines === 2) {
            this.fx.doubleFX();
        } else if (lines === 3){
            this.fx.tripleFX();
        } else if(lines >= 4){
            this.fx.tetrisFX();
        }
    }

    updateScore(clearedLines) {
        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += Game.lines[clearedLines];
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }

    saveHold() {
        if (!this.holdPiece) {
            this.holdPiece = this.allPieces(this.activePiece.type);
            this.activePiece = this.nextPiece;
            this.activePiece.x = Math.floor((10 - this.activePiece.block[0].length) / 2);
            this.activePiece.y = -2;
            this.nextPiece = this.createPiece();
            this.fx.holdFX();
        }
    }

    activeHoldPiece() {
        if (this.holdPiece && this.isHold) {
            const swap = this.holdPiece;
            this.holdPiece = this.allPieces(this.activePiece.type);
            this.activePiece = swap;
            this.activePiece.x = Math.floor((10 - this.activePiece.block[0].length) / 2);
            this.activePiece.y = -1;
            this.isHold = false;
            this.fx.holdFX();
        }
    }
}