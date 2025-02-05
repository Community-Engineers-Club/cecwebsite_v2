// Scene setup
/*console.log("IS THIS WORKING?")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load the GLTF model
const loader = new THREE.GLTFLoader();
let adjustablePart; // Placeholder for the part to manipulate

loader.load(
  './shs.glb',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Assume the part to move is named "adjustable" in Blender
    adjustablePart = model.getObjectByName('adjustable');

    if (!adjustablePart) {
      console.warn('Could not find the adjustable part in the model.');
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Camera position
camera.position.set(0, 2, 5);

// Handle user input
const slider = document.getElementById('slider');
slider.addEventListener('input', () => {
  if (adjustablePart) {
    adjustablePart.position.y = parseFloat(slider.value); // Adjust Y-axis position
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls
  renderer.render(scene, camera);
}

animate(); */