/**
 * Created by keli on 2017.03.20..
 */

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.boardId = boardDate.valueOf();
    this.boardTitle = boardTitle;
    this.statusList = [];
}

// object example
var boardOne = new Board('My first board');
console.log(boardOne.boardTitle);
console.log(boardOne.statusList);
console.log(boardOne.boardId);
