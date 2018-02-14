$(document).ready(function() {

	//initialise the board

	var board = [[0,0,0],[0,0,0],[0,0,0]]; //three by three array of the board
	//0 is unusued
	//1 is player 1 (tictac)
	//2 is player 2 (toe)

	var playerwhoseturnitis = 1;  //alternates between 1 and 2

	//add click listener to select a grid position for the playerwhoseturnitis
	//if valid choice made - transition that gridbox with the players mark
	//and rotate playerwhoseturnitis

	$(".card").click(function(event){
			console.log("square clicked!");
			//ignore if previously chosen
			if(!$(this).hasClass("tictac") && !$(this).hasClass("toe")) {

				//set the board with that gridpos set
				var row = $(this).attr('data-row');
				var col = $(this).attr('data-col');
				board[row][col] = playerwhoseturnitis;

				//set the class on the square, and swap player
				var turntext = document.getElementById('turntext');
				if(playerwhoseturnitis == 1) {
					$(this).addClass("tictac");	
					$(this).text('tictac');
					playerwhoseturnitis = 2;
					$(turntext).text("It's toe's turn!");
				} else {
					$(this).addClass("toe");	
					$(this).text('toe');
					playerwhoseturnitis = 1;
					$(turntext).text("It's tictac's turn!");
				}

				//detect win condition
				var winner = win(board);
				if(winner != 0) {
					event.preventDefault();
					var modal = document.getElementById('ex1');
					var winnerText = winner == 1 ? 'tictac won!' : 'toe won!';
					$(modal).find('h1').text(winnerText);
					this.blur(); // Manually remove focus from clicked link.
					$(modal).modal();					
				}
			}
		}
	);

	$('.modal').on($.modal.CLOSE, function(event, modal) {
	  window.location.reload(true);
	});
});

function win(board) {
	//win if there is a line in one players favor
	var winner = 0;
	for(rank = 0; rank < 3; rank++) {
		var rowWinner = winRow(board, rank);
		var colWinner = winCol(board, rank);
		if(rowWinner != 0) {
			return rowWinner;
		}
		if(colWinner != 0) {
			return colWinner;
		}
	}
	//TODO check for diagonal wins

	return 0;
}

function winRow(board, row) {
	if (board[row][0] == board[row][1]
	&& board[row][1] == board[row][2]
	&& board[row][0] != 0
	) {
		return board[row][0];	
	}
	return 0;
}

function winCol(board, col) {
	if (board[0][col] == board[1][col]
	&& board[1][col] == board[2][col]
	&& board[0][col] != 0
	) {
		return board[0][col];	
	}
	return 0;
}


