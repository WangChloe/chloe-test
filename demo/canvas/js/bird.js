class Bird{
	constructor(){
		this.count = 0;

		this.move();
		this.x = oC.width;
	}

	draw(){

		var {
			x,y,w,h
		} = BIRD_SIZE[this.count];

		ctx.drawImage(oImage,
			x,y,w,h,
			this.x,20,w,h
		)
	}
/*
	function(a){return a+1};
	a => a+1

	function(a,b){return a+b};
	(a,b) => a+b

	function(a,b){console.log(1);return a+b}
	(a,b) => { console.log(1);return a+b }
*/
	move(){
		setInterval(() => {

			this.count++

			if( this.count == 2 ){
				this.count = 0;
			}

		},150)

		setInterval(() => {
			this.x -= 1
		},16)
	}
}