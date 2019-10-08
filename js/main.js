var scene, renderer;

function onKeyDown(e) {
	'use strict';
	
	switch (e.keyCode) {
	}
}


function onKeyUp(e) {
	'use strict';

	switch(e.keyCode) {
	}
}


function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.activeCamera.aspect = (renderer.getSize().width / renderer.getSize().height);
	scene.activeCamera.updateProjectionMatrix();
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	
	scene.add(new THREE.AxisHelper(10));
	
	createPlayingField(0, 0, 0);
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	//canonMovement();

	render();
	
	requestAnimationFrame(animate);
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer( {antialias: true } );
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createCamera();
	scene.activeCamera = Camera;
	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);	
	window.addEventListener("keyup", onKeyUp);	
}