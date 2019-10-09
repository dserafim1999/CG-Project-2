var geometry, material, mesh;
var playingField;

function createPlayingField(x, y, z){
	'use strict';


	playingField = new THREE.Object3D();
	//material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

	playingField.base = createBase();
	//playingField.canons = createCanons(); //multiple or individual?


	playingField.add(playingField.base);
	playingField.position.set(x, y, z);

	scene.add(playingField);

}

function createBase(){
	'use strict';

	var floor;

	var base = new THREE.Object3D();

	floor = createFloor(base, 0, 0, 0);
	createFence(base);

	base.add(floor);

	return base;
}

function createFence(){
	'use strict';
	
	//createWall(base,); //add position and rotation
	//createWall(base,); //add position and rotation
	//createWall(base,); //add position and rotation
}

function createFloor(base, x, y, z){
	'use strict';

	var floor = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0xfffffffff, wireframe: true });
	geometry = new THREE.PlaneGeometry(50,50);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	floor.add(mesh);
	floor.rotation.x = Math.PI/2;

	return floor;
}