function createLevel() {

	//start
	level.push(new Platform(30,70,90,30));

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