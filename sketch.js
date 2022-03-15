var level = [];
var bgH = 580;
var bgW = 800;
var gravity = 3;
var sam;


function setup() {
	createLevel();
        createCanvas(bgW, bgH);
	sam = new Sam(30,30);
	sam.level = level;
}

function draw() {
	if(mouseIsPressed === true){
        fill(color(255,255,255));
	rect(0,0,bgW,bgH);
	drawArr(level);
	sam.draw();
	sam.updatePos();
	}
}

//draws all the contents of the array
function drawArr(arr){
	arr.forEach(function (e) {
    		e.draw();
	});
}
