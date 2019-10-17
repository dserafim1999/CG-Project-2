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

function cannonballsMovement(){
	'use strict';
	

	for (var i = 0; i < CannonBalls.length; i++){
		if(CannonBalls[i].movement != null)
			var perpendicular = new THREE.Vector3(CannonBalls[i].movement.x,CannonBalls[i].movement.y,CannonBalls[i].movement.z); 
			perpendicular.applyAxisAngle(new THREE.Vector3(0,1,0), Math.PI/2); //rotates the vector to become perpendicular to the movement vector
			CannonBalls[i].rotateOnAxis(perpendicular.normalize(), -rotationSpeed); //rotates around the perpendicular vector
			CannonBalls[i].position.addScaledVector(CannonBalls[i].movement, -CannonBalls[i].speed);

	}
}

function shootBall(){
	shoot = false;
	ball = createBall(playingField.activeCannon.position.x , playingField.activeCannon.position.y, playingField.activeCannon.position.z);
	ball.movement = playingField.activeCannon.getWorldDirection();
	ball.position.addScaledVector(ball.movement, -7); //-7 to shoot from the tip of the cannon and not the center
	CannonBalls.push(ball);

}

function createCannons(){
	'use strict';

	cannons = createPlatform(cannons);

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

function createPlatform(cannons){
	'use strict';

	var platform = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true }); //random color
	geometry = new THREE.PlaneGeometry(60,10);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 45);
	mesh.rotation.x = Math.PI/2;

	platform.add(mesh);
	return platform;
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