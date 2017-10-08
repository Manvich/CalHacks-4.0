function createBoard() {
	var board = new Array(9);
	var possibleValues = new Array(9);
	for (var x = 0; x < 9; x++) {
		board[x] = new Array(9);
		possibleValues[x] = new Array(9);
		for (var y = 0; y < 9; y++) {
			possibleValues[x][y] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}
	}
	while(true) {
		var greatestPotential = 0;
		var indices = [];
		for (var x = 0; x < 9; x++) {
			for(var y = 0; y < 9; y++) {
				if (possibleValues[x][y].length > greatestPotential) {
					greatestPotential = possibleValues[x][y].length;
					indices = [x*10+y];
				} else if (possibleValues[x][y].length == greatestPotential) {
					indices.push(x*10+y);
				}
			}
		}
		if (greatestPotential == 1)
			return board;
		var index = indices[parseInt(Math.random()*indices.length,10)];
		var tmpx = parseInt(index/10,10), tmpy = index%10;
		var value = possibleValues[parseInt(tmpx)][tmpy][parseInt(Math.random()*possibleValues[tmpx][tmpy].length,10)];
		board[tmpx][tmpy] = value;
		possibleValues[tmpx][tmpy] = [value];
		for (var x = 0; x < 9; x++) {
			var columnIndex = possibleValues[tmpx][x].indexOf(value);
			var rowIndex = possibleValues[x][tmpx].indexOf(value);
			var modX = parseInt(tmpx/3, 10) * 3 + x%3;
			var modY = parseInt(tmpy/3, 10) * 3 + parseInt(x/3, 10);
			var modIndex = possibleValues[modX][modY].indexOf(value);
			if (x != tmpy && columnIndex >= 0)
				possibleValues[tmpx][x].splice(columnIndex, 1);
			if (x != tmpx !rowIndex >= 0)
				possibleValues[x][tmpy].splice(columnIndex, 1);
			if ((modX != tmpx || modY != tmpy) && modIndex >= 0) {
				possibleValues[modX][modY].splice(modIndex,1);
			}
		}
	}
}