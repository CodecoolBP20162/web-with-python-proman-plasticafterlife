
// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = [];
};


// Card constructor
function Card() {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
};

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.boardId = boardDate.valueOf();
    this.boardTitle = boardTitle;
    var newStatus = new Status("new");
    var planningStatus = new Status("planning");
    var inprogressStatus = new Status("inprogress");
    var doneStatus = new Status("done");
    this.statusList = [newStatus, planningStatus, inprogressStatus, doneStatus]
}

// object example
var boardOne = new Board('My first board');
console.log(boardOne.boardTitle);
console.log(boardOne.statusList);
console.log(boardOne.boardId);
console.log(boardOne.statusList);

var boardTwo = new Board('Second board')


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

$(document).ready(function () {
    function listBoards() {
        for (var key in localStorage) {
            var board = readLocal(key);
            $("#board").append("<div id='boardTitle'>" + board.boardTitle + "</div>");
            $("#card_details").click(function () {
                $("div").html(board.statusList);
                console.log(board.length)
            });


        };
    };

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
        var cardContent = cardObject.content;

        $statusClass.prepend("<p class='form-group' type='text' placeholder='Add a new task' id='"
            + "valami" + "'>" + cardContent + "</p>");
    };


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






//example
// saveLocal(boardOne);
// var One = readLocal(boardOne.boardId);
// One.statusList.push("jeee");
// saveLocal(One);

// saveLocal(boardTwo);
// readLocal(boardTwo);



function createBoard() { }

