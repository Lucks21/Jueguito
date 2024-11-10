import Board from '../board.js';
import boardUtils from '../utils/boardUtils.js';

function aStarSolver(initialBoard) {
    const openSet = [{ board: initialBoard, g: 0, f: heuristic(initialBoard) }]; // Lista de estados por explorar con costos
    const closedSet = new Set(); // Lista de estados ya explorados

    while (openSet.length > 0) {
        // Ordena el openSet para que el primer elemento tenga el menor costo `f`
        openSet.sort((a, b) => a.f - b.f);
        const currentNode = openSet.shift();
        const currentBoard = currentNode.board;

        // Verificar si el estado actual es el objetivo
        if (currentBoard.isGoal()) { // Método que verifica si alcanzamos el estado objetivo
            return currentBoard; // Devuelve la solución
        }

        closedSet.add(currentBoard);

        // Genera sucesores
        const successors = generateSuccessors(currentBoard);
        for (const successor of successors) {
            if (closedSet.has(successor)) continue; // Ignora estados ya explorados

            // Calcula g (costo acumulado) y h (heurística) para el sucesor
            const g = currentNode.g + 1; // Aumenta el costo acumulado
            const h = heuristic(successor);
            const f = g + h;

            // Verificar si el sucesor está en openSet con un mayor costo `f`
            const existingNode = openSet.find(node => node.board === successor);
            if (existingNode && existingNode.f <= f) continue;

            // Añade o actualiza el sucesor en openSet
            openSet.push({ board: successor, g, f });
        }
    }

    return null; // Devuelve null si no se encuentra solución
}

function heuristic(board) {
    let missingStars = 0;

    // Calcular estrellas faltantes en cada fila
    for (let row = 0; row < board.size; row++) {
        const starsInRow = boardUtils.countStarsInRow(board, row);
        if (starsInRow < 2) {
            missingStars += (2 - starsInRow); // Suma las estrellas faltantes
        }
    }

    // Calcular estrellas faltantes en cada columna
    for (let col = 0; col < board.size; col++) {
        const starsInColumn = boardUtils.countStarsInColumn(board, col);
        if (starsInColumn < 2) {
            missingStars += (2 - starsInColumn); // Suma las estrellas faltantes
        }
    }

    // Calcular estrellas faltantes en cada región
    const regions = boardUtils.getRegions();
    for (let region of regions) {
        const starsInRegion = boardUtils.countStarsInRegion(board, region);
        if (starsInRegion < 2) {
            missingStars += (2 - starsInRegion); // Suma las estrellas faltantes
        }
    }

    return missingStars; // Cuantas más estrellas faltantes, mayor será el valor heurístico
}


function generateSuccessors(board) {
    const successors = [];

    // Recorre cada celda del tablero para buscar posiciones válidas para colocar una estrella
    for (let row = 0; row < board.size; row++) {
        for (let col = 0; col < board.size; col++) {
            // Solo considera la celda si está vacía y no tiene estrellas adyacentes
            if (board.grid[row][col] === 0 && !boardUtils.hasAdjacentStar(board, row, col)) {
                // Crear una copia del tablero actual
                const newBoard = new Board();
                newBoard.grid = board.grid.map(row => [...row]);

                // Coloca una estrella en la nueva copia
                newBoard.placeStar(row, col);

                // Agrega el nuevo estado (tablero con la nueva estrella) a los sucesores si es válido
                if (newBoard.isValid()) {
                    successors.push(newBoard);
                }
            }
        }
    }

    return successors;
}

export { aStarSolver, heuristic, generateSuccessors };
