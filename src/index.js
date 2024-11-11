import Board from './board.js';
import { aStarSolver } from './algoritmos/aStar.js';

// Crear una instancia del tablero
const board = new Board();
// Puedes configurar el tablero inicial aquí, por ejemplo colocando algunas estrellas
console.log("Tablero actual:");
board.printBoard();
// Ejecutar el algoritmo A*
const solution = aStarSolver(board);

if (solution) {
    console.log("¡Solución encontrada!");
    solution.printBoard(); // Muestra el estado final del tablero
} else {
    console.log("No se encontró una solución.");
}
