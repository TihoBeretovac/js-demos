$(document).ready(function() {

	//initialise the card "backs"
	var cardbacks = ["♡", "➳", "✿", "♀", "☺", "♬", "🎁", "✽"];

	//two cards will each have the same back
	//this array stores all of the card values
	//should probably be on the card itself as a data value as well
	//TODO randomise the starting values!
	// var cards = ["♡", "➳", "✿", "♀", "☺", "♬", "🎁", "✽", "♡", "➳", "✿", "♀", "☺", "♬", "🎁", "✽"];

	var cards = [];

	var cardsused = [];
	//for each unique card pattern
	for	(index = 0; index < cardbacks.length; index++) {
		//assign two (random & unused-yet) cards with that pattern
		var randomcardpos = Math.floor((Math.random() * 16));
		while($.inArray(randomcardpos, cardsused) != -1) {
			randomcardpos = Math.floor((Math.random() * 16));  //0 to 15
		}
		//ok now it is a unique ununsed spot - add it in
		cards[randomcardpos] = cardbacks[index];
		cardsused.push(randomcardpos);
		console.log("put:"+cardbacks[index]+" in pos:"+randomcardpos);

		//and assign another one
		while($.inArray(randomcardpos, cardsused) != -1) {
			randomcardpos = Math.floor((Math.random() * 16));  //0 to 15
		}
		cards[randomcardpos] = cardbacks[index];
		cardsused.push(randomcardpos);
		console.log("put:"+cardbacks[index]+" in pos:"+randomcardpos);

	}

	//stores which cards have been clicked in the latest attempt to find a pair
	var clickedcards = [];

	//the character revealed for the first card match check
	var flippedfirstcard = "";

	//add click listener to reveal a card
	//and if second-clicked to either revert the cards revealed or to mark them solved
	//which increments the score, and disables them from future clicking

	$(".card").click(function(){
			console.log("clicked card");
			//ignore if solved
			if(!$(this).hasClass("solved")) {
				$(this).text(cards[this.id-1]);
				$(this).addClass("revealed");
				clickedcards.push(this.id);
				console.log(clickedcards);

				//add this id to clicked cards
				if(flippedfirstcard == "") {
					console.log("setting flippedcard to "+cards[this.id-1]);
					flippedfirstcard = cards[this.id-1];
				} else {
					console.log("already flipped.. comparing to: "+cards[this.id-1]);
					//there was one previously flipped - check against this one!
					if(cards[this.id-1] == flippedfirstcard) {
						console.log("match!");
						//they match - keep them revealed
						//set them to solved class
						$(".revealed").addClass("solved");
						flippedfirstcard = "";					
						clickedcards = [];
						//TODO update solved count/game status
					} else {
						console.log("no match."+clickedcards+ ", "+clickedcards.length);
						//no match - flip the revealed cards back (after a small timer)
						window.setTimeout(function() {
							for	(index = 0; index < clickedcards.length; index++) {
								console.log("reverting card:"+clickedcards[index]);
							    $('#'+clickedcards[index]).html("Card");
								
							};
							$(".revealed").toggleClass("revealed");
							flippedfirstcard = "";
							clickedcards = [];
						}, 350);
		
					}
				}
			}
		}
	);
});
