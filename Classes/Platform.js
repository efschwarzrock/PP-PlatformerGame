var hitboxBorder = 20

class Platform{

	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw(){
		fill(color(100,100,100));
		rect(this.x, this.y, this.w, this.h);
	}

	//checks if the rectangle specified by x, y, w, h is in the platforms hitbox, and returns which one 
	//the corrected value of the offending corordinate
	isInHitbox(x,y,w,h){
		//check if its above or below
		if(this.x < x + w && this.x + this.w > x){
			//check if it's within the hitbox border
			//check if it's ontop
			if(y + h >= this.y && y + h < this.y + hitboxBorder){
				return ["T", this.y-h]
			}
			//check if it hit the bottom
			if(y > this.y + this.h - hitboxBorder && y < this.y + this.h){
				return ["B", this.y+this.h]
			}
		}
		//it is not above or below it
		//check if it is to the left or right
		if(this.y < y + h && this.y + this.h > y){
			//check if it's within the hitbox border
			//check if it's on the left
			if(x + w > this.x && x + w < this.x + hitboxBorder){
				console.log(efsVar- new Date().getTime(), "efsVar");
				return ["L", this.x-w]
			}
			//check if it hit the right
			if(x > this.x + this.w - hitboxBorder && x < this.x + this.w){
				return ["R", this.x+this.w]
			}
		}
		return 0;
	}

}

