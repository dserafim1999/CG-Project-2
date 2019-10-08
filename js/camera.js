var Camera;

function createCamera() {
	'use strict';
	
	Camera = new THREE.OrthographicCamera(-window.innerWidth /  8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight /  8, 1, 1000);
	Camera.position.x = 0;
	Camera.position.y = 0;
	Camera.position.z = 50;
	Camera.lookAt(scene.position);
}
