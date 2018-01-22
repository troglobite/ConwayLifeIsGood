// // get valid gameboard
// // get the deminsions of the game board
// // find where you are on the game board
// // get the state of the tile you are at
// // find all neighbors for any apot on the board
// // collect state of neighbors
// // get number of alive neighbors for any spot on the board
// // determine the state of the tile based on the state of its neighbors
// // apply state change if required by rules
// // go to next tile
var gameBoard = makeBoard(15,15);
var boardInterval;
var score = 0;

function makeBoard(colSize, rowSize){
  var rows = [];
  for(var i = 0; i < colSize; i++){
    rows[i] = Array(rowSize).fill(0);
  }
  return rows;
}

function playGame(board) {
  var newBoard = [];

  for (var a = 0; a < board.length; a++) {
    newBoard.push([]);
    for (var b = 0; b < board[a].length; b++) {
      // console.log("(" + a + "," + b + ")");
      var currentState = getStateAt(board, a, b);
      // console.log(getStateAt(board, a, b));
      var neighbors = findNeighborsOf(a, b);
      var stateOfNeighbors = neighbors.map(neighbor => {
        return getStateAt(board, neighbor[0], neighbor[1]);
      });
      var numOfAlive = sumOf(stateOfNeighbors);
      // console.log(numOfAlive);
      var newState = nextState(currentState, numOfAlive);
      // console.log(newState);
      setStateAt(newBoard, a, b, newState);
      //newBoard[a][b] = newState;
    }
  }
  return newBoard;
}

function getCellCSSClass(cell) {
  if (cell === 1) {
    return "alive";
  } else {
    return "dead";
  }
}

const Cell = props => (
  <td
    className={getCellCSSClass(props.data)}
    onClick={() => props.onClick()}
  />
);

const TableRow = props => (
  // React.createElement("tr",{},row.map((cell) => React.createElement("td",{},cell)))
  <tr>
    {props.row.map((cell, colIndex) => {
      return <Cell key={colIndex} data={cell} onClick={() => props.onClick(colIndex)} />;
    })}
  </tr>
);

const Table = (props) => (
  <table>
    <tbody>
    {props.data.map((row, rowIndex) => {
      return <TableRow key={rowIndex} row={row} onClick={(colIndex) => flipRowCol(rowIndex, colIndex)}/>;
    })}
    </tbody>
  </table>
);

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>
};

const Header = (props) => {
  return <h3>{props.value}</h3>
};

//adding abiltiy to set variable TODO:
const IntervalInput = (props) => {
  return <h4>Interval Variable</h4><br><input type='text'></input>
}

function renderHTML(newBoard) {
  ReactDOM.render(<Header value={score} />, document.getElementById("scoreDiv"));
  ReactDOM.render(<Table data={newBoard} />, document.getElementById("root"));
  ReactDOM.render(<Button onClick={nextBoard} name="Next"/>, document.getElementById("nextBtn"));
  ReactDOM.render(<Button onClick={resetBoard} name="Reset"/>, document.getElementById("resetBtn"));
  ReactDOM.render(<Button onClick={callNextBoardContinously} name="Play" />, document.getElementById("playBtn"));
  ReactDOM.render(<Button onClick={stopNextBoardContinously} name="Stop" />, document.getElementById("stopBtn"));
  ReactDOM.render(<IntervalHeader />, document.getElementById("intervalDiv"));
}

function printBoard(newBoard) {
  console.log(newBoard.join("\n"));
}

function resetBoard(){
  gameBoard = makeBoard(15,15);
  score = 0;
  renderHTML(gameBoard);
  printBoard(playGame(gameBoard));
}

function callNextBoardContinously(){
    boardInterval = setInterval(() => {
      nextBoard();
    }, 1000);
}

function stopNextBoardContinously(){
  clearInterval(boardInterval);
}

function nextState(current, countOfAlive) {
  var state = 0;
  if (current == 1 && countOfAlive < 2) {
    state = 0;
  }
  if ((current == 1 && countOfAlive === 2) || countOfAlive === 3) {
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
  return (board && board[row] && board[row][column]) || 0;
}

function setStateAt(board, row, column, desiredState){
  board[row][column] = desiredState;
  return board;
}

function flipStateAt(board, row, column){
  const state = getStateAt(board, row, column);
  return setStateAt(board, row, column, state === 1 ? 0 : 1);
}

function sumOf(array) {
  var total = 0;
  array.forEach(function(number) {
    total += number;
  });
  return total;
}

function nextBoard() {
  gameBoard = playGame(gameBoard);
  score++;
  console.log(score);
  renderHTML(gameBoard);
  printBoard(playGame(gameBoard));
}

function flipRowCol(row, col){
  gameBoard = flipStateAt(gameBoard, row, col);
  renderHTML(gameBoard);
}

// for (var i = 0; i < 5; i++) {
//     gameBoard = playGame(gameBoard)
//     console.log(" ");
//     printBoard(playGame(gameBoard));
// }

renderHTML(gameBoard);
