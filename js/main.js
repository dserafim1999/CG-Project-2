var scene, renderer;

var cameras = {
	topOrthographicCamera: null,
	fixedPerspectiveCamera: null,
	followBallPerspectiveCamera: null
};

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
			selectedCanon = "left";
			break;
		case 87: //W
		case 119: //w
			selectedCanon = "middle";
			break;
		case 69: //E
		case 101: //e
			selectedCanon = "right";
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
	scene.activeCamera.aspect = renderer.getSize().width / renderer.getSize().height;
	scene.activeCamera.updateProjectionMatrix();
}

function createScene() {
	'use strict';
	var i;
	var aux = Math.random() * 10;

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	createPlayingField(0, 0, 0);
	for (i = 0; i < aux; i++) {
		createBall((Math.random() - 0.5) * 50, 1.5, (Math.random() - 0.5) * 50);
	}
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	cannonMovement();
	setActiveCannon(selectedCanon, playingField);
	if(shoot)
		shootBall();
	cannonballsMovement();

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
	// createFollowBallPerspectiveCamera(ball) // This should only be used with a balls
	scene.activeCamera = cameras.fixedPerspectiveCamera;
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
