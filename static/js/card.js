
// Card constructor
function Card(cardTitle) {
    this.cardTitle = cardTitle;
    this.content = "";
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.status = "New";
}


//object example
var card = new Card('First card')
console.log(card.status);
console.log(card.cardDate);
console.log(card.cardId);

