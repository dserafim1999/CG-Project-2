var BallList = new Array(), CannonBalls = new Array();

var geometry, material, mesh;

function createBall(x, y, z) {
	'use strict';
	var ball = new THREE.Object3D();
	var rcolor = new THREE.Color( 0xffffff );
    rcolor.setHex( Math.random() * 0xffffff );
	material = new THREE.MeshBasicMaterial({ color: rcolor, wireframe: true });
	geometry = new THREE.SphereGeometry(2, 32, 32);
	mesh = new THREE.Mesh(geometry, material);
	ball.add(mesh);
	ball.radius = 2;
	ball.movement = null;

	ball.position.set(0, 0, 0);
	BallList.push(ball);
	scene.add(ball);
	ball.position.set(x, y, z);

/*
	//Determines if the 2 balls collide
	//return true or false
	function hasBallCollision(ball1, ball2) {
		var radius = Math.pow(ball1.radius + ball2.radius);
		var distance = 	Math.pow((ball1.position.x - ball2.position.x), 2) + 
						Math.pow((ball1.position.z - ball2.position.z), 2);
		return radius >= distance;
	}

	//Finds the point where the 2 balls intersect
	//returns the intersection point
	function FindIntersection(ball1, ball2) {
		var vector = ball2.position - ball1.position;

	}
	
	//Determines the movement for the 2 balls after the collision
	function ProcessCollision(ball1, ball2, intersection) {

	}
*/
	return ball;
}
