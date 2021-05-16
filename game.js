let Questions = require('./Model/questions');
let Responses = require('./Model/responses');
let Player = require('./Model/players');
const Dealer = require('./Model/dealer');
const QuestionService = require('./Services/question-service');
const DealerService = require('./Services/dealer-service');
const ResponseService = require('./Services/response-service');

let dealerService = new DealerService();
let questionService = new QuestionService();
let responseService = new ResponseService();

const allQuestions = new Questions();
const responses = new Responses();
const dealer = new Dealer();
let player1 = new Player("Sam");
let playersTotal = 0;
let currentCard;
let userWins;
let userResponse = questionService.userResponse;
let responseListener = questionService.userResponseListener;
responseListener.addListener('received', dealCardToPlayer);

//Phase 0
//Dealer initialises the card deck
function phase0(){
    console.log(responseService.allResponses[0].Shuffling);
    dealerService.shuffleDeck();
    console.log(responseService.allResponses[0].Shuffled);
    phase1();
}

//Phase 1 
//Players turn - player is requested to make a decision on how many cards to select
//User inputs required for service are "Yes" or "No"
//Player may lose at this phase which would end the game. 
//Otherwise game will move to phase 2 automatically once card draws for player are complete
function phase1(){
    console.log(responseService.allResponses[1].Draw);
    playerCardHit(player1);
    playerCardHit(player1);
    console.log(responseService.allResponses[1].PlayerDeal + getPlayerTotal(player1));
    requestDealCardResponse();
}


//Phase 2
//Dealers turn - Dealers hand is automatically dealt and the players fate will be determined at the end of this phase.
//The dealer is will select cards up to a minimum of 17, where it will stop dealing.
//If the dealer draws over 21 the player automatically wins.
//The last use case is the dealers hand is compared to the users hand.
//After this the winner of the game is selected.
//Will automatically move to phase end of game phase and winner selected
function phase2(){
    console.log(responseService.allResponses[2].DealersTurn);
    dealCardsToDealer();
    console.log(responseService.allResponses[2].DealersTotal + getDealerTotal());
    getGameResults();

}

//EndOfGamePhase
function endOfGamePhase(){
    if(userWins == 1){
        console.log(responseService.allResponses[3].Winner)
    }
    else if(userWins == 0){
        console.log(responseService.allResponses[3].DealerWins)
    }
    else if(userWins == 2){
        console.log(responseService.allResponses[3].ADraw)
    }
}


function getGameResults(){
    if(getPlayerTotal(player1) > getDealerTotal()){
        userWins = 1;
    }
    else if(getPlayerTotal(player1) < getDealerTotal()){
        userWins = 0
    }
    else if(getPlayerTotal(player1) == getDealerTotal()){
        userWins = 2
    }
    endOfGamePhase();
}

function dealCardsToDealer(){
    while(dealer.cardTotal < 17 && dealer.cardTotal < 21){
        dealersCardHit();
        addDealerTotal();
    }
}

function dealersCardHit(){
    dealer.cardHand.push(dealerService.cardHit());
}

function addDealerTotal(){
    let recentCard = dealer.cardHand.pop();
    dealer.cardTotal = dealer.cardTotal + recentCard.Weight;
}

function getDealerTotal(){
    return dealer.cardTotal;
}

function addToPlayerTotal(player){
    let recentCard = player.cardHand.pop();
    player.cardTotal = player.cardTotal + recentCard.Weight;
}

function getPlayerTotal(player){
    return player.cardTotal;
}

function playerCardHit(player){
    let selectedCard = dealerService.cardHit()
    player.cardHand.push(selectedCard);
    currentCard = selectedCard.Value;
    addToPlayerTotal(player);
}

function dealCardToPlayer(){
    userResponse = questionService.userResponse;
    if(userResponse == true){
        playerCardHit(player1);
        let currentTotal = getPlayerTotal(player1);
        if(currentTotal <= 21){
            console.log(responseService.allResponses[1].PlayerDeal + currentCard + ", " + responseService.allResponses[1].CurrentScore + getPlayerTotal(player1));
            requestDealCardResponse();
        } else {
            questionService.gameOver();
            console.log(responseService.allResponses[1].PlayerDeal + " " + getPlayerTotal(player1) + ", sorry you lose!")
        }
    } else {
        phase2();
    }
}

function requestDealCardResponse(){
    questionService.getResponse(allQuestions.questions[0].Question);
}

//Start game at phase ()
phase0();