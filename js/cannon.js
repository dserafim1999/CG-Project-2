var geometry, material, mesh;
var cannons, selectedCanon = "middle";
var	rotationSpeed = 0.05;

function cannonMovement(){
	'use strict';

	if(cannons.rotating.clockwise){
		playingField.activeCannon.rotation.y -= rotationSpeed;
	}
	if(cannons.rotating.anticlockwise){
		playingField.activeCannon.rotation.y += rotationSpeed;
	}
}

function createCannons(){
	'use strict';

	cannons = createPlatform(cannons);

	cannons.rotating = {
		clockwise: false,
		anticlockwise: false
	}

	cannons.left = createCannon(-20, 3, 60);
	cannons.middle = createCannon(0, 3, 60);
	cannons.right = createCannon(20, 3, 60);

	console.log(cannons.left);


	cannons.add(cannons.left);
	cannons.add(cannons.middle);
	cannons.add(cannons.right);

	console.log()

	return cannons;
}

function createPlatform(cannons){
	'use strict';

	var platform = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true }); //random color
	geometry = new THREE.PlaneGeometry(60,10);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 60);
	mesh.rotation.x = Math.PI/2;

	platform.add(mesh);
	return platform;
}

function createCannon(x, y, z){
	'use strict';

	var cannon = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x606060, wireframe: true }); 
	geometry = new THREE.CylinderGeometry(3, 2, 15); //radiusTop, radiusBottom, height
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	mesh.rotation.x = Math.PI/2;

	cannon.add(mesh);
	cannon.position.set(x, y, z);

	return cannon;
}

function setActiveCannon(selected, playingField){
	'use strict';

	if(selected == "left"){
		playingField.activeCannon.children[0].material.color.set(0x606060);
		playingField.activeCannon = playingField.cannons.left;
		playingField.activeCannon.children[0].material.color.set(0xFF0000);		
	} else if (selected == "middle"){
		playingField.activeCannon.children[0].material.color.set(0x606060);
		playingField.activeCannon = playingField.cannons.middle;
		playingField.activeCannon.children[0].material.color.set(0xFF0000);
	} else if (selected == "right"){
		playingField.activeCannon.children[0].material.color.set(0x606060);
		playingField.activeCannon = playingField.cannons.right;
		playingField.activeCannon.children[0].material.color.set(0xFF0000);
	}
}