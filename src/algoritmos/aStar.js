import Board from '../board.js';
import boardUtils from '../utils/boardUtils.js';

function aStarSolver(initialBoard) {
    const openSet = [{ board: initialBoard, g: 0, f: heuristic(initialBoard) }];
    const closedSet = new Set();
    let iterationCount = 0;
    const maxIterations = 10000;
    
    while (openSet.length > 0 && iterationCount < maxIterations) {
        iterationCount++;

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

            const existingNode = openSet.find(node => boardToString(node.board) === boardToString(successor));
            if (existingNode && existingNode.f <= f) continue;

            openSet.push({ board: successor, g, f });
        }
    }
    if (iterationCount >= maxIterations) {
        console.log("Se alcanzó el límite de iteraciones.");
    } else {
        console.log("No se encontró solución.");
    }
    return null;
}

function heuristic(board) {
    let missingStars = 0;

    for (let row = 0; row < board.size; row++) {
        const starsInRow = boardUtils.countStarsInRow(board, row);
        if (starsInRow < 2) {
            missingStars += (2 - starsInRow); 
        }
    }

    for (let col = 0; col < board.size; col++) {
        const starsInColumn = boardUtils.countStarsInColumn(board, col);
        if (starsInColumn < 2) {
            missingStars += (2 - starsInColumn);
        }
    }

    const regions = boardUtils.getRegions();
    for (let region of regions) {
        const starsInRegion = boardUtils.countStarsInRegion(board, region);
        if (starsInRegion < 2) {
            missingStars += (2 - starsInRegion);
        }
    }

    return missingStars;
}


function generateSuccessors(board) {
    const successors = [];

    for (let row = 0; row < board.size; row++) {
        for (let col = 0; col < board.size; col++) {
            if (board.grid[row][col] === 0 && !boardUtils.hasAdjacentStar(board, row, col)) {
                const newBoard = new Board(board.size);
                newBoard.grid = board.grid.map(row => [...row]);

                newBoard.placeStar(row, col);

                //console.log(`Generando sucesor con estrella en (${row}, ${col}):`);
                //newBoard.printBoard();

                if (newBoard.isValid()) { 
                    //console.log(`Sucesor válido generado con estrella en (${row}, ${col}):`);
                    //newBoard.printBoard();
                    successors.push(newBoard);
                } else {
                    //console.log(`Sucesor en (${row}, ${col}) no es válido, descartado.`);
                }
            }
        }
    }
    return successors;
}

function boardToString(board) {
    return board.grid.map(row => row.join(',')).join(';');
}

export { aStarSolver, heuristic, generateSuccessors };
