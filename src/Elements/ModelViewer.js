import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { counter_3D_conversion } from '../functions/calculator';
import Firestore_Listener from '../functions/Firestore_Listener';

const ModelViewer = ( {custom_counter, make_fullscreen} ) => {


    // get counter from database - if necessary
    const { counterVal }  = Firestore_Listener("arduino/post")

    // Refs to store the scene, camera, renderer, controls, and adjustable part
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const [adjustablePartRef, setAdjustablePartRef] = useState(null);

  useEffect(() => {
    // Initialize the scene only once 

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer();
    if (make_fullscreen) {
      renderer.setSize(window.innerWidth / 1, window.innerHeight / 1);
    } else {
      renderer.setSize(window.innerWidth / 1.1, window.innerHeight / 1.2);
    }
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
       // adjustablePartRef.current = model.getObjectByName('adjustable');
       setAdjustablePartRef(model.getObjectByName('adjustable'));
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
    let temp_counter = 0;
    if (custom_counter) {
      temp_counter = custom_counter;
    } else {
      console.log("does not exist. countval: ", counterVal)
      temp_counter = counterVal;
    }

    let slider = counter_3D_conversion(parseInt(temp_counter));
    //const { current: adjustablePart } = adjustablePartRef;
    const adjustablePart = adjustablePartRef;
    if (adjustablePart) {
      console.log("slider value: ", slider);
      adjustablePart.position.y = slider;
    } else console.log("part does not exist.")

  }, [counterVal, adjustablePartRef]); // This effect runs whenever counterVal change

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
      alignItems: 'center',
      }}/>

    </div>
    </>
  );
};

export default ModelViewer;