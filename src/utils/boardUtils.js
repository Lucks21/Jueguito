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
        [[0, 0], [0, 1], [1, 0], [1, 1]], // Región 1
        [[0, 2], [0, 3], [1, 2], [1, 3]], // Región 2
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
