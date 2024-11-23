let x = 50; 
let speed = 3;
function setup() {
  createCanvas(600, 400);	
}
function draw() {
	background(255);
	fill(0);
	ellipse(x, 50, 50, 50);
	x = x + speed;
		if(x + 25 >= width || x - 25 <= 0)
	{
		speed = -speed;
	}
}

