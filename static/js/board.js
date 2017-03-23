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

function Controller(){
    this.addNewBoards function addNewBoards(boardTitle) {
        var newBoard = new Board(boardTitle);
        return newBoard;
};
}



function checkLocalStorage(){
    var boards = [];
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var boardId = localStorage.key(i);
            var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //var boardObject = {boardId: element};

            boards.push(element);
            }
        }
    return boards;
};

function saveLocal(boardObject) {
    var boardJS = JSON.stringify(boardObject);
    var ID = boardObject.boardId;
    localStorage.setItem(ID, boardJS);
}

function insertNewBoard(boardObject) {
    $('#addNewBoards').after("<div><p id='" + boardObject.boardId + "'>" + boardObject.boardTitle + "</p></div>");
}

function listBoards(boardsList){
    for (var i = 0; i < boardsList.length; i++) {
        var board = boardsList[i];
        insertNewBoard(board);
    }
}


$(document).ready(function () {

    // var elsoBoard = new Board("masodik board");
    // saveLocal(elsoBoard);
    var boardObjects = checkLocalStorage();
    listBoards(boardObjects);

    $('#addNewBoards').click(function(){
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = addNewBoards(inputBoardsTitle);
        insertNewBoard(addedBoard);
        saveLocal(addedBoard);
        });


});


// for (var i = 0; i < statusObject.cardList.length; i++) {
//     console.log(statusObject.cardList[i]);
//     insertToBody(statusObject, statusObject.cardList[i])
// };

//
// $(document).ready(function () {
//
//     function listBoards() {
//         for (var key in localStorage) {
//             var board = readLocal(key);
//
//             $("#board").append("<div id='boardTitle'>" + board.boardTitle +
//                 "<button id='details_" + board.boardId + "' onclick='listStatus(this.id)'>Details</button>" +
//                 "</div>");
//
//             $("#card_details").click(function () {
//                 window.location.replace('http://127.0.0.1:5000/cards');
//                 // $("div").html(board.statusList);
//                 console.log(board.length)
//             });
//         };
//     };
//
//     listBoards();
//
//     // var listCards = function (statusObject) {
//     //     console.log(statusObject)
//     //     for (var i = 0; i < statusObject.cardList.length; i++) {
//     //         console.log(statusObject.cardList[i]);
//     //         insertToBody(statusObject, statusObject.cardList[i])
//     //     };
//     // };
//
//     var addContentToCard = function (status) {
//         var chosenStatus = status.statusTitle + 'StatusTask';
//         var userInput = document.getElementById(chosenStatus);           // select the input field element
//         var cardObj = new Card();                                       // create a card object
//         cardObj.content += userInput.value;
//         return cardObj
//     };
//
//     var insertToBody = function (status, cardObject) {
//         var chosenStatusId = "#" + status.statusTitle + "Status";
//         var $statusClass = $(chosenStatusId);
//         var inputId = cardObject.cardId; // the current task id
//         var cardContent = cardObject.content;
//
//         $statusClass.prepend("<p class='form-group' type='text' placeholder='Add a new task' id='"
//             + "valami" + "'>" + cardContent + "</p>");
//     };
//
//
//     $("#saveToNew").click(function (status) {
//         var cardObject = addContentToCard(newStatus);
//         insertToBody(newStatus, cardObject);
//     });
//
//     $("#saveToPlanning").click(function (status) {
//         var cardObject = addContentToCard(planningStatus);
//         insertToBody(planningStatus, cardObject);
//     });
//
//     $("#saveToInprogress").click(function (status) {
//         var cardObject = addContentToCard(inprogressStatus);
//         insertToBody(inprogressStatus, cardObject);
//     });
//
//     $("#saveToDone").click(function (status) {
//         var cardObject = addContentToCard(doneStatus);
//         insertToBody(doneStatus, cardObject);
//     });
// });

