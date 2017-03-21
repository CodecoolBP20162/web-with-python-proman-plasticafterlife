
// status constructor
function Status(statusTitle) {
    this.statusTitle = statusTitle;
    this.cardList = [3, 5];
};

//status example
var statusOne = new Status('First status');
console.log(statusOne.statusTitle);
console.log(statusOne.cardList);
