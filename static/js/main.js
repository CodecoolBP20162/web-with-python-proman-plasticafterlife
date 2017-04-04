
// state_pattern

// LocalStorage

function LocalStorage() {
    this.saveData = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);
    };

    this.readData = function () {
        var boards = [];
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
                boards.push(element);
            }
        }
        return boards;
    };

};


// Database

function Database() {
    // this.saveData = function (boardObject) {
    //     var id = $(this).attr('href');
    //     $.ajax({
    //         url: '/post',
    //         type: 'POST',
    //         success: function (data) {
    //             $("")
    //             return data;
    //         },
    //         error: function () {
    //             alert('failure');
    //         }
    //     });
    // };
    // this.readData = function () {
    //     var id = $(this).attr('href');
    //     $.ajax({
    //         url: '/boards',
    //         type: 'GET',
    //         success: function (data) {
    //             return data;
    //         },
    //         error: function () {
    //             alert('failure');
    //         }
    //     });
    // };
    this.readData = function(){
        var getBoards = this.getBoards();
        var boardList = [];

        getBoards.done(function(data){
            console.log('success');
            for (var prop in data){
                for (var board in data[prop]){
                    boardList.push(data[prop][board]);
                }
            }
            console.log(boardList);
            return boardList
        });
        // $.when(this.getBoards()).then(function(data){   // change this
        //     console.log('success');
        //     for (var prop in data){
        //         for (var board in data[prop]){
        //             boardList.push(data[prop][board]);
        //         }
        //     }
        //     console.log(boardList);
        //     return boardList
        // });
    };


    this.getBoards = function (){
        return $.ajax({
            url: '/get-boards',
            type: 'GET',
            dataType: 'json',
            success: function () {alert('Success')},
            error: function () {alert('error')}
        })
    };
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
        this.state = new Database();
        this.boardId = boardDate.valueOf();
        this.boardTitle = boardTitle;
        this.cardList = [];
    }

    // Include the common functions
    function Controller() {

        this.addNewBoards = function (boardTitle) {
            var newBoard = new Board(boardTitle);
            return newBoard
        };

        this.saveCardToLocal = function (board, card) {
            board.cardList.push(card);
            this.state.saveData(board);
        };


        this.insertNewBoard = function (boardObject) {  // overwrite it
            var newBoardParagraph = $('<p>').attr('id', boardObject.boardId).text(boardObject.boardTitle);
            var boardButton = $('<button>').attr('data-boardId', boardObject.boardId).attr('class', 'btn btn-default').
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

        this.listCards = function (boardObject) {
            for (i = 0; i < boardObject.cardList.length; i++) {
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
        var state = new Database();
        // var boardsArray = state.readData();    // global boards objects
        var boardsArray;
        $.when(state.readData()).then(function(data){
            boardsArray = data;
            console.log(data)
        });

         // global boards objects

        var currentBoardObject;  // this will be the current boardObject

        var getBoards = function () {    // call automatically
            $('.cards').hide(); // hide by default
            controller.listBoards(boardsArray);
        }();



        $('#addNewBoards').click(function insertNewBoards() {   // save it too
            var inputBoardsTitle = document.getElementById('newBoard').value;
            var addedBoard = controller.addNewBoards(inputBoardsTitle);
            boardsArray.push(addedBoard);    // add boards to the global array

            controller.insertNewBoard(addedBoard);
            addedBoard.state.saveData(addedBoard);
        });

        $("#boards").on('click', 'button', function switchToCards() {
            $('.boards').hide();

            $('#new-cards').empty();    // have to empty the new-cards elements
            $('.cards').fadeIn();
            var boardId = $(this).attr('data-boardid');
            currentBoardObject = controller.getBoardById(boardsArray, boardId);
            controller.listCards(currentBoardObject);
        });

        $('#saveToNew').click(function insertNewCards() {    // save it too
            var currentCardObject = controller.addContentToCard();
            controller.insertToBody(currentCardObject);
            controller.saveCardToLocal(currentBoardObject, currentCardObject);
            currentBoardObject.cardList.push(currentCardObject);
        });

        $('#back-to-boards').click(function switchBackBoards() {
            $('.cards').hide();
            $('#new-cards').empty();    // have to empty the new-cards elements
            $('.boards').fadeIn();
        });
    });
