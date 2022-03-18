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
		var preJ = this.canJump;
		//it did not hit any boxes
		if(clips.length == 0){
			this.y = newY;
			this.x = newX;
			//prevent overflow
			if(this.numFramesInFreeFall<500){
				this.numFramesInFreeFall++;
			}
		//it hit a box
		}else{
			//check if it hit verticaly or horazontaly and stop it from moving in that direction
			var whereClip = this.findSideOfClip(clips);
			//it did not hit verticaly
			if(!whereClip[1]){
				this.y = newY;
			}else{
				this.handleHitVertical();
				//sam can jump bc they are on the ground or on a cieling(can jump off cielings)
				this.numFramesInFreeFall = 0;
			}
			//it did not hit horazontaly
			if(!whereClip[0]){
				this.x = newX;
			}else{
				this.handleHitHorazontaly();
			}
		}

	}

	//find the boxes it hits
	findClips(nx, ny){
		var clips = [];
		for(let i = 0; i < this.level.length; i++){
    			if(rectsIntersect([[nx, ny],[nx+this.w, ny+this.h]], [[this.level[i].x,this.level[i].y],[this.level[i].x+this.level[i].w,this.level[i].y+this.level[i].h]]) == 0){
				clips.push(i);
			}
		}
		return clips;
	}

	//find where it hit(verticaly or horazontaly)
	findSideOfClip(clips){
		var horBlocked = false;
		var vertBlocked = false;
		for(let i = 0; i < clips.length; i++){
			var pos = rectsIntersect([[this.x, this.y],[this.x+this.w, this.y+this.h]], [[this.level[clips[i]].x, this.level[clips[i]].y],[this.level[clips[i]].x+this.level[clips[i]].w, this.level[clips[i]].y+this.level[clips[i]].h]])
			if(pos/10 > .5){
				horBlocked = true;
			}
			if(pos%10 == 1){
				vertBlocked = true;
			}
		}
		var ret = [horBlocked, vertBlocked];
		return ret;
	}

	//it hit something verticaly
	handleHitVertical(){
		this.vel.vy = 5;
	}

	//it hit something verticaly
	handleHitHorazontaly(){
		this.vel.vx = 5;
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
		if(this.numFramesInFreeFall<5){
			console.log("can");
			this.vel.vy = normalJumpSpeed;
			this.numFramesInFreeFall = 100;
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
