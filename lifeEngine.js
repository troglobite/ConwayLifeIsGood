// get valid gameboard
// get the deminsions of the game board
// find where you are on the game board
// get the state of the tile you are at
// find all neighbors for any apot on the board
// collect state of neighbors
// get number of alive neighbors for any spot on the board
// determine the state of the tile based on the state of its neighbors
// apply state change if required by rules
// go to next tile
var gameBoard = [
    [1, 0, 1, 1],
    [0, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0]
]

function playGame(board) {
    var newBoard = [];

    for (var a = 0; a < board.length; a++) {
        newBoard.push([]);
        for (var b = 0; b < board[a].length; b++) {
            //console.log("(" + a + "," + b + ")");
            var currentState = getStateAt(board, a, b);
            //console.log(getStateAt(board, a, b));
            var neighbors = findNeighborsOf(a, b);
            var stateOfNeighbors = neighbors.map(function(neighbor) {
                return getStateAt(board, neighbor[0], neighbor[1]);
            });
            var numOfAlive = sumOf(stateOfNeighbors);
            //console.log(numOfAlive);
            var newState = nextState(currentState, numOfAlive);
            //console.log(newState);
            newBoard[a][b] = newState;
        }
    }
    return newBoard;
}

function printBoard(newBoard) {
    console.log(newBoard.join("\n"));
}

function nextState(current, countOfAlive) {
    var state = 0;
    if (current == 1 && countOfAlive < 2) {
        state = 0;
    }
    if (current == 1 && countOfAlive === 2 || countOfAlive === 3) {
        state = 1;
    }
    if (current == 1 && countOfAlive > 3) {
        state = 0;
    }
    if (current == 0 && countOfAlive === 3) {
        state = 1;
    }
    return state;
}

function findNeighborsOf(a, b) {
    var arrOfNeighbors = [];
    for (var rows = a - 1; rows <= a + 1; rows++) {
        for (var columns = b - 1; columns <= b + 1; columns++) {
            if (rows === a && columns === b) {
                continue;
            }
            arrOfNeighbors.push([rows, columns]);
        }
    }
    return arrOfNeighbors;
}

function getStateAt(board, row, column) {
    return board && board[row] && board[row][column] || 0;
}

function sumOf(array) {
    var total = 0;
    array.forEach(function(number) {
        total += number;
    });
    return total;
}

for (var i = 0; i < 5; i++) {
    gameBoard = playGame(gameBoard);
    console.log(" ");
    printBoard(playGame(gameBoard));
}