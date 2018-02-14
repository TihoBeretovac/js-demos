$(document).ready(function() {

	//the deck of cards possibilities
	var cardsuits = ["♡", "➳", "✿", "♀"];
	var cardvalues = ["1","2","3","4","5","6","7","8","9","10","J","Q","K"];

	//the card revealed for the first card selected
	var flippedfirstcardvalue = "";
	var flippedfirstcardsuit = "";

	//add click listener to reveal a card

	$(".card").click(function(){
			console.log("clicked card");
			//ignore if solved
			
			//choose a random card (suit and value)
			var suitchosen = cardsuits[Math.floor(Math.random() * 4)]; //0 to 3
			var valuechosen = cardvalues[Math.floor(Math.random() * 13)]; //0 to 12

			if(!$(this).hasClass("revealed")) {
				$(this).text(valuechosen+" of "+suitchosen);
				$(this).addClass("revealed");

				//add this id to clicked cards
				if(flippedfirstcardvalue == "") {
					console.log("setting flippedcard to: "+valuechosen+" of "+suitchosen);
					flippedfirstcardvalue = valuechosen;
					flippedfirstcardsuit = suitchosen;
				} else {
					console.log("already flipped.. comparing to: "+valuechosen+" of "+suitchosen);
					//there was one previously flipped - check against this one
					//check which is higher!
					var turntext = document.getElementById('turntext');
					if(valuechosen > flippedfirstcardvalue) {
						console.log("second player wins!");
						$(turntext).text("second player wins!");
						$(".revealed").addClass("solved");
					} else {
						console.log("first player wins!");
						$(turntext).text("first player wins!");
						$(".revealed").addClass("solved");	
					}
					window.setTimeout(function() {
						window.location.reload(true);
						//reset the page
					}, 2000);

				}
				
			}
		}
	);
});
