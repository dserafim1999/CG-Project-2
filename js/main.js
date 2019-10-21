var scene,
	renderer,
	toggle = true;
var friction = 0.5;

var cameras = {
	topOrthographicCamera: null,
	fixedPerspectiveCamera: null,
	followBallPerspectiveCamera: null
};

var clock = new THREE.Clock();
var delta = 0;

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 37: //left
			playingField.cannons.rotating.anticlockwise = true;
			break;
		case 39: //right
			playingField.cannons.rotating.clockwise = true;
			break;
	}
}

function onKeyPress(e) {
	'use strict';

	switch (e.keyCode) {
		case 49: //1
			scene.activeCamera = cameras.topOrthographicCamera;
			break;
		case 50: //2
			scene.activeCamera = cameras.fixedPerspectiveCamera;
			break;
		case 51: //3
			if (cameras.followBallPerspectiveCamera !== null) {
				scene.activeCamera = cameras.followBallPerspectiveCamera;
			}
			break;
		case 81: //Q
		case 113: //q
			selectedCanon = 'left';
			break;
		case 82: //R
		case 114: //r
			toggle = !toggle;
			toggleAxis(toggle);
			break;
		case 87: //W
		case 119: //w
			selectedCanon = 'middle';
			break;
		case 69: //E
		case 101: //e
			selectedCanon = 'right';
			break;
		case 32: //space
			shoot = true;
			break;
	}
}

function onKeyUp(e) {
	'use strict';

	switch (e.keyCode) {
		case 37: //left
			playingField.cannons.rotating.anticlockwise = false;
			break;
		case 39: //right
			playingField.cannons.rotating.clockwise = false;
			break;
	}
}

function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.activeCamera.aspect = window.innerWidth / window.innerHeight;
	scene.activeCamera.updateProjectionMatrix();
}

function createScene() {
	'use strict';

	var i, j;
	var aux = Math.random() * 10;
	var ball1, ball2;

	scene = new THREE.Scene();

	createPlayingField(0, 0, 0);
	for (i = 0; i < aux; i++) {
		ball1 = createBall((Math.random() - 0.5) * 50, 2, (Math.random() - 0.5) * 50);
		for (j = 0; j < i; j++) {
			ball2 = BallList[j];
			if (ball1.isCollidingWithBall(ball2)) {
				scene.remove(ball2);
				BallList.splice(j, 1);
				break;
			}
		}
	}
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	delta = clock.getDelta();

	handleBallCollision();
	cannonMovement();
	setActiveCannon(selectedCanon, playingField);
	if (shoot) shootBall();
	ballsMovement(delta);
	updateBallList();
	updateFollowBallCamera();

	render();

	requestAnimationFrame(animate);
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true });

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	cameras.topOrthographicCamera = createTopOrthographicCamera();
	cameras.fixedPerspectiveCamera = createFixedPerspectiveCamera();
	scene.activeCamera = cameras.fixedPerspectiveCamera;

	cameras.followBallPerspectiveCamera = createFollowBallPerspectiveCamera(BallList[0]);
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
