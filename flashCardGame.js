var inq = require('inquirer');
var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");
var inq2 = require('inquirer');

var gameAns = [];

var newGame = function(){

inq.prompt([{
    type: "confirm",
    message: "Would you like to start the game? 'YES'=(only if you've already created the flash cards) 'NO'=(create flash cards)",
    name: "start",
    default: false
    }, { 
    type: "confirm",
    message: "Would you like to create a Basic card='Yes' or a Cloze card= 'NO':",
    name: "confirm",
    default: true
}]).then(function (ans) {
     if(ans.start){
        // startGame();
        console.log(cardsArrBasic);
        console.log(cardsArrCloze);
    }else{
        if(ans.confirm){
            basicGame();
        }else{
            clozeGame();
        }
    }
   
});


}

var cardsArrBasic = [];

var basicGame = function () {

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

    ]).then(function (answers) {
      
        var newCard = basicCard(answers.front, answers.back);

        cardsArrBasic.push({
                frontQ: newCard.front,
                backQ: newCard.back
        });
       
        // run the function again so as to either end the loop or ask the questions again
        newGame();
    });
}

var cardsArrCloze = [];
var clozeGame = function () {
    
        inq.prompt([
    
            {
                type: "input",
                message: "Please enter the front of your card:",
                name: "fullStr"
            },
            {
                type: "input",
                message: "Please enter the 'cloze' part:",
                name: "clozePart"
            }
    
        ]).then(function (resp) {
          
            var newCard = clozeCard(resp.fullStr, resp.clozePart);
    
            cardsArrCloze.push({
                fullQ: newCard.fulltext,
                partialQ: newCard.partial(),
                clozeQ: newCard.cloze
            });
           
            // run the function again so as to either end the loop or ask the questions again
            newGame();
        });
    }





 newGame();

