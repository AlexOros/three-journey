import * as THREE from "three";

const main = () => {
  const canvas = document.getElementById("webgl");
  const scene = new THREE.Scene();

  const sizes = {
    width: 800,
    height: 600,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  scene.add(camera);

  // Axis Helper
  const axisHelper = new THREE.AxisHelper();
  scene.add(axisHelper);

  //Objects
  const group = new THREE.Group();
  scene.add(group);

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x225566 })
  );

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x22aa66 })
  );

  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.2, 1),
    new THREE.MeshBasicMaterial({ color: 0xff556f })
  );

  cube1.position.x = 1.5;
  cube3.position.x = -1.5;

  group.position.y = 1.2;

  group.add(cube1, cube2, cube3);

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
};

main();

/**
 * Animate
 */
const tick = () => {
  console.log("tick");

  window.requestAnimationFrame(tick);
};

tick();
