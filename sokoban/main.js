'use strict';


var EMPTY = {
    num: 0,
    symbol: '',
    className: 'empty'
};
var WALL = {
    num: 1,
    symbol: '',
    className: 'wall'
};
var BOX = {
    num: 2,
    symbol: '',
    className: 'box'
};
var PLAYER = {
    num: 10,
    symbol: '',
    className: 'player'
};
var TARGET = {
    num: 4,
    symbol: '',
    className: 'target'
};

var playerPosition = {
    row: 6,
    col: 2
};

var dimension;
var gBoard = [];

innitGame();
function innitGame() {
    //SOKOBAN = 'u+c6c3;';


    dimension = {
        WIDTH: 20,
        HEIGHT: 20
    };
    gBoard = [];

    buildBoard();
    renderBoard();
}

function buildBoard() {
    gBoard = [
        [ WALL.num, WALL.num, WALL.num, WALL.num , WALL.num , WALL.num , WALL.num , WALL.num , WALL.num ],
        [ WALL.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, EMPTY.num, TARGET.num, WALL.num , WALL.num],
        [ WALL.num, TARGET.num, EMPTY.num, EMPTY.num, EMPTY.num, TARGET.num , WALL.num, WALL.num, WALL.num],
        [ WALL.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, BOX.num, WALL.num, WALL.num, WALL.num ],
        [ WALL.num, TARGET.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, WALL.num, WALL.num, WALL.num],
        [ WALL.num, EMPTY.num, WALL.num, EMPTY.num, BOX.num, EMPTY.num, WALL.num, WALL.num, WALL.num],
        [ WALL.num, EMPTY.num, PLAYER.num, BOX.num, EMPTY.num, EMPTY.num, WALL.num, WALL.num, WALL.num],
        [ WALL.num, EMPTY.num, EMPTY.num, EMPTY.num, BOX.num, EMPTY.num, EMPTY.num, WALL.num, WALL.num],
        [ WALL.num, WALL.num, WALL.num, WALL.num , WALL.num , WALL.num , WALL.num , WALL.num , WALL.num ],
    ];
    console.log(gBoard);
}

function renderBoard() {
    var strHTML = '';
    var className = "";
    for( var i = 0; i < gBoard.length; i++ ){
        strHTML += '<tr>';
        for( var j = 0; j < gBoard[i].length; j++ ){
            if( gBoard[i][j] === EMPTY.num ){
                className = 'empty';
            } else if( gBoard[i][j] ===  WALL.num){
                className = 'wall';
            } else if( gBoard[i][j] === BOX.num ){
                className = 'box';
            } else if( gBoard[i][j] === PLAYER.num ){
                className = 'player';
            } else if( gBoard[i][j] === TARGET.num ){
                className = 'target';
            }
            strHTML += '<td class="'+className+'" id="cell-' + i + '-' + j + '"></td>';
        }
        strHTML += '</tr>';
    }
    //alert(strHTML);
    document.querySelector('.table').innerHTML = strHTML;
}

function move( direction ) {

    if( isValidMove( direction )) {
        // set current player to empty
        gBoard[ playerPosition.row ][playerPosition.col] = EMPTY.num;

        // change the td's class to 'empty'
        var elId = '#cell-' + playerPosition.row + '-' + playerPosition.col;
        document.querySelector( elId ).className = 'empty';

        // set player new position
        if (direction === 'right') {
            playerPosition.col++;
        } else if (direction === 'left') {
            playerPosition.col--;
        } else if (direction === 'up') {
            playerPosition.row--;
        } else if (direction === 'down') {
            playerPosition.row++;
        }

        // check if new position is BOX position
        if(gBoard[ playerPosition.row ][playerPosition.col] === BOX.num) {
            var nextBoxCol = playerPosition.col;
            var nextBoxRow = playerPosition.row;
            // define the new box position
            if (direction === 'right') {
                nextBoxCol++;
            } else if (direction === 'left') {
                nextBoxCol--;
            } else if (direction === 'up') {
                nextBoxRow--;
            } else if (direction === 'down') {
                nextBoxRow++;
            }
            // update the board and DOM cell
            gBoard[ nextBoxRow ][nextBoxCol] = BOX.num;
            elId = '#cell-' + nextBoxRow + '-' + nextBoxCol;
            document.querySelector( elId ).className = 'box';
        }

        // update the board with the new player position
        gBoard[ playerPosition.row ][playerPosition.col] = PLAYER.num;

        // render the dom
        elId = '#cell-' + playerPosition.row + '-' + playerPosition.col;
        document.querySelector( elId ).className = 'player';
        console.log(gBoard);
    }
}

function isValidMove( direction ) {
    var nextPlayerRow = playerPosition.row;
    var nextPlayerCol = playerPosition.col;
    // define player's next position
    if (direction === 'right') {
        nextPlayerCol++;
    } else if (direction === 'left') {
        nextPlayerCol--;
    } else if (direction === 'up') {
        nextPlayerRow--;
    } else if (direction === 'down') {
        nextPlayerRow++;
    }

    // player can move to empty or target
    if( gBoard[ nextPlayerRow ][nextPlayerCol] === EMPTY.num || gBoard[ nextPlayerRow ][nextPlayerCol] === TARGET.num ){
        return true;
    } else if(gBoard[ nextPlayerRow ][nextPlayerCol] === BOX.num) {
        // if player encounter a box, we check that the box can move
        var nextBoxCol = nextPlayerCol;
        var nextBoxRow = nextPlayerRow;
        if (direction === 'right') {
            nextBoxCol++;
        } else if (direction === 'left') {
            nextBoxCol--;
        } else if (direction === 'up') {
            nextBoxRow--;
        } else if (direction === 'down') {
            nextBoxRow++;
        }
        // box can move to empty or target
        if( gBoard[ nextBoxRow ][nextBoxCol] === EMPTY.num || gBoard[ nextBoxRow ][nextBoxCol] === TARGET.num ){
            return true;
        }
    }
    return false;
}

function getCellCoords( elId ) {
    var cellCoords = elId.split( '-' );
    cellCoords.shift();
    cellCoords[0] = parseInt( cellCoords[0] );
    cellCoords[1] = parseInt( cellCoords[1] );
    return cellCoords;
}