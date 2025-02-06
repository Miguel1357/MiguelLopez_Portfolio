import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const ParticleWave = () => {
  const mesh = useRef<THREE.Group | null>(null);
  const particleCount = 200;

  const particles = useMemo(() => {
    const particleObjects = [];
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.1, 0.1, 0.1),
        emissive: new THREE.Color(0.05, 0.05, 0.05),
        emissiveIntensity: 0.1,
        shadowSide: THREE.BackSide,
      });

      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 1,
        (Math.random() - 0.5) * 5
      );

      particleObjects.push(sphere);
    }
    return particleObjects;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.children.forEach((particle) => {
        particle.position.y = Math.sin(time + particle.position.x) * 0.2;
        particle.rotation.x += 0.005;
        particle.rotation.y += 0.005;
      });
    }
  });

  return (
    <group ref={mesh}>
      {particles.map((particle, index) => (
        <primitive key={index} object={particle} />
      ))}
    </group>
  );
};

const HomeAnimation = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1, 5] }}
        style={{
          position: "fixed", // Keeps the background fixed
          top: 0,
          left: 0,
          width: "100vw", // Full width
          height: "100vh", // Full height
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 1, 0]} intensity={0.8} castShadow />
        <ParticleWave />
      </Canvas>
    </div>
  );
};

export default HomeAnimation;
