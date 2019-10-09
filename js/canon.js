var geometry, material, mesh;
var canons, rotationSpeed = 0.05;

function canonMovement(){
	'use strict';

	if(canons.rotating.clockwise){
		canons.rotation.y -= rotationSpeed;
		//canons.left.rotation.y -= rotationSpeed;
		//canons.middle.rotation.y -= rotationSpeed;
		//canons.right.rotation.y -= rotationSpeed;
	}
	if(canons.rotating.anticlockwise){
		canons.rotation.y += rotationSpeed;
		//canons.left.rotation.y += rotationSpeed;
		//canons.middle.rotation.y += rotationSpeed;
		//canons.right.rotation.y += rotationSpeed;
	}
}

function createCanons(){
	'use strict';

	canons = new THREE.Object3D();

	canons.rotating = {
		clockwise: false,
		anticlockwise: false
	}

	createPlatform(canons);

	canons.left = createCanon(canons, -20, 3, 50);
	canons.middle = createCanon(canons, 0, 3, 50);
	canons.right = createCanon(canons, 20, 3, 50);

	return canons;
}

function createPlatform(canons){
	'use strict';

	material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true }); //random color
	geometry = new THREE.PlaneGeometry(60,10);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 50);
	mesh.rotation.x = Math.PI/2;

	canons.add(mesh);
}

function createCanon(canons, x, y, z){
	'use strict';

	var canon = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x606060, wireframe: true }); 
	geometry = new THREE.CylinderGeometry(3, 2, 15); //radiusTop, radiusBottom, height
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;

	canons.add(mesh);

	return canon;
}