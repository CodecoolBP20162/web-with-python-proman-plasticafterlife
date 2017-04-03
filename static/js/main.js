// Card constructor
function Card() {
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

    this.insertCards = function (cardObject) {
        var newDiv = $('<div>').append($('<p>').text(cardObject.content));
        $('#new-cards').append(newDiv);
    };

    this.listCards = function(boardObject){
        for (i = 0; i < boardObject.cardList.length; i++){
            console.log(boardObject.cardList[i]);
            this.insertToBody(boardObject.cardList[i]);
        }
    };

    this.addContentToCard = function () {
        var cardObj = new Card();                                       // create a card object
        cardObj.content = $('#newStatusTask').val();
        return cardObj
    };

    this.insertToBody = function (cardObject) {
        var card = $('<p>').attr('data-cardid', cardObject.cardId).text(cardObject.content);
        $('#new-cards').append($('<div>').append(card));
    };

}

$(document).ready(function () {
    var controller = new Controller();
    var boardsArray = controller.checkLocalStorage();    // global boards objects
    var currentBoardObject;  // this will be the current boardObject

    var getBoards = function (){    // call automatically
        $('.cards').hide(); // hide by default
        controller.listBoards(boardsArray);
    }();

    $('#addNewBoards').click(function insertNewBoards (){   // save it too
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = controller.addNewBoards(inputBoardsTitle);
        boardsArray.push(addedBoard);    // add boards to the global array

        controller.insertNewBoard(addedBoard);
        controller.saveToLocal(addedBoard);
    });

    $("#boards").on('click', 'button', function switchToCards (){
        $('.boards').hide();

        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.cards').fadeIn();
        var boardId = $(this).attr('data-boardid');
        currentBoardObject = controller.getBoardById(boardsArray, boardId);
        controller.listCards(currentBoardObject);
    });

    $('#saveToNew').click(function insertNewCards (){    // save it too
        var currentCardObject = controller.addContentToCard();
        controller.insertToBody(currentCardObject);
        controller.saveCardToLocal(currentBoardObject, currentCardObject);
        currentBoardObject.cardList.push(currentCardObject);
    });

    $('#back-to-boards').click(function switchBackBoards (){
        $('.cards').hide();
        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.boards').fadeIn();
    });

});
