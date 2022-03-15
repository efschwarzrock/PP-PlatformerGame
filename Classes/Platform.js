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

}