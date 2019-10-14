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

	ball.position.set(0, 0, 0);
	BallList.push(ball);
	scene.add(ball);
	ball.position.set(x, y, z);

	return ball;
}
