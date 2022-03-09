var gl;
var theta;
var thetaLoc;
var colorLoc;
var scale = [1,1];
var scaleLoc;
var isDirClockwise = false;
var color;
var offsetXLoc;
var offsetYLoc;
var offsetX = 0;
var offsetY = 0;

function changeColor() {
	color = [Math.random(), Math.random(), Math.random(), 1];
	render();
}

function clockWiseRotation(){
	theta -= 0.1;
	render();
}

function antiClockWiseRotation(){
	theta += 0.1;
	render();
}

function changeScaleX(value){
	scale[0]= value;
	render(); 
}

function changeScaleY(value){
	scale[1]= value;
	render(); 
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	gl = WebGLUtils.setupWebGL(canvas);

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}

	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram(program);

	var colorButton = document.getElementById("colorButton");
	colorButton.addEventListener("click", function () { changeColor(); });

	var clockwiseRotationButton = document.getElementById("clockwiseRotationButton");
	clockwiseRotationButton.addEventListener("click", function () { clockWiseRotation(); });

	var AntiClockwiseRotationButton = document.getElementById("AntiClockwiseRotationButton");
	AntiClockwiseRotationButton.addEventListener("click", function () { antiClockWiseRotation(); });
	

	var vertices = [

		//Ö Harfinin Harflendirilmesi

		//Ö harfinin sol noktası
		vec2(-.8, .7),
		vec2(-.8, .9),
		vec2(-.6, .9),
		vec2(-.6, .9),
		vec2(-.8, .7),
		vec2(-.6, .7),

		//Ö harfinin sağ noktası
		vec2(-.4, .7),
		vec2(-.4, .9),
		vec2(-.2, .9),
		vec2(-.4, .7),
		vec2(-.2, .7),
		vec2(-.2, .9),

		//Ö harfinin üst karesi
		vec2(-.1, .4),
		vec2(-.9, .4),
		vec2(-.9, .6),
		vec2(-.9, .6),
		vec2(-.1, .4),
		vec2(-.1, .6),

		//Ö harfinin sağ karesi
		vec2(-.3, .4),
		vec2(-.1, .4),
		vec2(-.3, -.4),
		vec2(-.1, .4),
		vec2(-.3, -.4),
		vec2(-.1, -.4),

		//Ö harfinin sol karesi
		vec2(-.9, .4),
		vec2(-.7, .4),
		vec2(-.7, -.4),
		vec2(-.9, .4),
		vec2(-.7, -.4),
		vec2(-.9, -.4),

		//Ö harfinin alt karesi
		vec2(-.9, -.4),
		vec2(-.1, -.6),
		vec2(-.9, -.6),
		vec2(-.9, -.4),
		vec2(-.1, -.6),
		vec2(-.1, -.4),

		//U Harfinin Harflendirmesi

		//U harfinin sol karesi
		vec2(.1, .6),
		vec2(.1, -.6),
		vec2(.3, -.6),
		vec2(.1, .6),
		vec2(.3, -.6),
		vec2(.3, .6),

		//U harfinin sağ karesi
		vec2(.7, .6),
		vec2(.7, -.6),
		vec2(.9, .6),
		vec2(.9, .6),
		vec2(.7, -.6),
		vec2(.9, -.6),

		//U harfinin alt karesi
		vec2(.3, -.4),
		vec2(.7, -.4),
		vec2(.3, -.6),
		vec2(.3, -.6),
		vec2(.7, -.4),
		vec2(.7, -.6),
	];


	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	thetaLoc = gl.getUniformLocation(program, "theta");
	colorLoc = gl.getUniformLocation(program, "fColor");
	scaleLoc = gl.getUniformLocation(program, "scale");
	offsetXLoc = gl.getUniformLocation(program, "offsetX");
	offsetYLoc = gl.getUniformLocation(program, "offsetY");

	theta = 0;
	color = [0.0, 0.0, 128.0, 1.0];
	gl.uniform1f(thetaLoc, theta);
	gl.uniform4fv(colorLoc, color);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	render();
}

window.addEventListener("keydown", 
function() {
   switch (event.keyCode) {
		case 37: //Sol
	  		offsetX-=0.1;
			break;
	 	case 38: //Yukarı
	  		offsetY+=0.1;
			break;
	  	case 39: //Sağ 
	  		offsetX+=0.1;
			break;
		case 40: //Aşağı
			offsetY-=0.1;
			break;
		default:
			break;			
   }
   render();
});

function render() {

		gl.uniform1f(thetaLoc, theta);
		gl.uniform4fv(colorLoc, color);
		gl.uniform2fv(scaleLoc, scale);
		gl.uniform1f(offsetYLoc, offsetY);
		gl.uniform1f(offsetXLoc, offsetX);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, 100);	
}