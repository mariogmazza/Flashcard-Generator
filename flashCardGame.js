var inq = require('inquirer');
var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");

// var gameAns = [];

//##############################

var startGame = () => {
    inq.prompt([{
        type: "confirm",
        message: "Would you like to start the game? 'YES'=(only if you've already created the flash cards) 'NO'=(create flash cards)",
        name: "start",
        default: false

    }]).then(function (ans) {
        //if answer=true "start game" but flash card have not been created then ask for card info
        if (ans.start && (!cardsArrBasic.length <= 0 || !cardsArrCloze.length <= 0)) {
            // console.log("display");
            gameOption()
        } else {
            console.log("Let's start here!");
            gameCardBuilder();
        }
    })
}

//##############################

var gameCardBuilder = () => {
    inq.prompt([{
        type: "confirm",
        message: "Would you like to create a Basic Flashcard='Yes' or a Cloze Flashcard= 'NO':",
        name: "confirm",
        default: true
    }]).then( (ans)=> {

        if (ans.confirm) {
            basicGame();
        } else {
            clozeGame();
        }
    });
}

//##############################

var gameOption = () => {
    inq.prompt([{
        type: "confirm",
        message: "What game do you want to play Basic Flash Cards='Yes' or a Cloze Flash Cards='NO':",
        name: "confirm",
        default: true
    }]).then((ans)=> {

        if (ans.confirm) {
            gameDisplay(cardsArrBasic, "basic");
        } else {
            gameDisplay(cardsArrCloze, "cloze");
        }

    });
}

//##############################

var rightAns=0;
var wrongAns=0;

var gameDisplay = (arr, gType) => {

    if (gType == "basic") {
        var count2 = 0
        var printBasic = () => {
            if (count2 < arr.length) {
                inq.prompt([{
                    type: "input",
                    message: arr[count2].frontQ,
                    name: "userInput",
                }]).then((ans)=> {

                    if (ans.userInput == arr[count2].backQ) {
                        console.log("you got it!");
                        rightAns++;
                    }else{
                        console.log("no bueno!");
                        wrongAns++;
                    }
                    count2++;
                    printBasic();

                });

            }
        }
        printBasic();
    }

    if (gType == "cloze") {
        var count2 = 0
        var printCloze = () => {
            if (count2 < arr.length) {
                inq.prompt([{
                    type: "input",
                    message: arr[count2].partialQ,
                    name: "userInput",
                }]).then((ans)=> {

                    if (ans.userInput == arr[count2].clozeQ) {
                        console.log("you got it!");
                        rightAns++;
                    }else{
                        console.log("no bueno!");
                        wrongAns++;
                    }
                    count2++;
                    printCloze();

                });

            }
        }
        printCloze();
       
    }
        
}

// ################################

var cardsArrBasic = [];
var basicGame =()=> {

    inq.prompt([

        {
            type: "input",
            message: "Please enter the front of your card:",
            name: "front"
        },
        {
            type: "input",
            message: "Please enter the back of your card:",
            name: "back"
        }

    ]).then((answers)=> {

        var newCard = basicCard(answers.front, answers.back);

        cardsArrBasic.push({
            frontQ: newCard.front,
            backQ: newCard.back
        });

        addMore();
    });
}

//##############################

var cardsArrCloze = [];
var clozeGame = ()=> {

    inq.prompt([

        {
            type: "input",
            message: "Please enter the full question of your card:",
            name: "fullStr"
        },
        {
            type: "input",
            message: "Please enter the 'cloze' part:",
            name: "clozePart"
        }

    ]).then((resp)=> {

        var newCard = clozeCard(resp.fullStr, resp.clozePart);

        cardsArrCloze.push({
            fullQ: newCard.fulltext,
            partialQ: newCard.partial(),
            clozeQ: newCard.cloze
        });

        addMore();
    });
}

//##############################

var addMore = () => {
    inq.prompt([{
        type: "confirm",
        message: "Would like to add more card:",
        name: "moreCards",
        default: false
    }]).then((resp)=> {
        if (resp.moreCards) {
            gameCardBuilder();
        } else {
            startGame();
        }
    })
}

//##############################

var resetGame=()=>{
    cardsArrBasic=[];
    cardsArrCloze=[];
}

//##############################
var showScore=()=>{
    console.log("Right answers score is: "+rightAns);
    console.log("Wrong answers score is: "+wrongAns);
    resetGame();
}
//##############################

startGame();
