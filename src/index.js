import Board from './board.js';
import aStarSolver from './algorithms/aStar.js';

// Crear una instancia del tablero
const board = new Board();
// Puedes configurar el tablero inicial aquí, por ejemplo colocando algunas estrellas

// Ejecutar el algoritmo A*
const solution = aStarSolver(board);

if (solution) {
    console.log("¡Solución encontrada!");
    console.log(solution.grid); // Muestra el estado final del tablero
} else {
    console.log("No se encontró una solución.");
}
