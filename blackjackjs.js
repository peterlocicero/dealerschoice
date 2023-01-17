

class Card{
    constructor(number,suite,value){
        this.number = number;
        this.suite = suite;
        this. value = value;
        this.position = 2.2;
    }
    cardDisplay(){
        console.log(document.getElementById("cardHolder"));
        let newCard = document.createElement('div');
        let top = document.createElement('div');
        let bottom = document.createElement('div');
        let middle = document.createElement('div');
        newCard.className="card";
        top.className = "top";
        top.innerHTML = this.number;



        middle.className = "middle";
        middle.innerHTML = this.suite;



        bottom.className = "bottom";
        bottom.innerHTML = this.number;



        newCard.appendChild(top);
        newCard.appendChild(middle);
        newCard.appendChild(bottom);
        newCard.style.left = this.position+'em';
        this.position+= 1.1;
        console.log(newCard);

        document.getElementById("cardHolder").appendChild(newCard);
        


    }
}



// const deck = shuffleArray(createDeck());

class BlackJack{
    constructor(){
        this.deck = [];
        this. score = 0;
        this.isPlaying = true;
        this.hand = [];
        this.dealerScore = 0;
    }
    createDeck = () =>{
        
        const suits = ['&#9827;','&#9829;','&#9824;','&#9830;'];
    
        for (let i =0; i < suits.length; i++){
            this.deck.push(new Card('A', suits[i],'ACE'));
    
            for (let j = 2; j <= 10; j++){
                this.deck.push(new Card(j, suits[i],j));
            }
            this.deck.push(new Card('J', suits[i],10));
            this.deck.push(new Card('Q', suits[i],10));
            this.deck.push(new Card('K', suits[i],10));
            
        }
        return this.deck
    
        
    }
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    getValue(newCard){
        if (newCard.value === 'ACE'){
            if (this.score >= 11){
                return 1;
            }
            else{
                return 11;
            }
        }

            return newCard.value;

    }

    draw(){
        const newCard = this.deck.pop();

        this.score += this.getValue(newCard);
        this.hand.push(newCard);
        this.displayScore();
        this.displayHand();

        if (this.score > 21){
            this.isPlaying = 'false';
            this.gameOver();
        }

        if (this.score === 21){
            this.isPlaying = 'false';
            this.gameOver();
        }

        this.dealerDraw();


    }

    dealerDraw(){
        if (this.dealerScore <= 15){
            this.dealerScore += this.getValue(this.deck.pop())
        }

        if (this.dealerScore > 21){
            this.isPlaying = 'false';
            this.gameOver();
        }

        if (this.dealerScore === 21){
            this.isPlaying = 'false';
            this.gameOver();
        }
    }

    displayHand(){
        document.getElementById("cardHolder").innerHTML = "";
        this.hand.map(card => card.cardDisplay());
        
    }
    newGame(){
        this.isPlaying = 'true';
        this.deck = this.createDeck();
        this.hand = [];
        this.dealerScore = 0;
        console.log(this.deck); 
        this.shuffleDeck();
        this.score = 0;
        this.draw();
        document.getElementById("hitButton").style.display = "inline"
        document.getElementById("stayButton").style.display = "inline"
        document.getElementById("announce").style.display = "none";
    }
    displayScore(){
        document.getElementById("score").innerHTML = '';
        document.getElementById("score").innerHTML = `Score: ${this.score}`

    }
    gameOver(){

        if (this.score > 21){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = "Bust! Over 21. Play again? ";
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";
        }

        if (this.score === 21){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = "You win! Play again? ";
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";

        }

        if (this.dealerScore > 21){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = "Dealer Bust! You win! Play again? ";
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";
        }

        if (this.dealerScore === 21){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = "Dealer hit 21! Play again? ";
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";
        }

    }
    stay(){

        while (this.dealerScore <= 16){
        this.dealerDraw();
        }
        if (this.score > this.dealerScore){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = `You win! Dealer has ${this.dealerScore} Play again? `;
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";

        }
        if (this.score === this.dealerScore){
            document.getElementById("announce").style.display = "inline";
            document.getElementById("announce").innerHTML = `Tie Game! Dealer has ${this.dealerScore}! Play again? `;
            document.getElementById("hitButton").style.display = "none";
            document.getElementById("stayButton").style.display = "none";
            document.getElementById("playButton").style.display = "inline";

        }
        else{
            if (this.score === this.dealerScore){
                document.getElementById("announce").style.display = "inline";
                document.getElementById("announce").innerHTML = "Dealer wins! Play again? ";
                document.getElementById("hitButton").style.display = "none";
                document.getElementById("stayButton").style.display = "none";
                document.getElementById("playButton").style.display = "inline";
    
            }
        }



    }





}

const game = new BlackJack;

document.getElementById("playButton").addEventListener("click", function() {
    game.newGame();
    document.getElementById("playButton").style.display = 'none';
});

document.getElementById("hitButton").addEventListener("click", function() {
    game.draw();
});

document.getElementById("stayButton").addEventListener("click", function() {
    game.stay();
});




