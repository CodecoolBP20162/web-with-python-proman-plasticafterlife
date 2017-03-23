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

// Include the common functions
function Controller(){
    this.addNewBoards  = function (boardTitle) {
        var newBoard = new Board(boardTitle);
        return newBoard;};

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
            boardObject.boardTitle + "</p></div>");};

    this.listBoards = function (boardsList){
        for (var i = 0; i < boardsList.length; i++) {
            var board = boardsList[i];
            this.insertNewBoard(board);}};
}

// Call the functions
$(document).ready(function () {
    // var elsoBoard = new Board("masodik board");
    // saveLocal(elsoBoard);
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
