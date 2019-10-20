/*
 * Creating a orthographic camera uses the following attributes
 * left — Camera frustum left plane.
 * right — Camera frustum right plane.
 * top — Camera frustum top plane.
 * bottom — Camera frustum bottom plane.
 * near — Camera frustum near plane.
 * far — Camera frustum far plane.
 */
function createTopOrthographicCamera() {
	'use strict';
	let left = -window.innerWidth / 8;
	let right = window.innerWidth / 8;
	let top = window.innerHeight / 8;
	let bottom = -window.innerHeight / 8;
	let near = 1;
	let far = 1000;

	var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 50;
	camera.lookAt(scene.position);

	return camera;
}

/*
 * Creating a perspective camera uses the following attributes
 * fov — Camera frustum vertical field of view.
 * aspect — Camera frustum aspect ratio.
 * near — Camera frustum near plane.
 * far — Camera frustum far plane.
 */
function createFixedPerspectiveCamera() {
	'use strict';
	let fov = 30;
	let aspect = window.innerWidth / window.innerHeight;
	let near = 1;
	let far = 1000;

	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(100, 100, 200);
	//camera.rotation.y += Math.PI / 2;
	camera.lookAt(scene.position);

	return camera;
}

/*
 * Creating a perspective camera uses the following attributes
 * fov — Camera frustum vertical field of view.
 * aspect — Camera frustum aspect ratio.
 * near — Camera frustum near plane.
 * far — Camera frustum far plane.
 */
function createFollowBallPerspectiveCamera(ball) {
	'use strict';
	let fov = 300;
	let aspect = window.innerWidth / window.innerHeight;
	let near = 1;
	let far = 1000;

	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	ball.add(camera);

	camera.position.set(5, 0, 5);
	camera.lookAt(ball.movement);

	return camera;
}
