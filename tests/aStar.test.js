import Board from '../src/board.js';
import { aStarSolver, heuristic, generateSuccessors } from '../src/algoritmos/aStar.js';
import { test, expect } from '@jest/globals';

test('Calcula la heurística correctamente', () => {
    const board = new Board();
    board.placeStar(0, 0);
    const heuristicValue = heuristic(board);
    expect(heuristicValue).toBeGreaterThan(0); // Ejemplo de expectativa, ajusta según el caso
});

test('Genera estados sucesores válidos', () => {
    const board = new Board();
    const successors = generateSuccessors(board);
    expect(successors.length).toBeGreaterThan(0); // Debería haber al menos un sucesor
    successors.forEach(successor => {
        expect(successor.isValid()).toBe(true); // Cada sucesor debe ser válido
    });
});

test('Encuentra una solución válida', () => {
    const board = new Board();
    // Coloca algunas estrellas para configurar el tablero
    const solution = aStarSolver(board);
    expect(solution).not.toBeNull(); // Debe encontrar una solución
    expect(solution.isGoal()).toBe(true); // La solución debe cumplir las reglas del juego
});
