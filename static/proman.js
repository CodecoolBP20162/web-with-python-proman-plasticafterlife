/**
 * Created by keli on 2017.03.20..
 */

// Board constructor
function Board(boardTitle) {
    this.boardTitle = boardTitle;
    this.cardList = [];
}

// object example
var boardOne = new Board('My first board');
console.log(boardOne.boardTitle);
console.log(boardOne.cardList);

// Card constructor
function Card(cardTitle) {
    this.cardTitle = cardTitle;
    this.content = [];
    this.date = Date();
    this.status = "new";
}

Card.prototype = new Board();

//object example
var card = new Card('First card')
console.log(card.status);
console.log(card.date);