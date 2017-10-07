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