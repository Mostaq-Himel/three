import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Debug
const gui = new dat.GUI({name: 'My Gui'});

// Scene
const scene = new THREE.Scene();

// texture
const texture = new THREE.TextureLoader();

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const hemisphereight = new THREE.HemisphereLight( 0xff0000, 0x00000ff, 1 );
scene.add( hemisphereight );

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

gui.add(planeMesh.rotation, 'x', 1, 100, 0.001)
// console.log(mesh)

// sizes 
const sizes = {
    width: 800,
    height: 600
}

// camera 
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
// camera.position.y = 3;
camera.lookAt(new THREE.Vector3())
scene.add(camera); 
 
// renderer
const canvas = document.querySelector('.webgl');
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas
});

// render
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// clock 
const clock = new THREE.Clock();

// animation
const tick = () => {
    // elapsed time
    const elapsedTime = clock.getElapsedTime();

    // update object
    // sphereMesh.position.x = Math.sin(elapsedTime);
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();