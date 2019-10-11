var BallList = new Array();

var geometry, material, mesh;

function createBall(x, y, z) {
	'use strict';
	var ball = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
	geometry = new THREE.SphereGeometry(2, 32, 32);
	mesh = new THREE.Mesh(geometry, material);
	ball.add(mesh);


	ball.position.set(x, y, z);
	BallList.push(ball);
	scene.add(ball);
}
