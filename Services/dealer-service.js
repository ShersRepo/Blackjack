CardDeck = require('../Model/deck');

module.exports = class DealerService{
    cardDeck = new CardDeck();

    deckOfCards = this.cardDeck.getCardDeck();

    shuffleDeck(){
        for (var i = 0; i < 1000; i++){
            var location1 = Math.floor((Math.random() * this.deckOfCards.length));
            var location2 = Math.floor((Math.random() * this.deckOfCards.length));
            var tmp = this.deckOfCards[location1];

            this.deckOfCards[location1] = this.deckOfCards[location2];
            this.deckOfCards[location2] = tmp;
        }
    }

    cardHit(){
        let selectedCard = this.deckOfCards.pop();
        return selectedCard;
    }

}