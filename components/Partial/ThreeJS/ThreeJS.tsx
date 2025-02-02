import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import DataManager from 'utils/DataManager';

const ThreeJS = () => {
  const sceneRef = useRef<HTMLCanvasElement | null>(null); // Ensure proper typing for the ref

  // Memoize the DataManager instance to ensure it is only created once
  const Manager = useMemo(() => new DataManager(), []);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create a scene
    const scene = new THREE.Scene();
    const canvas = sceneRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Create a camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = Manager.renderer(canvas, width, height);
    renderer.setSize(width, height);

    // Set up orbit controls
    const controls = Manager.orbitControl(camera, renderer);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;

    // Load the model (replace with actual model loading logic)
    Manager.Loadmodel("activeModel", camera, scene);

    // Load HDR lighting
    const HDRLighting = (path: string) => {
      const HDR = new RGBELoader().load(path, (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      });
      return HDR;
    };

    HDRLighting(`/symmetrical_garden_02_1k.hdr`);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Assuming model is already set, apply logic for model if needed
      if (!scene.children.length) return;  // Check if model is loaded into the scene
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [Manager]); // Only run effect when Manager changes (it’s memoized, so it won’t change)

  return (
    <div className="canvas">
      <div id="Loading">
        <div id="progress"></div>
      </div>
      <canvas id="canvas" ref={sceneRef} width={1108} height={1108}></canvas>
    </div>
  );
};

export default ThreeJS;
