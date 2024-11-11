import boardUtils from './utils/boardUtils.js';

class Board {
    constructor(size = 9) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(0));
    }

    // Método para colocar una estrella en el tablero
    placeStar(row, col) {
        this.grid[row][col] = 1;
    }

    // Método para quitar una estrella del tablero
    removeStar(row, col) {
        this.grid[row][col] = 0;
    }

    printBoard() {
        this.grid.forEach(row => {
            console.log(row.map(cell => cell).join(' | '));
        });
    }

    // Método para verificar si el tablero cumple con las reglas de Star Battle
    isValid() {
        // Verifica filas
        for (let row = 0; row < this.size; row++) {
            const starCount = boardUtils.countStarsInRow(this, row);
            if (starCount > 2) {
                console.log("Fila mala");
                return false;
            }
        }

        // Verifica columnas
        for (let col = 0; col < this.size; col++) {
            const starCount = boardUtils.countStarsInColumn(this, col);
            if (starCount > 2) {
                console.log("Columna mala");
                return false;
            }
        }

        // Verifica regiones
        const regions = boardUtils.getRegions();
        for (let region of regions) {
            const starCount = boardUtils.countStarsInRegion(this, region);
            if (starCount > 2) {
                console.log("Region mala");
                return false;
            }
        }

        // Verifica que las estrellas no sean adyacentes
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 1) {
                    if (boardUtils.hasAdjacentStar(this, row, col)) {
                        console.log("Adyacencia mala");
                        return false;
                    }
                }
            }
        }

        return true;
    }

    // Método auxiliar para verificar si el tablero es el objetivo (completamente válido)
    isGoal() {
        // Asegúrate de que el tablero cumple con todas las reglas
        // Verifica que cada fila tenga exactamente 2 estrellas
        
        for (let row = 0; row < this.size; row++) {
            const starCount = boardUtils.countStarsInRow(this, row);
            if (starCount !== 2) return false;
        }

        // Verifica que cada columna tenga exactamente 2 estrellas
        for (let col = 0; col < this.size; col++) {
            const starCount = boardUtils.countStarsInColumn(this, col);
            if (starCount !== 2) return false;
        }

        // Verifica que cada región tenga exactamente 2 estrellas
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
