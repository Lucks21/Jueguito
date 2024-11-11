import Board from '../board.js';
import boardUtils from '../utils/boardUtils.js';

function aStarSolver(initialBoard) {
    const openSet = [{ board: initialBoard, g: 0, f: heuristic(initialBoard) }];
    const closedSet = new Set();
    let iterationCount = 0;
    const maxIterations = 10000;
    
    while (openSet.length > 0 && iterationCount < maxIterations) {
        iterationCount++;
        console.log(`Iteración: ${iterationCount}, openSet: ${openSet.length}, closedSet: ${closedSet.size}`);

        openSet.sort((a, b) => a.f - b.f);
        const currentNode = openSet.shift();
        const currentBoard = currentNode.board;

        if (currentBoard.isGoal()) {
            console.log("¡Solución encontrada!");
            return currentBoard;
        }

        closedSet.add(boardToString(currentBoard));

        const successors = generateSuccessors(currentBoard);
        for (const successor of successors) {
            if (closedSet.has(boardToString(successor))) continue;

            const g = currentNode.g + 1;
            const h = heuristic(successor);
            const f = g + h;

            console.log(`Generando sucesor con f: ${f}, g: ${g}, h: ${h}`);
            openSet.push({ board: successor, g, f });
        }
    }

    console.log("No se encontró solución o se alcanzó el límite de iteraciones.");
    return null;
}

function heuristic(board) {
    let missingStars = 0;

    for (let row = 0; row < board.size; row++) {
        const starsInRow = boardUtils.countStarsInRow(board, row);
        missingStars += Math.abs(2 - starsInRow); // Penaliza si tiene menos o más de 2 estrellas
    }

    for (let col = 0; col < board.size; col++) {
        const starsInColumn = boardUtils.countStarsInColumn(board, col);
        missingStars += Math.abs(2 - starsInColumn); // Penaliza si tiene menos o más de 2 estrellas
    }

    const regions = boardUtils.getRegions();
    for (let region of regions) {
        const starsInRegion = boardUtils.countStarsInRegion(board, region);
        missingStars += Math.abs(2 - starsInRegion); // Penaliza si tiene menos o más de 2 estrellas
    }

    return missingStars; // Cuantas más estrellas faltantes o en exceso, mayor es el valor heurístico
}


function generateSuccessors(board) {
    const successors = [];

    for (let row = 0; row < board.size; row++) {
        for (let col = 0; col < board.size; col++) {
            if (board.grid[row][col] === 0 && 
                boardUtils.countStarsInRow(board, row) < 2 &&
                boardUtils.countStarsInColumn(board, col) < 2 &&
                boardUtils.countStarsInRegion(board, boardUtils.getRegion(row, col)) < 2 &&
                !boardUtils.hasAdjacentStar(board, row, col)) {

                const newBoard = new Board(board.size);
                newBoard.grid = board.grid.map(row => [...row]);
                newBoard.placeStar(row, col);

                if (newBoard.isValid()) {
                    successors.push(newBoard);
                }
            }
        }
    }

    return successors;
}

function boardToString(board) {
    return board.grid.flat().join(',');
}

export { aStarSolver, heuristic, generateSuccessors };
