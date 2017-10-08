function init() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.beginPath();
	for (var x = 0; x < 10; x++) {
		context.moveTo(x*50,0);
		context.lineTo(x*50,450);
		context.moveTo(0, x*50);
		context.lineTo(450,x*50);
	}
	context.stroke();
	context.beginPath();
	context.lineWidth=5;
	for (var x = 0; x < 10; x+=3) {
		context.moveTo(x*50,0);
		context.lineTo(x*50,450);
		context.moveTo(0, x*50);
		context.lineTo(450,x*50);
	}
	context.stroke();
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	return !(charCode > 31 && (charCode < 49 || charCode > 57));
}

function check(matrix, textBoxIDs) {
	var bool = true;
	for(var x = 0; x < textBoxIDs.length; x++) {
		bool = bool && (document.getElementById(textBoxIDs[x]).value == "" || matrix[parseInt(textBoxIDs[x]/10,10)][textBoxIDs[x]%10] == parseInt(document.getElementById(textBoxIDs[x]).value));
	}
	(bool) ? alert('You have no errors.') : alert('ERROR DETECTED.');
}

function generateMatrix() {
	var matrix = new Array(9);
	for (var x = 0; x < 9; x++) {
		matrix[x] = new Array(9);
		for (var y = 0; y < 9; y++) {
			var b = 1 == parseInt(Math.random()*2, 10);
			matrix[x][y] = b ? parseInt(Math.random()*9, 10) + 1 : -1;
		}
	}
	return matrix;
}

function displayMatrix(matrix) {
	var textBoxIDs = [];
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			if (matrix[x][y] != -1) {
				var temp = document.createTextNode(matrix[x][y]);
				var span = document.createElement('span');
				span.style.fontSize = "45px";
				span.style.position = 'absolute';
				span.style.left = (22 +50*x) + 'px';
				span.style.top = (114 + (50*y)) + 'px';
				span.appendChild(temp);
				document.body.appendChild(span);
			} else {
				var temp = document.createElement("input");
				temp.type = "text";
				temp.setAttribute('id', x + "" + y);
				temp.setAttribute('maxlength',1);
				temp.setAttribute('onkeypress', 'return isNumber(event)');
				temp.setAttribute('style', 'color: #0066FF; font-family:"Times New Roman"; text-align:center; border-style:none; background-color:transparent; height:45px; width:45px; font-size:45px;');
				temp.style.position = 'absolute';
				temp.style.left = (10 +50*x) + 'px';
				temp.style.top = (116 + (50*y)) + 'px';
				document.body.appendChild(temp);
				textBoxIDs.push(x + "" + y);
			}
		}
	}
	return textBoxIDs;
}