var geometry, material, mesh;
var cannons, selectedCanon = "middle", shoot = false;
var	rotationSpeed = 0.05;

function cannonMovement(){
	'use strict';

	if(cannons.rotating.clockwise){
		if(playingField.activeCannon.rotation.y > - Math.PI/2)
			playingField.activeCannon.rotation.y -= rotationSpeed;
	}
	if(cannons.rotating.anticlockwise){
		if(playingField.activeCannon.rotation.y < Math.PI/2)
			playingField.activeCannon.rotation.y += rotationSpeed;
	}
}

function shootBall(){
	shoot = false;
	ball = createBall(playingField.activeCannon.position.x , 2, playingField.activeCannon.position.z);
	ball.movement = playingField.activeCannon.getWorldDirection();
	ball.position.addScaledVector(ball.movement, -7); //-7 to shoot from the tip of the cannon and not the center
	cameras.followBallPerspectiveCamera = createFollowBallPerspectiveCamera(ball) // This should only be used with a balls
	if(toggle == false)
		ball.xyz.visible = false;
}

function createCannons(){
	'use strict';

	cannons = new THREE.Object3D();

	cannons.rotating = {
		clockwise: false,
		anticlockwise: false
	}

	cannons.left = createCannon(-20, 3, 45);
	cannons.middle = createCannon(0, 3, 45);
	cannons.right = createCannon(20, 3, 45);

	cannons.add(cannons.left);
	cannons.add(cannons.middle);
	cannons.add(cannons.right);

	return cannons;
}

function createCannon(x, y, z){
	'use strict';

	var cannon = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x606060, wireframe: true }); 
	geometry = new THREE.CylinderGeometry(4, 3, 14); //radiusTop, radiusBottom, height
	mesh = new THREE.Mesh(geometry, material);


	mesh.position.set(0, 0, 0);
	mesh.rotation.x = Math.PI/2;

	cannon.add(mesh);
	cannon.position.set(x, y, z);

	var wheel1 = createWheel(4, 0, 3);
	var wheel2 = createWheel(-4, 0, 3);

	cannon.add(wheel1);
	cannon.add(wheel2);

	return cannon;
}

function createWheel(x, y, z){
	'use strict';

	var wheel = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }); 
	geometry = new THREE.CylinderGeometry(4, 4, 0.5); //radiusTop, radiusBottom, height
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;
	mesh.rotation.z = Math.PI/2;

	wheel.add(mesh);

	return wheel;
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