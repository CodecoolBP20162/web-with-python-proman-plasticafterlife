
// state_pattern
var state = new Database();

// LocalStorage

function LocalStorage() {
    this.readBoard = function () {
        var boards = [];
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
                boards.push(element);
            }
        }
        return boards;
    };

    this.readCard = function (boardId) {
        let boards = this.readBoard();
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].id === parseInt(boardId)) {
                return boards[i].cardList;
            }
        }
    };

    this.addCards = function (boardObjectId, successCallback) {
        var newCard = new Card()
        var content = $('#newStatusTask').val();
        newCard.content = content;
        var board = JSON.parse(localStorage.getItem(boardObjectId));
        board.cardList.push(newCard);
        var boardJs = JSON.stringify(board);
        localStorage.setItem(boardObjectId, boardJs);
        successCallback();
    };

    this.addNewBoards = function (boardTitle, successCallback) {
        var boardObject = new Board(boardTitle)
        var boardJS = JSON.stringify(boardObject);
        localStorage.setItem(boardObject.id, boardJS)
        successCallback();
    };


};

// Database

function Database() {
    this.readBoard = function () {
        var boardList = [];
        $.ajax({
            url: '/get-boards',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                for (var prop in data) {
                    for (var board in data[prop]) {
                        boardList.push(data[prop][board]);
                    }
                }
            },
            error: function (err) { console.log(err) }
        });
        return boardList
    };

    this.readCard = function (boardId) {
        var cardList = [];
        $.ajax({
            url: '/get-cards/' + boardId,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                cardList = data;
            },
            error: function (data) { console.log(data) }
        });
        return cardList;
    }

    this.addCards = function (boardId, successCallback) {
        $.ajax({
            url: '/post-cards',
            type: 'POST',
            dataType: 'json',
            data: {
                content: $('#newStatusTask').val(),
                status: 'New',
                board_id: boardId
            },
            success: function (data) {
                successCallback();
            },
            error: function (data) {
                console.log('error' + data.status);
            }
        })
    }

    this.addNewBoards = function (inputBoardsTitle, successCallback) {
        $.ajax({
            url: '/post-boards',
            type: 'POST',
            dataType: 'json',
            data: {
                title: inputBoardsTitle
            },
            success: function (data) {
                successCallback();
            },
            error: function (data) {
                console.log('error' + data.status);
            }
        });
    }

}

// Card constructor
function Card() {
    this.cardDate = new Date()
    this.cardId = this.cardDate.valueOf();
    this.content = "";
    this.status = "New";

}

// Board constructor
function Board(boardTitle) {
    var boardDate = new Date();
    this.state = state;
    this.id = boardDate.valueOf();
    this.title = boardTitle;
    this.cardList = [];
}

// Include the common functions
function Controller() {

    this.getBoardObjById = function (boardObjectId) {
        var boards = state.readBoard();
        var currentBoardObject = "";
        for (var board in boards) {
            if (boards[board].id === boardObjectId) {
                currentBoardObject = boards[board]
            }
        }
        return currentBoardObject;
    };
    this.insertNewBoard = function (boardObject) {
        var newBoardParagraph = $('<p>').attr('id', boardObject.id).text(boardObject.title);
        var boardButton = $('<button>').attr('data-boardId', boardObject.id).attr('class', 'btn btn-default').
            text('Details');
        var newDiv = $('<div>').append(newBoardParagraph, boardButton);
        $('#boards').append(newDiv);
    };

    this.listBoards = function (boardsList) {
        for (var i = 0; i < boardsList.length; i++) {
            var board = boardsList[i];
            this.insertNewBoard(board);
        }
    };

    this.getBoardById = function (boardsArray, boardId) {
        for (let i = 0; i < boardsArray.length; i++) {
            if (boardsArray[i].id == boardId) {
                return boardsArray[i];
            }
        }
    };

    this.insertCards = function (cardObject) {
        var newDiv = $('<div>').append($('<p>').text(cardObject.content));
        $('#new-cards').append(newDiv);
    };

    this.listCards = function (cardList) {
        $("#new-cards").empty();
        console.log(cardList);
        for (let i = 0; i < cardList.length; i++) {
            this.insertToBody(cardList[i]);
        }
    };

    this.addContentToCard = function () {
        var cardObj = new Card();                                       // create a card object
        cardObj.content = $('#newStatusTask').val();
        return cardObj;
    };

    this.insertToBody = function (cardObject) {
        var card = $('<p>').attr('data-cardid', cardObject.cardId).text(cardObject.content);
        $('#new-cards').append($('<div>').append(card));
    };

}

$(document).ready(function () {
    var controller = new Controller();
    var boardsArray = state.readBoard();    // global boards objects
    var currentBoardObject;  // this will be the current boardObject

    var getBoards = function () {    // call automatically
        $('.cards').hide(); // hide by default
        controller.listBoards(boardsArray);
    }();


    $('#addNewBoards').click(function insertNewBoards() {   // save it too
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = state.addNewBoards(inputBoardsTitle, function () {
            boardsArray = state.readBoard();
            $("#boards").empty();
            for (let i = 0; i < boardsArray.length; i++) {
                controller.insertNewBoard(boardsArray[i]);
            }
            $('#newBoard').val('');
        });
    });

    $("#boards").on('click', 'button', function switchToCards() {
        $('.boards').hide();
        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.cards').fadeIn();
        var boardId = $(this).attr('data-boardid');
        currentBoardObject = controller.getBoardById(boardsArray, boardId);
        var cardList = state.readCard(boardId);
        controller.listCards(cardList);
    });

    $('#saveToNew').click(function insertNewCards() {    // save it too
        state.addCards(currentBoardObject.id, function () {
            var cardList = state.readCard(currentBoardObject.id);
            controller.listCards(cardList);
            $('#newStatusTask').val('');
        });
    });

    $('#back-to-boards').click(function switchBackBoards() {
        $('.cards').hide();
        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.boards').fadeIn();
    });
});


