var geometry, material, mesh;
var playingField;

function createPlayingField(x, y, z){
	'use strict';

	playingField = new THREE.Object3D();

	playingField.base = createBase();
	playingField.cannons = createCannons();

	playingField.activeCannon = playingField.cannons.middle; 

	console.log(playingField.activeCannon);

	playingField.add(playingField.base);
	playingField.add(playingField.cannons);
	playingField.position.set(x, y, z);

	scene.add(playingField);

}

function createBase(){
	'use strict';

	var base = new THREE.Object3D();

	//use these for collision??
	base.floor = createFloor(base, 0, 0, 0);
	base.fence = createFence();

	base.add(base.floor);
	base.add(base.fence);


	return base;
}

function createFence(){
	'use strict';

	var fence = new THREE.Object3D();

	//y = height/2
	createWall(fence, Math.PI/2, 0, 10, -30);
	createWall(fence, 0, -30, 10, 0);
	createWall(fence, 0, 30, 10, 0);

	return fence;
}

function createFloor(base, x, y, z){
	'use strict';

	var floor = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({color: 0x292929, wireframe: true });
	geometry = new THREE.PlaneGeometry(60, 60);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;

	floor.add(mesh);

	return floor;
}

function createWall(fence, rotation, x, y, z){
	'use strict';

	material = new THREE.MeshBasicMaterial({color : 0xB23B1E, wireframe: true});
	geometry = new THREE.CubeGeometry(2,20,60);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.y = rotation;
	fence.add(mesh);
}