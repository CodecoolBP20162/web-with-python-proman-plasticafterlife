
// Card constructor
function Card() {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
}

// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = [];
};

//status and card instance
var newStatus = new Status('new');
var card = new Card('First card');

$(document).ready(function() {

    var addContentToCard = function() {
        var userInput = document.getElementById('new_task');            // select the input field element
        var cardObj = new Card();                                       // create a card object
        cardObj.content += userInput.value;
        return cardObj
    };

    var insertToBody = function(){
        var $statusClass = $("#new_status");
        $statusClass.prepend("<label class='control-label'><input class='form-group' type='text' placeholder='Add a new task' id='new_task'></label>");
    };

    $("button").click(function () {
        var cardObject = addContentToCard();                  // save to content
        console.log(cardObject.content)
        insertToBody();
    });



});





