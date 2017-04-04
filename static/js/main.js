
// state_pattern
var state = new LocalStorage();

// LocalStorage

function LocalStorage() {
    this.saveData = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.id;
        localStorage.setItem(ID, boardJS);
    };

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

    this.addCards = function (boardObjectId) {
        var controller = new Controller();
        var currentBoardObject = controller.getBoardObjById(boardObjectId);
        var currentCardObject = controller.addContentToCard();
        console.log(currentBoardObject);
        console.log(currentCardObject);
        controller.insertToBody(currentCardObject);
        controller.saveCardToLocal(currentBoardObject, currentCardObject);
        currentBoardObject.cardList.push(currentCardObject);
    };

    this.addNewBoards = function (boardTitle) {
        var newBoard = new Board(boardTitle);
        return newBoard
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
            error: function () { alert('error') }
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
                for (var prop in data) {
                    for (var card in data[prop]) {
                        cardList.push(data[prop][card]);
                    }
                }
            },
            error: function (data) { alert('error' + data) }
        });
        return cardList;
    }

    this.addCards = function (boardId) {
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
                alert('Yee' + data.status)
            },
            error: function (data) {
                alert('error' + data.status)
            }
        })
    }

    this.addNewBoards = function (inputBoardsTitle) {
        $.ajax({
            url: '/post-boards',
            type: 'POST',
            dataType: 'json',
            data: {
                title: inputBoardsTitle
            },
            success: function (data) {
                alert('Yee' + data.status)
            },
            error: function (data) {
                alert('error' + data.status)
            }
        })
    }

}

// Card constructor
function Card() {
    this.cardDate = new Date();
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

    // this.addNewBoards = function (boardTitle) {
    //     var newBoard = new Board(boardTitle);
    //     return newBoard
    // };

    this.saveCardToLocal = function (board, card) {
        board.cardList.push(card);
        state.saveData(board);
    };

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
        console.log(boardObject.id);

        // var cardList = state.readCard(boardObject.id);
        // this.listCards(cardList);
        // overwrite it
        if (state instanceof LocalStorage) {
            this.listCards(currentBoardObject.cardList)
            var newBoardParagraph = $('<p>').attr('id', boardObject.id).text(boardObject.title);
            var boardButton = $('<button>').attr('data-boardId', boardObject.id).attr('class', 'btn btn-default').
                text('Details');
            var newDiv = $('<div>').append(newBoardParagraph, boardButton);
            $('#boards').append(newDiv);
        }
        else {
            var newBoardParagraph = $('<p>').text(boardObject.title);
            var boardButton = $('<button>').attr('class', 'btn btn-default').
                text('Details');
            var newDiv = $('<div>').append(newBoardParagraph, boardButton);
            $('#boards').append(newDiv);
        }


    };

    this.listBoards = function (boardsList) {
        for (var i = 0; i < boardsList.length; i++) {
            var board = boardsList[i];
            this.insertNewBoard(board);
        }
    };

    this.getBoardById = function (boardsArray, boardId) {
        for (i = 0; i < boardsArray.length; i++) {
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
        for (i = 0; i < cardList.length; i++) {
            this.insertToBody(cardList[i]);
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
    var boardsArray = state.readBoard();    // global boards objects
    var currentBoardObject;  // this will be the current boardObject

    var getBoards = function () {    // call automatically
        $('.cards').hide(); // hide by default
        controller.listBoards(boardsArray);
    }();


    $('#addNewBoards').click(function insertNewBoards() {   // save it too
        var inputBoardsTitle = document.getElementById('newBoard').value;
        var addedBoard = state.addNewBoards(inputBoardsTitle);
        //boardsArray.push(addedBoard);
        console.log(boardsArray);
        // add boards to the global array
        var boardList = state.readBoard();
        console.log(boardList.length)
        $("#boards").empty();
        for (i = 0; i < boardList.length; i++) {
            controller.insertNewBoard(boardList[i]);
        }

        // state.saveData(addedBoard);

    });

    $("#boards").on('click', 'button', function switchToCards() {
        $('.boards').hide();
        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.cards').fadeIn();
        var boardId = $(this).attr('data-boardid');
        currentBoardObject = controller.getBoardById(boardsArray, boardId);

        if (state instanceof LocalStorage) {
            controller.listCards(currentBoardObject.cardList)
        }
        else {
            var cardList = state.readCard(boardId);
            controller.listCards(cardList);
        }
    });

    $('#saveToNew').click(function insertNewCards() {    // save it too
        state.addCards(currentBoardObject.id)
    });

    $('#back-to-boards').click(function switchBackBoards() {
        $('.cards').hide();
        $('#new-cards').empty();    // have to empty the new-cards elements
        $('.boards').fadeIn();
    });
});


