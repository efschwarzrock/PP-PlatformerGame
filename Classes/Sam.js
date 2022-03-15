class Sam{

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 20;
		this.h = 40;
		this.vel = new velocity();
		this.level = [];
	}

	draw(){
		fill(color(255,200,200));
		rect(this.x, this.y, this.w, this.h);
	}

	updatePos(){
		var newX = this.x + this.vel.vx;
		var newY = this.y + this.vel.vy;
		var clips = this.findClips(newX, newY);
		if(clips.length == 0){
			this.y = newY;
			this.x = newX;
		}else{
			var whereClip = this.findSideOfClip(clips);
			if(!whereClip[1]){
				this.y = newY;
			}
			if(!whereClip[0]){
				this.x = newX;
			}
		}

	}

	findClips(nx, ny){
		var clips = [];
		for(let i = 0; i < this.level.length; i++){
    			if(rectsIntersect([[nx, ny],[nx+this.w, ny+this.h]], [[this.level[i].x,this.level[i].y],[this.level[i].x+this.level[i].w,this.level[i].y+this.level[i].h]]) == 0){
				clips.push(i);
			}
		}
		return clips;
	}

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

}

class velocity{
	constructor(){
		this.vx = 1;
		this.vy = 2;
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
