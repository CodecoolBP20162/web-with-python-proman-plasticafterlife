// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = new Card();
};

//Criterium list

var criteriumList = ['New', 'In progress', 'Review', 'Done'];

//status list
var statusNew = new Status(criteriumList[0]);
var statusProgress = new Status(criteriumList[1]);
var statusReview = new Status(criteriumList[2]);
var statusDone = new Status(criteriumList[3]);

//Card separator
function getDataToStatus(data){

    switch(data) {
        case criteriumList[1]:
            alert('case 1');
            break;
        case criteriumList[2]:
            alert('case 2');
            break;
        case criteriumList[3]:
            alert('case 3');
            break;
        default:
            alert('default');

    }
}




