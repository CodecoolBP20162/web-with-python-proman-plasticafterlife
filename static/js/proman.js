/**
 * Created by keli on 2017.03.20..
 */

// Board constructor
function Board(boardTitle){
    this.boardTitle = boardTitle;
    this.cardList = [];
}

// object example
var boardOne = new Board('My first board');
console.log(boardOne.boardTitle);
console.log(boardOne.cardList);
