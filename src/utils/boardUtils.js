// boardUtils.js

/**
 * Cuenta las estrellas en una fila específica del tablero.
 */
function countStarsInRow(board, row) {
    return board.grid[row].reduce((count, cell) => count + cell, 0);
}

/**
 * Cuenta las estrellas en una columna específica del tablero.
 */
function countStarsInColumn(board, col) {
    return board.grid.reduce((count, row) => count + row[col], 0);
}

/**
 * Cuenta las estrellas en una región específica del tablero.
 */
function countStarsInRegion(board, region) {
    return region.reduce((count, [row, col]) => count + board.grid[row][col], 0);
}

/**
 * Verifica si hay una estrella adyacente a una posición dada en el tablero.
 */
function hasAdjacentStar(board, row, col) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],    // vertical y horizontal
        [-1, -1], [-1, 1], [1, -1], [1, 1]   // diagonales
    ];

    for (let [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < board.size && newCol >= 0 && newCol < board.size) {
            if (board.grid[newRow][newCol] === 1) return true;
        }
    }
    return false;
}

/**
 * Crea un tablero vacío de tamaño especificado.
 */
function createEmptyBoard(size = 9) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

/**
 * Define las regiones del tablero.
 */
function getRegions() {
    return [
        [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]],  // Región 1
        [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [1, 5], [2, 5], [2, 6], [3, 5], [3, 6]], // Región 2
        [[1, 3], [1, 4], [2, 2], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5], [6, 2], [6, 3], [6, 4]], //region 3
        [[4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2], [6, 1]], //region 4
        [[6, 0], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2], [8, 3]], //region 5
        [[7, 3], [7, 4], [7, 5]], // region 6
        [[1, 6], [1, 7], [1, 8], [2, 7]], // region 7
        [[3, 7], [4, 6], [4, 7], [5, 6]], //region 8
        [[2, 8], [3, 8], [4, 8], [5, 7], [5, 8], [6, 5], [6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]] //region 9
        // Agrega las demás regiones según tu tablero
    ];
}

export default {
    countStarsInRow,
    countStarsInColumn,
    countStarsInRegion,
    hasAdjacentStar,
    createEmptyBoard,
    getRegions
};
