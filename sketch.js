var level = [];
var lvl = -2;
var bgH = 700;
var bgW = 1500;
var lvlW = bgW;
var lvlH = bgH;
var sam;
//only jump once
var oneJump = true;

var efsVar = 0;
var efsVar2 = 0;

//https://makepixelart.com/


//setInterval(setTime, 100);
var timer = 0;

function setTime() {
  console.log(sam.residualVel.vx);
}

function setup() {
	createLevel(lvl);
    createCanvas(bgW, bgH);
	sam = new Sam(90,30);
	sam.level = level;
	noSmooth();
}

function draw() {
	//draw background
    fill(color(0,255,255));
	rect(0,0,bgW,bgH);
	moveCamera();
	drawArr(level);
	sam.draw();
	sam.updateSam();
	sam.residualVel.updateResidualVel();
	userInput();
	if(sam.x > 990 && sam.x < 1010){
		//sam.jump()
	}
	
}

//draws all the contents of the array
function drawArr(arr){
	arr.forEach(function (e) {
    		e.draw();
	});
}

//get and handle the user input
function userInput(){
	//A key
	if(keyIsDown(65)){
		sam.moveLeft();
	}else if(keyIsDown(68)){
		//D key
		sam.moveRight();
	}else{
		sam.acc.ax = 0;
	}
	
	if(keyIsDown(87) && !oneJump){
		sam.jump();
		oneJump = true;
	}else if(!keyIsDown(87)){
		oneJump = false;
	}

}


var boxWidth = 300;
var boxHeight = 150;
var camL = bgW/2 - boxWidth/2;
var camR = bgW/2 + boxWidth/2;
var camU = bgH/2 - boxHeight/2;
var camD = bgH/2 + boxHeight/2;
var transX = 0;
var transY = 0;

function moveCamera(){

	//sam it to the right of the box
	if(sam.x > camR + transX){
		transX = Math.min(sam.x - camR, lvlW-bgW);
	}
	//sam it to the left of the box
	if(sam.x < camL + transX){
		transX = Math.max(sam.x - camL, 0);
		
	}
	//sam is to the bottom
	if(sam.y > camD + transY){
		transY = Math.min(sam.y - camD, lvlH-bgH);
	}//sam is to the top
	if(sam.y < camU + transY){
		transY = Math.max(sam.y - camU, 0);
	}

	translate(-transX, -transY);
}