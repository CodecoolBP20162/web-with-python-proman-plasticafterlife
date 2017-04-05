// Card constructor
function Card() {
    this.cardDate = new Date();
    this.cardId = this.cardDate.valueOf();
    this.content = "";
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

        $statusClass.append("<p class='form-group' type='text' placeholder='Add a new task' id='"
            + inputId + "'>" + cardContent + "</p>");
        };


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


$(document).ready(function() {
    $('#saveToNew').click(function() {
        $('#ee').fadeOut('slow');
    });
});

var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}