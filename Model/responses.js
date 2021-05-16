module.exports = class Responses{
    responses = [];

    constructor(){
        this.responses.push(
            //Phase 0 responses
            {
                Shuffling: "Dealer is shuffling the deck..." ,
                Shuffled: 'The deck has been shuffled.'
            },
            //Phase 1 responses
            {
                Draw: "The dealer is now giving you two cards",
                PlayerDeal: 'The dealer has dealt you ',
                CurrentScore: 'Your score is '
            },
            //Phase 2 responses
            { 
                DealersTurn: 'Dealer is taking thier turn now. Good luck. ',
                DealersTotal: "The dealers total is "
            },
            //End of game responses
            { 
                Winner: "Well done, you've won!", 
                Loser: "Sorry, you've lost!",
                LoserPhase1: ", sorry you lose!",
                DealerWins: "The dealers hand is higher than yours, you lose!",
                ADraw: "You have the same total as the dealer.. try again"
            }
        )
    }

    getAllResponses(){
        return this.responses;
    }

}