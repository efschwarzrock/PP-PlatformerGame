function createLevel(lvl) {

	if(lvl == 0){
		lvlZero();
	}else if(lvl == -1){
		lvlNegOne();
	}
}

function lvlZero(){
	//start
	level.push(new Platform(80,70,90,30));

	//small
	level.push(new Platform(450,375,30,10));

	//lower platform
	level.push(new Platform(800,300,200,30));
	//upper platform
	level.push(new Platform(1350,200,150,30));

	//botom
	level.push(new Platform(0,400,1500,90));

	//left
	level.push(new Platform(0,0,20,bgH));

	//right
	level.push(new Platform(bgW-10,0,20,bgH));
}

function lvlNegOne(){
	var tubeWidth = 150
	//start
	level.push(new Platform(80,70,90,30));

	//upperleft border
	level.push(new Platform(bgW-10-tubeWidth-30,0,30,300));

	//bottomleft border
	level.push(new Platform(bgW-10-tubeWidth-30,350,30,200));

	
	//upper bottom
	level.push(new Platform(0,350, bgW-10-tubeWidth-30,30));

	//botom bottom
	level.push(new Platform(0,680, 1800,30));

	//wall
	level.push(new Platform(1050, 500, 30,200));
	//box
	level.push(new Platform(1010, 600, 40,100));

	//goal
	level.push(new Platform(550, 500, 200,30));
	level.push(new Platform(720, 380, 30,150));

	//top
	level.push(new Platform(0,-20, 1800,30));

	//left
	level.push(new Platform(0,0,20,bgH));

	//right
	level.push(new Platform(bgW-10,0,20,bgH));
}