// status constructor
// function Status(statusTitle) {
//     this.statusTitle = statusTitle;
//     this.cardList = [];
// };

// Card constructor
function Card(content) {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
    this.status = "new";
}

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.boardId = boardDate.valueOf();
    this.boardTitle = boardTitle;
    this.cardList = [];
}


// minden boardnak legyen egy global változoja
// $.addNewBoards();
// $.dasd(function () {});
// $('<div>').append('ezt appendeli');
//
// $('<div>').attr('class', 'aasd');
// $('<div>').attr('id', '123');


// Include the common functions
function Controller(){
    this.addNewBoards  = function (boardTitle) {
        var newBoard = new Board(boardTitle);
        return newBoard
    };

    this.checkLocalStorage = function (){
        var boards = [];
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
                boards.push(element);
                }
            }
            return boards;
    };

    // NEW!!
    this.saveCardToLocal = function (board, card) {
        board.cardList.push(card);
        this.saveToLocal(board);
    };

    this.saveToLocal = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);
    };

    this.insertNewBoard = function (boardObject) {  // overwrite it
        var newBoardParagraph = $('<p>').attr('id', boardObject.boardId).text(boardObject.boardTitle);
        var boardButton = $('<button>').attr('data-boardId', boardObject.boardId).attr('class', 'btn btn-default').
        text('Details');
        var newDiv = $('<div>').append(newBoardParagraph, boardButton);
        $('#boards').append(newDiv);
    };

    this.listBoards = function (boardsList){
        for (var i = 0; i < boardsList.length; i++) {
            var board = boardsList[i];
            this.insertNewBoard(board);
        }
    };

    this.getBoardById = function (boardsArray, boardId) {
        for (i = 0; i < boardsArray.length; i++) {
            if (boardsArray[i].boardId == boardId) {
                return boardsArray[i];
            }
        }
    };

    // NEW!!
    this.insertCards = function (card) {
        var newDiv = $('<div>').append($('<p>').text(card.content));
        $('#new-elements').append(newDiv);
    };

    // NEW!!
    this.listCards = function(boardObject){
        for (i = 0; i < boardObject.cardList.length; i++){
            this.insertCards(boardObject.cardList[i]);
        }
    };

    this.readLocal = function (boardID) {
        var ID = boardID;
        var retrieve = JSON.parse(localStorage.getItem(ID));
        return retrieve;
    };

    this.saveLocal = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);
    };

    this.addContentToCard = function () {
        var cardObj = new Card();                                       // create a card object
        var cardContent = $('#newStatusTask').val();
        cardObj.content = cardContent;
        return cardObj
    };

    this.insertToBody = function (cardObject) {
        var card = $('<p>').attr('data-cardid', cardObject.cardId).text(cardObject.content);
        $('#new-elements').append($('<div>').append(card));
    };
}

var cont = new Controller(); // instance
function getBoardObject(boardId){
    var cont = new Controller();
    var currentObject = cont.readLocal(boardId);
    return currentObject
}


// anonym function like this:
function clearScreen(boardId){
    var boardObject = getBoardObject(boardId);
    var cardsContent = "<div style='display: inline-block;'><div class='status'><h4 class='modal-header' id='"+ boardObject.boardId + "'>" +
        "<strong>" + boardObject.boardTitle +"</strong></h4><label class='control-label'>" +
        "<input class='form-group' type='text' placeholder='Add a new task' id='newStatusTask'></label>" +
        "<div id='newStatus'><button type='button' class='btn btn-success' id='saveToNew' " +
        "onclick='saveCard(" + boardObject.boardId + ")'>Save</button> </div></div>";
    $("div").html(cardsContent);
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
    var boardsArray = controller.checkLocalStorage();    // global boards objects
    var currentBoardObject;  // this will be the current boardObject

    controller.listBoards(boardsArray);

    $('.cards').hide(); // hide by default

    $('#addNewBoards').click(function(){
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = controller.addNewBoards(inputBoardsTitle);
        boardsArray.push(addedBoard);    // add boards to the global array

        controller.insertNewBoard(addedBoard);
        controller.saveToLocal(addedBoard);
    });

    $("#boards").on('click', 'button', function switchToCards (){ // NEW!!
        $('.boards').hide();
        $('.cards').fadeIn();
        var boardId = $(this).attr('data-boardid');
        currentBoardObject = controller.getBoardById(boardsArray, boardId);
        //var searchedBoard = controller.getBoardById(boardsArray, boardId);
        controller.listCards(currentBoardObject);
    });



    $('#saveToNew').click(function(){
        var currentCardObject = controller.addContentToCard();
        // controller.insertToBody(currentCardObject); ehelyett kilistázhatná újra
        controller.saveCardToLocal(currentBoardObject, currentCardObject);
        // currentBoardObject.cardList.push(currentCardObject);
        controller.listCards(currentBoardObject);   // ez igy mukodik, de elotte kell még egy remove!!
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

