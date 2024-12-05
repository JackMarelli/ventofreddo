import React, { useEffect, useRef } from 'react';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CityFog = () => {
  const mountRef = useRef(null);
  let effect;

  useEffect(() => {
    // Set up camera, scene, and renderer
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 600);
    camera.position.set(30, 15, 30);

    const scene = new THREE.Scene();
    const skyColor = new THREE.Color(0xf0f5f5);
    const groundColor = new THREE.Color(0xd0dee7);

    // Fog Effect
    scene.fog = new THREE.FogExp2(0xf0f5f5, 0.02); // Use regular fog for simplicity

    // Building Geometry
    const buildGeometry = new THREE.BoxGeometry(1, 1, 1);
    const buildMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

    const buildMesh = new THREE.InstancedMesh(buildGeometry, buildMaterial, 4000);
    scene.add(buildMesh);

    const dummy = new THREE.Object3D();
    const center = new THREE.Vector3();

    for (let i = 0; i < buildMesh.count; i++) {
      const scaleY = Math.random() * 7 + 0.5;
      dummy.position.x = Math.random() * 600 - 300;
      dummy.position.z = Math.random() * 600 - 300;

      const distance = Math.max(dummy.position.distanceTo(center) * 0.012, 1);
      dummy.position.y = 0.5 * scaleY * distance;
      dummy.scale.set(Math.random() * 3 + 0.5, scaleY * distance, Math.random() * 3 + 0.5);

      dummy.updateMatrix();
      buildMesh.setMatrixAt(i, dummy.matrix);
    }

    // Lighting
    scene.add(new THREE.HemisphereLight(skyColor, groundColor, 0.5));

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.set(3, 3, 3);
    ground.receiveShadow = true;
    scene.add(ground);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xf0f5f5);

    effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
   


    // Append renderer to component
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.minDistance = 7;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;
    controls.update();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse Move Listener for Adjusting Auto-Rotate Speed
    const handleMouseMove = (event) => {
      const middleX = window.innerWidth / 2;
      const distanceFromCenter = (event.clientX - middleX) / middleX; // -1 to 1

      // Map distanceFromCenter from -1 to 1 to the desired speed ranges
      let targetSpeed;
      if (distanceFromCenter < 0) {
        targetSpeed = THREE.MathUtils.mapLinear(distanceFromCenter, -1, 0, -0.6, -0.4);
      } else {
        targetSpeed = THREE.MathUtils.mapLinear(distanceFromCenter, 0, 1, 0.4, 0.6);
      }

      // Smooth transition
      controls.autoRotateSpeed += (targetSpeed - controls.autoRotateSpeed) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 pointer-events-none opacity-15" ref={mountRef}>
      {/* Background set using Tailwind, Three.js renderer is attached here */}
    </div>
  );
};

export default CityFog;
