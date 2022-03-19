var level = [];
var bgH = 580;
var bgW = 1500;
var sam;
//only jump once
var oneJump = true;

//setInterval(setTime, 100);
var timer = 0;

function setTime() {
  console.log(sam.vel.vx);
  console.log(sam.acc.ax, "acc");
}

function setup() {
	createLevel();
        createCanvas(bgW, bgH);
	sam = new Sam(30,30);
	sam.level = level;
}

function draw() {
	
    fill(color(255,255,255));
	rect(0,0,bgW,bgH);
	drawArr(level);
	sam.draw();
	sam.updatePos();
	userInput();
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
		console.log("here");
		sam.jump();
		oneJump = true;
	}else if(!keyIsDown(87)){
		oneJump = false;
	}

}