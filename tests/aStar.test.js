import Board from '../src/board.js';
import aStarSolver from '../src/algorithms/aStar.js';
import boardUtils from '../src/utils/boardUtils.js';

test('resuelve un tablero simple', () => {
    const board = new Board();
    board.placeStar(0, 0); // Colocar estrellas para configurar el tablero inicial de prueba

    const solution = aStarSolver(board);
    expect(solution).not.toBeNull(); // Verifica que haya una solución
    expect(boardUtils.countStarsInRow(solution, 0)).toBeLessThanOrEqual(2); // Verifica las reglas del juego
});
