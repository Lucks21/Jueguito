import Board from './board.js';
import { aStarSolver } from './algoritmos/aStar.js';

const board = new Board();

console.log("Tablero actual:");
board.printBoard();

const solution = aStarSolver(board);

if (solution) {
    console.log("¡Solución encontrada!");
    solution.printBoard();
}
