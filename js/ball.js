var BallList = new Array(),
	CannonBalls = new Array();

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
	ball.movement = null;

	ball.speed = 0.2;
	ball.add(new THREE.AxisHelper(10));

	ball.position.set(0, 0, 0);
	BallList.push(ball);
	scene.add(ball);
	ball.position.set(x, y, z);

	//Determines if the 2 balls collide
	//return true or false
	ball.isCollidingWithBall = function(ball) {
		var collisionDistance = Math.pow(this.radius + ball.radius, 2);
		var actualDistanceBetweenBalls = Math.pow(this.position.x - ball.position.x, 2) + Math.pow(this.position.z - ball.position.z, 2);
		if (collisionDistance >= actualDistanceBetweenBalls) {
			return true;
		}
		return false;
	};

	ball.isCollidingWithWall = function() {
		if (this.position.z <= 30) {
			if ((this.position.x >= 29 && this.position.x <= 31) || (this.position.x <= -29 && this.position.x >= -31)) {
				return true;
			}
		}
		if (this.position.x <= 31 && this.position.x >= -31) {
			if (this.position.z <= -29 && this.position.z >= -31) {
				return true;
			}
		}
		return false;
	};

	//Finds the point where the 2 balls intersect
	//returns the intersection point
	ball.getIntersectionVectorFromCollisionWithBall = function(ball) {
		var intersectionVector = new THREE.Vector3(0, 0, 0);
		intersectionVector.x = ball.position.x - this.position.x;
		intersectionVector.z = ball.position.z - this.position.z;
		return intersectionVector;
	};

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
		//return 'Process';
	};

	ball.processCollitionWithBall2 = function(ball, intersection) {
		var distance = intersection.length();

		if (distance == 0.0) {
			intersection = new THREE.Vector3(0.0, 0.0, 1.0);
			distance = 1.0;
		}

		//if (distance > 1.0) return;

		intersection = intersection.normalize();
		var aci = this.movement.dot(intersection);
		var bci = ball.movement.dot(intersection);

		// Solve for the new velocities using the 1-dimensional elastic intersection equations.
		// Turns out it's really simple when the masses are the same.
		var acf = bci;
		var bcf = aci;

		// Replace the intersection velocity components with the new ones
		this.movement.add(intersection.addScalar(acf - aci));
		ball.movement.add(intersection.addScalar(bcf - bci));

		this.position.addScaledVector(this.movement, this.speed * delta);
		ball.position.addScaledVector(ball.movement, ball.speed * delta);
	};

	//Determines the movement for the ball after a collision with a wall
	ball.processCollitionWithWall = function() {
		if (this.position.z <= 30) {
			if ((this.position.x >= 29 && this.position.x <= 31) || (this.position.x <= -29 && this.position.x >= -31)) {
				this.movement.x = -this.movement.x;
			}
		}
		if (this.position.x <= 31 && this.position.x >= -31) {
			if (this.position.z <= -29 && this.position.z >= -31) {
				this.movement.z = -this.movement.z;
			}
		}
	};

	return ball;
}

function handleBallCollision() {
	var i, j;
	var ball1, ball2;

	for (i = 0; i < BallList.length; i++) {
		ball1 = BallList[i];
		handleBallCollisionWithWall(ball1);
		for (j = i + 1; j < BallList.length; j++) {
			ball2 = BallList[j];
			handleBallCollisionWithBalls(ball1, ball2);
		}
	}
}

function handleBallCollisionWithWall(ball) {
	if (ball.isCollidingWithWall()) {
		console.log('COLLISION WITH WALL');
		ball.processCollitionWithWall();
	}
}

function handleBallCollisionWithBalls(ball1, ball2) {
	var intersectionVector;
	if (ball1.isCollidingWithBall(ball2)) {
		console.log('COLLISION WITH BALLS');
		intersectionVector = ball1.getIntersectionVectorFromCollisionWithBall(ball2);
		ball1.processCollitionWithBall(ball2, intersectionVector);
	}
}
