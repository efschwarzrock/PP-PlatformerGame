function createLevel() {

	//start
	level.push(new Platform(30,70,30,30));

	//small
	level.push(new Platform(0,350,30,30));

	//lower
	level.push(new Platform(800,300,150,30));
	//upper
	level.push(new Platform(1300,200,150,30));
	//stop
	level.push(new Platform(1450,150,30,90));
	//botom
	level.push(new Platform(0,400,1500,90));
}