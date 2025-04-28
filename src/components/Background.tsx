import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Background() {
  const ref = useRef<any>();
  
  // Generate more points for a denser effect
  const sphereData = new Float32Array(15000 * 3);
  random.inSphere(sphereData, { radius: 2.5 });
  
  // Filter out any potential NaN values
  for (let i = 0; i < sphereData.length; i++) {
    if (!Number.isFinite(sphereData[i])) {
      sphereData[i] = 0;
    }
  }

  useFrame((state, delta) => {
    // Rotate the entire particle system
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    // Add wave effect to points
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      // Create a more complex wave pattern
      positions[i] += Math.sin(state.clock.elapsedTime + positions[i] / 2) * 0.001;
      positions[i + 1] += Math.cos(state.clock.elapsedTime + positions[i + 1] / 2) * 0.001;
      positions[i + 2] += Math.sin(state.clock.elapsedTime + positions[i + 2] / 2) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    // Pulse the point size
    const pointMaterial = ref.current.material;
    pointMaterial.size = 0.015 + Math.sin(state.clock.elapsedTime) * 0.005;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphereData} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff00"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2}
        />
      </Points>
      
      {/* Add floating binary in the background */}
      {Array.from({ length: 30 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3
        ]}>
          <Points positions={new Float32Array([0, 0, 0])} stride={3}>
            <PointMaterial
              transparent
              color="#00ff00"
              size={0.05}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.3}
            />
          </Points>
        </group>
      ))}
    </group>
  );
}