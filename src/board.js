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
                console.log(`Fila ${row} tiene más de 2 estrellas`);
                return false;
            }
        }

        // Verifica columnas
        for (let col = 0; col < this.size; col++) {
            const starCount = boardUtils.countStarsInColumn(this, col);
            if (starCount > 2) {
                console.log(`Columna ${col} tiene más de 2 estrellas`);
                return false;
            }
        }
        // Verifica regiones
        const regions = boardUtils.getRegions();
        for (let regionIndex in regions) {
            const starCount = boardUtils.countStarsInRegion(this, regions[regionIndex]);
            if (starCount > 2) {
                console.log(`Región ${regionIndex} tiene más de 2 estrellas`);
                return false;
            }
        }

        // Verifica que las estrellas no sean adyacentes
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 1) {
                    if (boardUtils.hasAdjacentStar(this, row, col)) {
                        console.log(`Estrella en (${row}, ${col}) tiene una adyacente`);
                        return false;
                    }
                }
            }
        }
    
        return true;
    }

    // Método auxiliar para verificar si el tablero es el objetivo (completamente válido)
    isGoal() {
        // Verifica que cada fila, columna, y región tengan exactamente dos estrellas
        for (let row = 0; row < this.size; row++) {
            if (boardUtils.countStarsInRow(this, row) !== 2) return false;
        }
    
        for (let col = 0; col < this.size; col++) {
            if (boardUtils.countStarsInColumn(this, col) !== 2) return false;
        }
    
        const regions = boardUtils.getRegions();
        for (let region of regions) {
            if (boardUtils.countStarsInRegion(this, region) !== 2) return false;
        }
    
        return true; // Cumple con la condición de meta
    }
    
}

export default Board;
