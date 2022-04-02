var level = [];
var lvl = -1;
var bgH = 700;
var bgW = 1500;
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