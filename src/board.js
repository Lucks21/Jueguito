import boardUtils from './utils/boardUtils.js';

class Board {
    constructor(size = 9) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(0));
    }

    placeStar(row, col) {
        this.grid[row][col] = 1;
    }

    printBoard() {
        this.grid.forEach(row => {
            console.log(row.map(cell => cell).join(' | '));
        });
    }

    isValid() {

        for (let row = 0; row < this.size; row++) {
            const starCount = boardUtils.countStarsInRow(this, row);
            if (starCount > 2) {
                //console.log("Fila mala");
                return false;
            }
        }

        for (let col = 0; col < this.size; col++) {
            const starCount = boardUtils.countStarsInColumn(this, col);
            if (starCount > 2) {
                //console.log("Columna mala");
                return false;
            }
        }

        const regions = boardUtils.getRegions();
        for (let region of regions) {
            const starCount = boardUtils.countStarsInRegion(this, region);
            if (starCount > 2) {
                //console.log("Region mala");
                return false;
            }
        }

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 1) {
                    if (boardUtils.hasAdjacentStar(this, row, col)) {
                        //console.log("Adyacencia mala");
                        return false;
                    }
                }
            }
        }

        return true;
    }

    isGoal() {
        
        for (let row = 0; row < this.size; row++) {
            const starCount = boardUtils.countStarsInRow(this, row);
            if (starCount !== 2) return false;
        }

        for (let col = 0; col < this.size; col++) {
            const starCount = boardUtils.countStarsInColumn(this, col);
            if (starCount !== 2) return false;
        }

        const regions = boardUtils.getRegions();
        for (let region of regions) {
            const starCount = boardUtils.countStarsInRegion(this, region);
            if (starCount !== 2) return false;
        }

        const result = this.isValid();
        if (result) {
            console.log("Estado objetivo alcanzado en isGoal.");
        }
        return result;
    }
    
}

export default Board;
