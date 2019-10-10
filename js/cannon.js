var geometry, material, mesh;
var cannons, rotationSpeed = 0.05;

function cannonMovement(){
	'use strict';

	if(cannons.rotating.clockwise){
		cannons.rotation.y -= rotationSpeed;
		//cannons.left.rotation.y -= rotationSpeed;
		//cannons.middle.rotation.y -= rotationSpeed;
		//cannons.right.rotation.y -= rotationSpeed;
	}
	if(cannons.rotating.anticlockwise){
		cannons.rotation.y += rotationSpeed;
		//cannons.left.rotation.y += rotationSpeed;
		//cannons.middle.rotation.y += rotationSpeed;
		//cannons.right.rotation.y += rotationSpeed;
	}
}

function createCanons(){
	'use strict';

	cannons = new THREE.Object3D();

	cannons.rotating = {
		clockwise: false,
		anticlockwise: false
	}

	createPlatform(cannons);

	cannons.left = createCanon(cannons, -20, 3, 60);
	cannons.middle = createCanon(cannons, 0, 3, 60);
	cannons.right = createCanon(cannons, 20, 3, 60);

	return cannons;
}

function createPlatform(cannons){
	'use strict';

	material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true }); //random color
	geometry = new THREE.PlaneGeometry(60,10);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 60);
	mesh.rotation.x = Math.PI/2;

	cannons.add(mesh);
}

function createCanon(cannons, x, y, z){
	'use strict';

	var cannon = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x606060, wireframe: true }); 
	geometry = new THREE.CylinderGeometry(3, 2, 15); //radiusTop, radiusBottom, height
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;

	cannons.add(mesh);

	return cannon;
}