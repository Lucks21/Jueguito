import Board from '../board.js';

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
    // Implementa tu función heurística
    return 0; // Placeholder
}

function generateSuccessors(board) {
    // Genera los estados sucesores
    return []; // Placeholder
}
// Prueba temporal
const testBoard = new Board();
console.log("Prueba del algoritmo A*:", aStarSolver(testBoard));

export default aStarSolver;
