// Card constructor
function Card() {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
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





// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = new Card();
};

//Criterium list

var criteriumList = ['New', 'In progress', 'Review', 'Done'];

//status list
var statusNew = new Status(criteriumList[0]);
var statusProgress = new Status(criteriumList[1]);
var statusReview = new Status(criteriumList[2]);
var statusDone = new Status(criteriumList[3]);

//Card separator
function getDataToStatus(data) {

    switch (data) {
        case criteriumList[1]:
            alert('case 1');
            break;
        case criteriumList[2]:
            alert('case 2');
            break;
        case criteriumList[3]:
            alert('case 3');
            break;
        default:
            alert('default');

    }
}



/**
 * Created by keli on 2017.03.20..
 */

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.boardId = boardDate.valueOf();
    this.boardTitle = boardTitle;
    this.statusList = new Status();
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
// saveLocal(boardOne);
// var One = readLocal(boardOne.boardId);
// One.statusList.push("jeee");
// saveLocal(One);

// saveLocal(boardTwo);
// readLocal(boardTwo);


$(document).ready(
    function listBoards() {
        for (var key in localStorage) {
            var board = readLocal(key);
            $("#board").append("<div id='boardTitle'>" + board.boardTitle + "</div>");
            $("button").click(function () {
                $("div").html(board.boardTitle);
                console.log(board.length)
            });


        };
    });




function createBoard() { }

