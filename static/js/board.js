// status constructor
// function Status(statusTitle) {
//     this.statusTitle = statusTitle;
//     this.cardList = [];
// };

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
        // var newStatus = new Status("new");
        // var planningStatus = new Status("planning");
        // var inprogressStatus = new Status("inprogress");
        // var doneStatus = new Status("done");
    this.cardList = [];
        // this.statusList = [newStatus, planningStatus, inprogressStatus, doneStatus]

}

// Include the common functions
function Controller(){
    this.addNewBoards  = function (boardTitle) {
        var newBoard = new Board(boardTitle);
        return newBoard};

    this.checkLocalStorage = function (){
        var boards = [];
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
                boards.push(element);
                }
            }
            return boards;};

    this.saveToLocal = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);};

    this.insertNewBoard = function (boardObject) {
        $('#addNewBoards').after("<div><p id='" + boardObject.boardId + "'>" +
            boardObject.boardTitle + "</p><button id='details_"+ boardObject.boardId + "' onclick='clearScreen(" + boardObject.boardId
            + " )'>Details" +
            "</button></div>");};

    this.listBoards = function (boardsList){
        for (var i = 0; i < boardsList.length; i++) {
            var board = boardsList[i];
            this.insertNewBoard(board);}};


    this.readLocal = function (boardID) {
        var ID = boardID;
        var retrieve = JSON.parse(localStorage.getItem(ID));
        console.log(retrieve);
        return retrieve;}

    this.saveLocal = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);}

    this.addContentToCard = function (boardObject) {
        var userInput = document.getElementById('newStatusTask');           // select the input field element
        var cardObj = new Card();                                       // create a card object
        boardObject.cardList.push(cardObj);
        cardObj.content += userInput.value;
        return cardObj
        };

    this.insertToBody = function (boardObject, cardObject) {
        var $statusClass = $("#saveToNew");

        $statusClass.after("<div><p class='form-group' type='text' style='text-align: center' placeholder='Add a new task' id='"
            + cardObject.cardId + "'>" + cardObject.content + "</p><div>")
        };
}

var cont = new Controller(); // instance
function getBoardObject(boardId){
    var cont = new Controller();
    var currentObject = cont.readLocal(boardId);
    return currentObject
}

function clearScreen(boardId){
    var boardObject = getBoardObject(boardId);
    $("div").html(boardObject.boardTitle);
    var cardsContent = "<div style='display: inline-block;'><div class='status'><h4 class='modal-header' id='"+ boardObject.boardId + "'>" +
        "<strong>New status</strong></h4><label class='control-label'>" +
        "<input class='form-group' type='text' placeholder='Add a new task' id='newStatusTask'></label>" +
        "<div id='newStatus'><button type='button' class='btn btn-success' id='saveToNew' " +
        "onclick='saveCard(" + boardObject.boardId + ")'>Save</button> </div></div>";
    $(".container-fluid").append(cardsContent);
}

function saveCard(boardId) {
    var boardObject = getBoardObject(boardId);
    var cardObject = cont.addContentToCard(boardObject);
    boardObject.cardList.push(cardObject);
    cont.insertToBody(boardObject, cardObject);
    cont.saveLocal(boardObject);
}

// Call the functions
$(document).ready(function () {

    var controller = new Controller();
    var boardObjects = controller.checkLocalStorage();
    controller.listBoards(boardObjects);

    $('#addNewBoards').click(function(){
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = controller.addNewBoards(inputBoardsTitle);
        controller.insertNewBoard(addedBoard);
        controller.saveToLocal(addedBoard);
        });

});

// cards.html
function dropDownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
