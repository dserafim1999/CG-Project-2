var scene, renderer;

var cameras = {
	topOrthographicCamera: null,
	fixedPerspectiveCamera: null,
	followBallPerspectiveCamera: null
};

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
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
	}
}

function onKeyUp(e) {
	'use strict';

	switch (e.keyCode) {
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

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	createPlayingField(0, 0, 0);
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	//canonMovement();

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
