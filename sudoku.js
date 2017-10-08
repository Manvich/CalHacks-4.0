function board (argument) {
	var col = 9; 
	var row = 9; 
	var board = new Array[col]
	for (var i = 0; i < 9; i++) {
		board[i] = new Array[row]; 
	};
	for (var j = 0; j < 9; j++) {
		for (var k = 0; k < 9; k++){
			board[j][k] = 0; 
		}
	}
	return board; 
}

function possible_values (argument) {
	var col = 9;
	var row = 9; 
	var array0 = []; 
	for (var i = 0; i < col; i++) {
		for (var j =  0; j < row; j++) {
			var array1 = []; 
			for (var k = 1; k < 10; k++) {
				array1.push(k)
			};
			array0.push(array1)
		};
		
	};
	return array0; 
}

function possible_boxes (argument) {
	var array2 = []; 
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (argument[i][j] == 0){
				array2.push([i, j])
			}
		}
	}
	return array2; 
}

function best_boxes (argument) {
	var max = 0;
	var spot = board[0][0];  
	for (var i = 0; i < 9 ; i++){
		for (var j = 0; j <9; j++){
			if (possible_values(board[i][j]).length > max) {
				max = possible_values(board[i][j]).length; 
				spot = board[i][j]; 
			}
		}
	}
	return spot; 
}

function main () {


}