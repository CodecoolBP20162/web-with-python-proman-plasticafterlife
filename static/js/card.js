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

$(document).ready(function () {
    var newStatus = new Status("new");
    var planningStatus = new Status("planning");
    var inprogressStatus = new Status("inprogress");
    var doneStatus = new Status("done");

    var addContentToCard = function (status) {
        var chosenStatus = status.statusTitle + 'StatusTask';
        var userInput = document.getElementById(chosenStatus);           // select the input field element
        var cardObj = new Card();                                       // create a card object
        cardObj.content += userInput.value;
        return cardObj
        };

    var insertToBody = function (status, cardObject) {
        var chosenStatusId = "#" + status.statusTitle + "Status";
        var $statusClass = $(chosenStatusId);
        var inputId = cardObject.cardId; // the current task id

        $statusClass.prepend("<label class='control-label'><input class='form-group' type='text' placeholder='Add a new task' id='"
            + inputId + "'></label>");
        };

    // var updateContent = function(cardId) {
    //     $('')
    // };

    $("#saveToNew").click(function (status) {
        var cardObject = addContentToCard(newStatus);
        insertToBody(newStatus, cardObject);
        });

    $("#saveToPlanning").click(function (status) {
        var cardObject = addContentToCard(planningStatus);
        insertToBody(planningStatus, cardObject);
        });

    $("#saveToInprogress").click(function (status) {
        var cardObject = addContentToCard(inprogressStatus);
        insertToBody(inprogressStatus, cardObject);
        });

    $("#saveToDone").click(function (status) {
        var cardObject = addContentToCard(doneStatus);
        insertToBody(doneStatus, cardObject);
        });
});









