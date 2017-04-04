function LocalStorage() {
    this.save = function (boardObject) {
        var boardJS = JSON.stringify(boardObject);
        var ID = boardObject.boardId;
        localStorage.setItem(ID, boardJS);
    };
    this.read = function () {
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

