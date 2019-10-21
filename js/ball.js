var BallList = new Array();

var geometry, material, mesh;

const BALL_RADIUS = 2,
	BALL_DIAMETER = 4;

function createBall(x, y, z) {
	'use strict';
	var ball = new THREE.Object3D();
	var rcolor = new THREE.Color(0xffffff);
	rcolor.setHex(Math.random() * 0xffffff);
	material = new THREE.MeshBasicMaterial({ color: rcolor, wireframe: true });
	geometry = new THREE.SphereGeometry(2, 32, 32);
	mesh = new THREE.Mesh(geometry, material);
	ball.add(mesh);

	ball.radius = 2;
	ball.movement = new THREE.Vector3(Math.random(), 0, Math.random());
	ball.speed = ball.movement.length();
	ball.xyz = new THREE.AxesHelper(10);
	ball.add(ball.xyz);

	ball.position.set(0, 0, 0);
	BallList.push(ball);
	scene.add(ball);
	ball.position.set(x, y, z);

	//Determines if the 2 balls collide
	//return true or false
	ball.isCollidingWithBall = function(ball) {
		'use strict';

		var collisionDistance = Math.pow(this.radius + ball.radius, 2);
		var actualDistanceBetweenBalls = Math.pow(this.position.x - ball.position.x, 2) + Math.pow(this.position.z - ball.position.z, 2);
		if (collisionDistance >= actualDistanceBetweenBalls && this.position.y == ball.position.y) {
			return true;
		}
		return false;
	};

	ball.isCollidingWithWall = function() {
		'use strict';

		if (this.position.z <= 32) {
			if ((this.position.x >= 28 && this.position.x <= 32) || (this.position.x <= -28 && this.position.x >= -32)) {
				return true;
			}
		}
		if (this.position.x <= 32 && this.position.x >= -32) {
			if (this.position.z <= -28 && this.position.z >= -32) {
				return true;
			}
		}
		return false;
	};

	ball.processCollitionWithBall = function(ball, intersection) {
		'use strict';

		var waytogo = BALL_DIAMETER - intersection.length();
		ball.position.addScaledVector(intersection.normalize(), waytogo + 0.01);
		
		var intersectionNormal = intersection.normalize();
		
		this.movement.copy(intersectionNormal);
		ball.movement.copy(intersectionNormal.negate());

		this.speed = ball.speed;
	};

	//Determines the movement for the ball after a collision with a wall
	ball.processCollitionWithWall = function() {
		if (this.position.z <= 32 && this.position.y >= 0) {
			if ((this.position.x >= 28 && this.position.x <= 32) || (this.position.x <= -28 && this.position.x >= -32)) {
				this.movement.x = -this.movement.x;
			}
		}
		if (this.position.x <= 32 && this.position.x >= -32 && this.position.y >= 0) {
			if (this.position.z <= -28 && this.position.z >= -32) {
				this.movement.z = -this.movement.z;
			}
		}
	};
	//Finds the point where the 2 balls intersect
	//returns the intersection point
	ball.getIntersectionVectorFromCollisionWithBall = function(ball) {
		var intersectionVector = new THREE.Vector3(0, 0, 0);
		intersectionVector.x = ball.position.x - this.position.x;
		intersectionVector.z = ball.position.z - this.position.z;
		return intersectionVector;
	};

	return ball;
}
function handleBallCollision() {
	var i, j;
	var ball1, ball2;

	for (i = 0; i < BallList.length; i++) {
		ball1 = BallList[i];
		handleBallCollisionWithWall(ball1);
		for (j = 0; j < BallList.length; j++) {
			if(i==j)
				continue;
			ball2 = BallList[j];
			handleBallCollisionWithBalls(ball1, ball2);
		}
	}
}

function handleBallCollisionWithWall(ball) {
	'use strict';

	if (ball.isCollidingWithWall()) {
		console.log('COLLISION WITH WALL');
		ball.processCollitionWithWall();
	}
}

function handleBallCollisionWithBalls(ball1, ball2) {
	'use strict';

	var intersectionVector;
	if (ball1.isCollidingWithBall(ball2)) {
		console.log('COLLISION WITH BALLS');
		intersectionVector = ball1.getIntersectionVectorFromCollisionWithBall(ball2);
		ball1.processCollitionWithBall(ball2, intersectionVector);	}
}

function ballsMovement(delta) {
	'use strict';

	for (var i = 0; i < BallList.length; i++) {
		reduceSpeed(delta * friction, BallList[i]);
		BallList[i].position.addScaledVector(BallList[i].movement, -BallList[i].speed);
		rotateBall(BallList[i]);
		outOfBounds(BallList[i]);
	}
}

function outOfBounds(ball) {
	'use strict';

	if (ball.position.z > 62 || ball.position.z < -32 || ball.position.x > 32 || ball.position.x < -32) {
		ball.position.y -= 2;
	}
}

function toggleAxis(toggle) {
	'use strict';

	for (var i = 0; i < BallList.length; i++) {
		if (toggle) BallList[i].xyz.visible = true;
		else BallList[i].xyz.visible = false;
	}
}

function reduceSpeed(speed, ball) {
	'use strict';

	if (ball.speed >= 0) ball.speed -= speed;
}

function rotateBall(ball) {
	'use strict';

	if (ball.speed >= 0) {
		var perpendicular = new THREE.Vector3().copy(ball.movement);
		perpendicular.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); //rotates the vector to become perpendicular to the movement vector
		ball.rotateOnWorldAxis(perpendicular.normalize(), -rotationSpeed); //rotates around the perpendicular vector
	}
}

// This method deletes balls that are not visible to the 1 camera anymore
function updateBallList() {
	'use strict';

	var i;
	var ball;
	var deleteBallsFromList = [];
	var index;

	for (i = 0; i < BallList.length; i++) {
		ball = BallList[i];
		if (ball.position.y < -1000) {
			deleteBallsFromList.push(ball);
			console.log('BALL IS NOT VISIBLE ANYMORE!');
		}
	}

	for (i = 0; i < deleteBallsFromList.length; i++) {
		ball = deleteBallsFromList[i];
		index = BallList.indexOf(ball);
		if (index > -1) {
			BallList.splice(index, 1);
		}
	}
}
/*
	//Determines the movement for the 2 balls after the collision
	ball.processCollitionWithBall = function(ball, intersection) {
		var angle_from_this_ball;
		var angle_from_colliding_ball;
		var movementAddedToThisBallFromThisBall = new THREE.Vector3(0, 0, 0);
		var movementAddedToCollidingBallFromThisBall = new THREE.Vector3(0, 0, 0);
		var movementAddedToThisBallFromCollidingBall = new THREE.Vector3(0, 0, 0);
		var movementAddedToCollidingBallFromCollidingBall = new THREE.Vector3(0, 0, 0);
		var totalNewMovementToThisBall;
		var totalNewMovementToCollidingBall;

		if (this.movement) {
			angle_from_this_ball = this.movement.angleTo(intersection.negate());
			movementAddedToThisBallFromThisBall = new THREE.Vector3(this.movement.x * Math.sin(angle_from_this_ball), 0, this.movement.z * Math.sin(angle_from_this_ball));
			movementAddedToCollidingBallFromThisBall = new THREE.Vector3(this.movement.x * Math.cos(angle_from_this_ball), 0, this.movement.z * Math.cos(angle_from_this_ball));
		}

		if (ball.movement) {
			angle_from_colliding_ball = ball.movement.angleTo(intersection);
			movementAddedToThisBallFromCollidingBall = new THREE.Vector3(ball.movement.x * Math.cos(angle_from_colliding_ball), 0, ball.movement.z * Math.cos(angle_from_colliding_ball));
			movementAddedToCollidingBallFromCollidingBall = new THREE.Vector3(ball.movement.x * Math.sin(angle_from_colliding_ball), 0, ball.movement.z * Math.sin(angle_from_colliding_ball));
		}
		totalNewMovementToThisBall = movementAddedToThisBallFromThisBall.add(movementAddedToThisBallFromCollidingBall);
		totalNewMovementToCollidingBall = movementAddedToCollidingBallFromThisBall.add(movementAddedToCollidingBallFromCollidingBall);
		this.movement = totalNewMovementToThisBall;
		ball.movement = totalNewMovementToCollidingBall;

		var waytogo = BALL_DIAMETER - intersection.length();

		this.position.addScaledVector(intersection.normalize(), waytogo + 0.01);

		if (this.movement) {
			this.position.addScaledVector(this.movement, this.speed * delta);
		}

		if (ball.movement) {
			ball.position.addScaledVector(ball.movement, ball.speed * delta);
		}
		//return 'Proces
	};
*/
