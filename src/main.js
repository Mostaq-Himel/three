import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

// Debug
const gui = new dat.GUI({name: 'My Gui'});

// Scene
const scene = new THREE.Scene();

// texture
// const texture = new THREE.TextureLoader();

// lights
const ambientLight = new THREE.AmbientLight(0xff0045, 0.5);
scene.add(ambientLight);

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambient light intensity');

// const hemisphereight = new THREE.HemisphereLight( 0xff0000, 0x00000ff, 1 );
// scene.add( hemisphereight );

// gui.add(hemisphereight, 'intensity').min(0).max(1).step(0.001).name('hemisphere light intensity');

const directionalLight= new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('directional light');

// Material
const material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
// material.wireframe = true;

// Object
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16 );
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.y = 1;
scene.add(sphereMesh);

const planeGeometry = new THREE.PlaneGeometry(20,20);
const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.rotation.x = - Math.PI * 0.25;
planeMesh.rotation.z = - Math.PI * 0.25;
// planeMesh.rotation.reorder('YXZ');
// planeMesh.rotation.set();
scene.add(planeMesh);

gui.add(planeMesh.rotation, 'z', 1, 100, 0.001).name('ground horizontal rotation');

// sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// camera 
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
// camera.position.y = 3;
camera.lookAt(new THREE.Vector3());
scene.add(camera); 
 
// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
});

// render
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// resize window
window.addEventListener('resize',() => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // Update Camera
	camera.aspect = sizes.width / sizes.length;
    camera.updateProjectionMatrix();
    
	// update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
});


// clock 
const clock = new THREE.Clock();

// animation
const tick = () => {
    // elapsed time
    const elapsedTime = clock.getElapsedTime();

    // update object
    sphereMesh.position.x = Math.sin(elapsedTime);
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();