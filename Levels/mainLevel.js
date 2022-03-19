function createLevel() {

	//start
	level.push(new Platform(30,70,30,30));

	//small
	level.push(new Platform(240,375,30,10));

	//lower
	level.push(new Platform(800,300,150,30));
	//upper
	level.push(new Platform(1300,200,150,30));
	//stop
	level.push(new Platform(1450,150,30,90));
	//botom
	level.push(new Platform(0,400,1500,90));

	//left
	level.push(new Platform(0,0,10,bgH));

	//right
	level.push(new Platform(bgW-10,0,10,bgH));
}