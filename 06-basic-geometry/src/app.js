import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// View Port
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const initControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableKeys = false;
  controls.dampingFactor = 0.1; // friction
  controls.rotateSpeed = 1; // mouse sensitivity
  controls.update();
  return controls;
};

const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 2;
  return camera;
};

const initResizeListener = (renderer, camera, scene) => {
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  });
};

const main = () => {
  const canvas = document.getElementById("webgl");
  const scene = new THREE.Scene();

  const count = 500;

  const vertices = new Float32Array(count * 9).map(
    (v) => Math.random() * 2 - 0.5
  );

  console.log("👾 ~ vertices", vertices);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.MeshBasicMaterial({
    color: 0xaffaaa,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  const camera = initCamera();
  scene.add(camera);

  // Controls
  const controls = initControls(camera, canvas);
  //------------------------------

  //------------------------------

  const tick = () => {
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  initResizeListener(renderer, camera, scene);

  tick();
};

main();

const mein = undefined;
