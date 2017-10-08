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
	return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function check() {
	alert('meep mop!');
}

function generateMatrix() {
	var matrix = new Array(9);
	for (var x = 0; x < 9; x++) {
		matrix[x] = new Array(9);
		for (var y = 0; y < 9; y++) {
			matrix[x][y] = parseInt(Math.random()*9, 10);
		}
	}
	return matrix;
}

function displayMatrix(matrix) {
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			if (matrix[x][y] != -1) {
				var temp = document.createTextNode(matrix[x][y]);
				var span = document.createElement('span');
				span.style.fontSize = "45px";
				span.style.position = 'absolute';
				span.style.left = (10 +50*x) + 'px';
				span.style.top = (116 + (50*y)) + 'px';
				span.appendChild(temp);
				document.body.appendChild(span);
			} else {
				var temp = document.createElement("input");
				temp.type = "text";
				temp.setAttribute('maxlength',1);
				temp.setAttribute('onkeypress', 'return isNumber(event)');
				temp.setAttribute('style', 'border-style:none; background-color:transparent; height:45px; width:45px; font-size:45px;');
				temp.style.position = 'absolute';
				temp.style.left = (10 +50*x) + 'px';
				temp.style.top = (116 + (50*y)) + 'px';
				document.body.appendChild(temp);
			}
		}
	}
}