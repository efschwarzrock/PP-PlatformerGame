class SamAnimation{
	constructor(){
		this.samImgs = [loadImage('https://raw.githubusercontent.com/efschwarzrock/PP-PlatformerGame/main/Images/Stand.png'), 
        loadImage('https://raw.githubusercontent.com/efschwarzrock/PP-PlatformerGame/main/Images/Run1.png'),
        loadImage('https://raw.githubusercontent.com/efschwarzrock/PP-PlatformerGame/main/Images/Run2.png'),
		loadImage('https://raw.githubusercontent.com/efschwarzrock/PP-PlatformerGame/main/Images/WallCling.png'),];
        this.curFram = 0;
        //this.lastStillFrameX = 0;
        //this.xTillNextFrame = 20;
		this.lastStillFrameTime = new Date().getTime();
		this.timeTillNextFrame = 100;
		this.direction = 1;//1 is going to the right, -1 is to the left
	}

    display(sam){
		if(sam.vel.vx < 0){
			this.direction = -1;
		}else if(sam.vel.vx > 0){
			this.direction = 1;
		}

		
		scale(this.direction, 1);
		if(this.direction == -1){
			image(this.samImgs[this.getIndexToShow(sam)], sam.x*this.direction - sam.w*(1-this.direction)/2, sam.y, sam.w, sam.h);
		}else{
			image(this.samImgs[this.getIndexToShow(sam)], sam.x, sam.y, sam.w, sam.h);
		}

    }

    //logic for the animation
	getIndexToShow(sam){

		//check if sam is curently on a wall
		if(sam.wallJumpSide != 0){
			//do the wall cling frame
			return 3;
		}

		if(sam.vel.vx == 0 || !sam.canJump){
			this.curFrame = 0;
            this.lastStillFrameX = sam.x;
			this.lastStillFrameTime = new Date().getTime();
			return 0; //sam is standing still or in the air so show the standing image
		}
		//this.curFrame = Math.floor((sam.x-this.lastStillFrameX)/this.xTillNextFrame)%4;
        this.curFrame = Math.floor((new Date().getTime() - this.lastStillFrameTime)/this.timeTillNextFrame)%4;


		if(this.curFrame % 2 == 0){
			//running animation goes like
			// 0 1 0 2 0 1 0 2 0 1 0 2
			return 0;//standing animation
		}else if(this.curFrame == 1){
			return 1;//standing animation
		}else{
			return 2;//standing animation
		}
	}
}