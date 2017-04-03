// Card constructor
function Card() {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
    this.status = 'new';
}

// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = [];
};

$(document).ready(function () {
    var newStatus = new Status("new");
    var planningStatus = new Status("planning");
    var inprogressStatus = new Status("inprogress");
    var doneStatus = new Status("done");

    // define 3 card object, fill the content and add to the example status object cardList
    var exampleCard = new Card();
    var exampleCard2 = new Card();
    var exampleCard3 = new Card();

    exampleCard.content = "proba task";
    exampleCard2.content = "proba task2";
    exampleCard3.content = "proba task3";

    doneStatus.cardList.push(exampleCard);
    doneStatus.cardList.push(exampleCard2);
    newStatus.cardList.push(exampleCard3);



    var addContentToCard = function (status) {
        var chosenStatus = status.statusTitle + 'StatusTask';
        var userInput = document.getElementById(chosenStatus);           // select the input field element
        var cardObj = new Card();                                       // create a card object
        cardObj.content += userInput.value;
        return cardObj
        };

    var insertToBody = function (status, cardObject) {
        var chosenStatusId = ".container_status_" + status.statusTitle;
        var $statusClass = $(chosenStatusId);
        var inputId = cardObject.cardId; // the current task id
        var cardContent = cardObject.content;

        // $statusClass.prepend("<p class='form-group' type='text' placeholder='Add a new task' id='"
        //     + inputId + "'>" + cardContent + "</p>");

        $statusClass.append("<p class='form-group' type='text' placeholder='Add a new task' id='"
            + inputId + "'>" + cardContent + "</p>")
        };

    var listCards = function (statusObject) {
        for (var i = 0; i < statusObject.cardList.length; i++) {
            console.log(statusObject.cardList[i]);
            insertToBody(statusObject, statusObject.cardList[i])

            $statusClass.append("<p class='form-group' type='text' placeholder='Add a new task' id='"
            + inputId + "'>" + cardContent + "</p>");
        };
    };

    // call the listCard with the example statusObject
    listCards(doneStatus);
    listCards(newStatus);

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




