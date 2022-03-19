var normalJumpSpeed = -600;
var normalHorazontalAcc = 1500;
var gravity = 1500;
var slowConst = 1000;
var slowVScale = .5;

class Sam{

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 20;
		this.h = 40;
		this.vel = new Velocity();
		this.acc = new Acceleration();
		this.level = [];
		this.lastUpdate = new Date().getTime();
		this.numFramesInFreeFall = 0;
		this.canJump = false;
		this.prevV = 0;
	}

	draw(){
		if(Math.abs(this.prevV-this.vel.vx) < 3){
			fill(color(0,200,0));
		}else{
			fill(color(255,200,200));
		}
		rect(this.x, this.y, this.w, this.h);
	}

	updatePos(){
		var curTime = new Date().getTime();
		var changeInTime = (curTime - this.lastUpdate)/1000;
		this.lastUpdate = curTime;

		var newX = this.x + this.vel.vx*changeInTime;
		var newY = this.y + this.vel.vy*changeInTime;

		this.accelerate(changeInTime);
		//which boxes it clips into
		var clips = this.findClips(newX, newY);

		//assume it did not hit anything, and we will check and fix the assumtion later
		this.y = newY;
		this.x = newX;

		this.canJump = false;
		//prevent overflow
		if(this.numFramesInFreeFall<500){
			this.numFramesInFreeFall++;
		}

		//it may have hit a box so handle that
		if(clips.length != 0){
			this.handleHit(clips, newX, newY);
		}

	}

	//find the boxes it hits
	findClips(nx, ny){
		var clips = [];
		for(let i = 0; i < this.level.length; i++){
			var clip = this.level[i].isInHitbox(nx, ny, this.w, this.h);
    		if(clip != 0){
				clips.push(clip);
			}
		}
		return clips;
	}

	//it hit something so handle it
	handleHit(clips, nx, ny){
		for(let i = 0; i < clips.length; i++){
			var clip = clips[i];
			//on the top of a platform
			if(clip[0] == "T"){
				//it was traveling downward so stop it
				if(this.vel.vy > 0){
					this.vel.vy = 0
					this.acc.ay = 0
					this.canJump = true;
					//place Sam where they are supposed to go
					this.y = clip[1];
				}
				//else it was traveling upward so don't do anything
				

				//on the bottom of a platform
			}else if(clip[0] == "B"){
				//it was traveling upward so stop it
				if(this.vel.vy < 0){
					this.vel.vy = 0
					this.acc.ay = 0
					//place Sam where they are supposed to go
					this.y = clip[1];
				}
				//else it was traveling downward so don't do anything

				//on the left side of a platform
			}else if(clip[0] == "L"){
				//it was traveling right so stop it
				if(this.vel.vx > 0){
					this.vel.vx = 0
					this.acc.ax = 0
					//place Sam where they are supposed to go
					this.x = clip[1];
				}
				//else it was traveling left so don't do anything

				//on the right side of the platform
			}else if(clip[0] == "R"){
				//it was traveling left so stop it
				if(this.vel.vx < 0){
					this.vel.vx = 0
					this.acc.ax = 0
					//place Sam where they are supposed to go
					this.x = clip[1];
				}
				//else it was traveling right so don't do anything
			}
		}
	}

	accelerate(changeInTime){
		this.acc.updateAx(this.vel);
		this.prevV = this.vel.vx;
		this.vel.vy += gravity*changeInTime;
		this.vel.vx += this.acc.ax*changeInTime;
		if(Math.abs(this.vel.vx) < 5){
			this.vel.vx = 0;
		}
		if(Math.abs(this.vel.vy) < 5){
			this.vel.vy = 0;
		}
	}

	jump(){
		//if(this.numFramesInFreeFall<5){
		if(this.canJump){
			this.vel.vy = normalJumpSpeed;
			this.numFramesInFreeFall = 100;
			this.canJump = false;
		}
	}

	moveLeft(){
		this.acc.ax = -normalHorazontalAcc;
	}

	moveRight(){
		this.acc.ax = normalHorazontalAcc;
	}

}

class Velocity{
	constructor(){
		this.vx = 1;
		this.vy = -4;
	}
}

class Acceleration{
	constructor(){
		this.ax = 0;
		this.ay = 0;
	}

	updateAx(vel){

		this.ax -= vel.vx*slowVScale + Math.sign(vel.vx)*slowConst;
	}

}

//checks if the rectangles intersect, r = a 2*2 array
// [[x1,y1]
//  [x2,y2]]
// i = 0, intersects
// i/10 = 1, left or right
// i%10 = 1, top or bottom
function rectsIntersect(r1, r2){
	var i = 0;
 	// If one rectangle is on left side of other
        if (r1[0][0] >= r2[1][0] || r2[0][0] >= r1[1][0]) {
        	i = 10;
        }

        // If one rectangle is above other
        if (r1[0][1] >= r2[1][1] || r2[0][1] >= r1[1][1]) {
        	i++;
        }
 
        return i;
}
