import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// View Port
const sizes = {
  width: 800,
  height: 600,
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

const main = () => {
  const canvas = document.getElementById("webgl");
  const scene = new THREE.Scene();

  // Axis Helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );

  scene.add(cube);

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });

  renderer.setSize(sizes.width, sizes.height);

  // Camera
  // const aspectRatio = sizes.width / sizes.height;
  // const camera = new THREE.OrthographicCamera(
  //   -1 * aspectRatio,
  //   1 * aspectRatio,
  //   1,
  //   -1,
  //   0.1,
  //   100
  // );

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableKeys = false;
  controls.dampingFactor = 0.1; // friction
  controls.rotateSpeed = 0.2; // mouse sensitivity
  controls.update();

  // Clock
  const clock = new THREE.Clock();

  const tick = () => {
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(cube.position);

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
};

main();
