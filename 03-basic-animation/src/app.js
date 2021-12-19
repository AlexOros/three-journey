import * as THREE from "three";
import gsap from "gsap";

const main = () => {
  const canvas = document.getElementById("webgl");
  const scene = new THREE.Scene();

  const sizes = {
    width: 800,
    height: 600,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 5;
  scene.add(camera);

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

  // Slution 2
  // gsap.to(cube.rotation, {
  //   x: 2,
  //   y: 3,
  //   duration: 1,
  //   delay: 1,
  //   scaleX: 2,
  //   onUpdate: function () {
  //     console.log(cube.rotation.y); //logs the value on each update.
  //   },
  // });

  renderer.setSize(sizes.width, sizes.height);

  // Solution 1
  // Clock
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update Cube
    // camera.rotation.x = elapsedTime * Math.PI * 0.5;
    // cube.position.y = Math.cos(elapsedTime * 3);
    // cube.position.x = Math.sin(elapsedTime * 3);

    // camera.lookAt(cube.position);

    // cube.rotation.y = elapsedTime * Math.PI * 2;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
};

main();
