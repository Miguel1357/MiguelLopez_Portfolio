import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const AbstractFish = () => {
  const meshGroupRef = useRef<THREE.Group | null>(null);

  const particleCount = 300;

  // Create triangular fish-like shapes using ConeGeometry
  const fishGeometry = new THREE.ConeGeometry(0.05, 0.15, 3);
  const fishMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.4, 0.8, 0.9),
    emissive: new THREE.Color(0.1, 0.3, 0.4),
    emissiveIntensity: 0.1,
    opacity: 0.5,
    transparent: true,
  });

  // Store each fish's rotation speed, size variation, and movement properties
  const fishObjects = useMemo(() => {
    const objects = [];
    for (let i = 0; i < particleCount; i++) {
      const fish = new THREE.Mesh(fishGeometry, fishMaterial);

      (fish as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
      };

      const randomSize = Math.random() * 0.15 + 0.05;
      fish.scale.set(randomSize, randomSize, randomSize);

      fish.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      );

      // Store initial X position for oscillation reference
      (fish as any).initialX = fish.position.x;
      (fish as any).moveSpeed = Math.random() * 0.3 + 0.2;
      (fish as any).moveOffset = Math.random() * Math.PI * 2;

      fish.rotation.x = Math.PI / 2;

      objects.push(fish);
    }
    return objects;
  }, []);

  // Animate the rotation and subtle side-to-side motion
  useFrame(({ clock }) => {
    if (meshGroupRef.current) {
      meshGroupRef.current.children.forEach((fish: any) => {
        fish.rotation.x += fish.rotationSpeed.x;
        fish.rotation.y += fish.rotationSpeed.y;
        fish.rotation.z += fish.rotationSpeed.z;

        // Subtle oscillation side to side
        fish.position.x =
          fish.initialX +
          Math.sin(clock.elapsedTime * fish.moveSpeed + fish.moveOffset) * 0.05;
      });
    }
  });

  return (
    <group ref={meshGroupRef}>
      {fishObjects.map((fish, index) => (
        <primitive key={index} object={fish} />
      ))}
    </group>
  );
};

const GeneralAnimation = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 2], fov: 70 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 1, 0]} intensity={0.8} castShadow />
        <AbstractFish />
      </Canvas>
    </div>
  );
};

export default GeneralAnimation;
