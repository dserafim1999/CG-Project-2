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

	var base = new THREE.Object3D();


	//for now floor and fence are simply placed, maybe add individually to base to be able to manipulate
	//base.floor =createFloor(base, 0, 0, 0);
	//base.fence = createFence(base); //maybe used for colision??

	createFloor(base, 0, 0, 0);
	createFence(base);

	return base;
}

function createFence(base){
	'use strict';

	createWall(base, Math.PI/2, 0, 10, -25); //y = height/2
	createWall(base, 0, -25, 10, 0); //y = height/2
	createWall(base, 0, 25, 10, 0); //y = height/2
}

function createFloor(base, x, y, z){
	'use strict';

	material = new THREE.MeshBasicMaterial({ color: 0xfffffffff, wireframe: true });
	geometry = new THREE.PlaneGeometry(50,50);
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;

	base.add(mesh);
}

function createWall(base, rotation, x, y, z){
	'use strict';

	material = new THREE.MeshBasicMaterial({color : 0xfffffffff, wireframe: true});
	geometry = new THREE.CubeGeometry(2,20,50);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotation.y = rotation;
	base.add(mesh);
}