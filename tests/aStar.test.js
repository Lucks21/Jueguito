import Board from '../src/board.js';
import { aStarSolver, heuristic, generateSuccessors } from '../src/algoritmos/aStar.js';
import { test, expect } from '@jest/globals';

test('Calcula la heurística correctamente', () => {
    const board = new Board();
    board.placeStar(0, 0);
    const heuristicValue = heuristic(board);
    expect(heuristicValue).toBeGreaterThan(0);
});

test('Genera estados sucesores válidos', () => {
    const board = new Board();
    const successors = generateSuccessors(board);
    expect(successors.length).toBeGreaterThan(0);
    successors.forEach(successor => {
        expect(successor.isValid()).toBe(true);
    });
});

test('Encuentra una solución válida', () => {
    const board = new Board();
    const solution = aStarSolver(board);
    expect(solution).not.toBeNull();
    expect(solution.isGoal()).toBe(true);
});
