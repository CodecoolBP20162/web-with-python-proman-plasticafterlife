/**
 * Created by keli on 2017.03.20..
 */

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.boardId = boardDate.valueOf();
    this.boardTitle = boardTitle;
    this.statusList = [1, 2, 5];
}

// object example
var boardOne = new Board('My first board');
console.log(boardOne.boardTitle);
console.log(boardOne.statusList);
console.log(boardOne.boardId);

var boardTwo = new Board('Second board')


//functions for localStorage

function readLocal(boardID) {
    var ID = boardID;
    var retrieve = JSON.parse(localStorage.getItem(ID));
    return retrieve;
}

function saveLocal(boardObject) {
    var boardJS = JSON.stringify(boardObject);
    var ID = boardObject.boardId
    localStorage.setItem(ID, boardJS);
}

//example
saveLocal(boardOne);
var One = readLocal(boardOne.boardId);
One.statusList.push("jeee");
saveLocal(One);

saveLocal(boardTwo);
readLocal(boardTwo);