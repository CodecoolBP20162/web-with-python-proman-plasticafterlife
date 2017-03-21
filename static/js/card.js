
// Card constructor
function Card(cardTitle) {
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

    var saveCard = function(statusObj, cardObject) {        // Save card in status function
        statusObj.cardList.push(cardObject);
    };

    var addContentToCard = function(cardObj, content) {     // add content to the cardObj - ect
        cardObj.content += content.value;
    };

    var $saveButton = $("#save_button");    // select the save_button then call the saveCard function
    $saveButton.click(function () {
        var inputTask = document.getElementById('new_task');      // select the input field element
        addContentToCard(card, inputTask);                  // save to content

        saveCard(newStatus, card);

        console.log(newStatus.cardList);
        console.log("Save something");
    });    // end of save function

});



