import boardUtils from '../src/utils/boardUtils.js';
import Board from '../src/board.js';
import { test, expect } from '@jest/globals';

test('Cuenta correctamente las estrellas en una fila', () => {
    const board = new Board(9);
    board.placeStar(0, 0);
    board.placeStar(0, 1);
    const starsInRow = boardUtils.countStarsInRow(board, 0);
    expect(starsInRow).toBe(2);
});

test('Verifica correctamente si hay estrellas adyacentes', () => {
    const board = new Board(9);
    board.placeStar(0, 0);
    const hasAdjacent = boardUtils.hasAdjacentStar(board, 0, 1);
    expect(hasAdjacent).toBe(true);
});
