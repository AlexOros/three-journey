import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
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

const initDebug = ({ cube, material }) => {
  GUI.prototype.hide = function () {
    this.isHidden = true;
    this.domElement.style.display = "none";
  };
  GUI.prototype.show = function () {
    this.isHidden = false;
    this.domElement.style.display = "";
  };

  window.addEventListener("keypress", (e) => {
    gui.isHidden ? gui.show() : gui.hide();
  });

  const gui = new GUI({
    width: 350,
  });

  return gui;
};

// Bookmark min: 15:10
const main = () => {
  const canvas = document.getElementById("webgl");
  const scene = new THREE.Scene();

  const material = new THREE.MeshBasicMaterial({
    color: 0xaffaaa,
  });

  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

  scene.add(cube);

  const camera = initCamera();
  scene.add(camera);

  // Controls
  const controls = initControls(camera, canvas);

  // Debug
  const gui = initDebug({ cube, material });

  const cubeParameters = {
    color: 0xaffaaa,
    onSpin() {
      gsap.to(cube.rotation, {
        y:
          cube.rotation.y +
          Math.min(5, Math.floor(Math.random() * 20)) * Math.PI * 2,
        duration: 1,
      });
    },
  };

  gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("Y Axis");
  gui.add(material, "wireframe", false).name("Show Wireframe");
  gui.addColor(cubeParameters, "color", 0xaffaaa).onChange((newColor) => {
    material.color.setHex(newColor);
  });
  gui.add(cubeParameters, "onSpin");

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
