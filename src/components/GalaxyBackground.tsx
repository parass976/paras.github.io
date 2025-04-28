import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const FloatingText = () => {
  const ref = useRef<THREE.Points>();
  const count = 100;
  const text = "HACK THE PLANET";
  
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      scl[i] = Math.random();
    }
    
    return [pos, scl];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time + i) * 0.01;
        positions[i3 + 1] += Math.cos(time + i) * 0.01;
        positions[i3 + 2] += Math.sin(time + i) * 0.01;
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y = time * 0.05;
    }
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.5}
        color="#00ff00"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const CosmicDust = () => {
  const ref = useRef<THREE.Points>();
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time + i * 0.1) * 0.01;
        positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01;
        positions[i3 + 2] += Math.sin(time + i * 0.1) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        color="#4a9eff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const ShootingStar = ({ position, direction, speed }: {
  position: [number, number, number];
  direction: [number, number, number];
  speed: number;
}) => {
  const ref = useRef<THREE.Points>();
  const trailLength = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(trailLength * 3);
    for (let i = 0; i < trailLength; i++) {
      pos[i * 3] = position[0] - direction[0] * i * 0.1;
      pos[i * 3 + 1] = position[1] - direction[1] * i * 0.1;
      pos[i * 3 + 2] = position[2] - direction[2] * i * 0.1;
    }
    return pos;
  }, [position, direction]);

  const colors = useMemo(() => {
    const cols = new Float32Array(trailLength * 3);
    for (let i = 0; i < trailLength; i++) {
      const alpha = 1 - (i / trailLength);
      cols[i * 3] = 1;
      cols[i * 3 + 1] = 1;
      cols[i * 3 + 2] = 1;
    }
    return cols;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += direction[0] * speed;
      ref.current.position.y += direction[1] * speed;
      ref.current.position.z += direction[2] * speed;

      if (ref.current.position.length() > 100) {
        ref.current.position.set(...position);
      }
    }
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={trailLength}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={trailLength}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const StarField = () => {
  const ref = useRef<THREE.Points>();
  const { camera } = useThree();
  const count = 20000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      const brightness = Math.random() * 0.5 + 0.5;
      cols[i * 3] = brightness;
      cols[i * 3 + 1] = brightness;
      cols[i * 3 + 2] = brightness;
    }
    
    return [pos, cols];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = time * 0.05;
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.position.y = Math.cos(time * 0.1) * 0.5;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export default function GalaxyBackground() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    camera.position.z = 30;
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl, camera]);

  const shootingStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ];
      const direction: [number, number, number] = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ];
      const speed = Math.random() * 0.2 + 0.1;
      stars.push({ position, direction, speed });
    }
    return stars;
  }, []);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} castShadow />
      <StarField />
      <CosmicDust />
      <FloatingText />
      {shootingStars.map((star, i) => (
        <ShootingStar
          key={i}
          position={star.position}
          direction={star.direction}
          speed={star.speed}
        />
      ))}
      <Effects>
        <unrealBloomPass threshold={0.5} strength={2} radius={1} />
      </Effects>
    </group>
  );
}