module.exports = class Deck {

    deck = [];

    constructor()
        {
        let suits = ["spades", "diamonds", "clubs", "hearts"];
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        for(var i = 0; i < suits.length; i++)
        {
            for(var x = 0; x < suits.length; x++)
            {
                var weight = parseInt(values[i]);
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    weight = 10;
                if (values[i] == "A")
                    weight = 11;
                var card = { Value: values[i], Suit: suits[x], Weight: weight };
                this.deck.push(card);
            }
        }
    }

    getCardDeck(){
        return this.deck;
    }

}