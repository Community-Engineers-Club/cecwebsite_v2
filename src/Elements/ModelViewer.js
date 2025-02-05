import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { counter_3D_conversion } from '../Pages/calculator';
import Firestore_Listener from '../Firestore_Listener';

const ModelViewer = () => {

  const { counterVal } = Firestore_Listener("arduino/post", "user20@gmail.com", "password5");

    // Refs to store the scene, camera, renderer, controls, and adjustable part
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const adjustablePartRef = useRef(null);

  useEffect(() => {
    // Initialize the scene only once 
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting Setup
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 1));

    // Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    camera.position.set(100, 150, -200);
    controls.update();


    //Loading 3D Model and storing the 'adjustable' part reference
    const loader = new GLTFLoader();

    loader.load('/Models/shs2.glb', (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        adjustablePartRef.current = model.getObjectByName('adjustable');
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    return () => {
      if (renderer) renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency >> so the code only runs once


  // Update the adjustable part position when slider value changes
  useEffect(() => {
    let slider = counter_3D_conversion(parseInt(counterVal));
    const { current: adjustablePart } = adjustablePartRef;
    if (adjustablePart) {
      adjustablePart.position.y = slider;
    }
console.log("rendered. Counter: ", counterVal, "slider: ", slider);
  }, [counterVal]); // This effect runs whenever counterVal change

  // Animation loop (runs continuously)
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      const { current: scene } = sceneRef;
      const { current: camera } = cameraRef;
      const { current: renderer } = rendererRef;
      const { current: controls } = controlsRef;

      if (scene && camera && renderer && controls) {
        controls.update();
        renderer.render(scene, camera);
      }
    };
    animate();
  }, []); // This effect only runs once when the component mounts

  

  return (
    <>
    <div>

      <div ref={containerRef} 
      
      //Styling
      style={{ display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'}}/>

    </div>
    </>
  );
};

export default ModelViewer;