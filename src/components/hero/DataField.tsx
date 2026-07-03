"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2600;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildPositions() {
  const rnd = seededRandom(42);
  const raw = new Float32Array(COUNT * 3);
  const structured = new Float32Array(COUNT * 3);
  const colorMix = new Float32Array(COUNT); // 0 = cyan (raw), 1 = indigo (structured)

  // Raw: chaotic point cloud within a sphere
  for (let i = 0; i < COUNT; i++) {
    const r = 3.2 * Math.cbrt(rnd());
    const theta = rnd() * Math.PI * 2;
    const phi = Math.acos(2 * rnd() - 1);
    raw[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    raw[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    raw[i * 3 + 2] = r * Math.cos(phi);
    colorMix[i] = rnd();
  }

  // Structured: an evenly spaced grid — nodes / panels
  const cols = 56;
  const rows = Math.ceil(COUNT / cols);
  const spacingX = 6.4 / cols;
  const spacingY = 3.6 / rows;
  for (let i = 0; i < COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    structured[i * 3] = (col - cols / 2) * spacingX;
    structured[i * 3 + 1] = (row - rows / 2) * spacingY;
    structured[i * 3 + 2] = (rnd() - 0.5) * 0.15;
  }

  return { raw, structured, colorMix };
}

function buildColors(colorMix: Float32Array) {
  const cyan = new THREE.Color("#4cc9f0");
  const indigo = new THREE.Color("#5b6ef5");
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const c = cyan.clone().lerp(indigo, colorMix[i]);
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  return arr;
}

function ParticleField({
  progressRef,
  pointerRef,
}: {
  progressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const dataRef = useRef(buildPositions());
  const positionsRef = useRef(dataRef.current.raw.slice());
  const colorsRef = useRef(buildColors(dataRef.current.colorMix));

  const geomRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);
  const eased = useRef(0);

  useFrame((state) => {
    const { raw, structured } = dataRef.current;
    const positions = positionsRef.current;

    // Ease the scroll-driven progress toward its target for a fluid morph
    eased.current += (progressRef.current - eased.current) * 0.06;
    const t = eased.current;

    const posAttr = geomRef.current?.attributes.position as THREE.BufferAttribute | undefined;
    if (posAttr) {
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        positions[ix] = THREE.MathUtils.lerp(raw[ix], structured[ix], t);
        positions[ix + 1] = THREE.MathUtils.lerp(raw[ix + 1], structured[ix + 1], t);
        positions[ix + 2] = THREE.MathUtils.lerp(raw[ix + 2], structured[ix + 2], t);
      }
      posAttr.needsUpdate = true;
    }

    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const targetRotY = pointerRef.current.x * 0.35 + time * 0.02;
      const targetRotX = -pointerRef.current.y * 0.2 + (1 - t) * 0.15;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsRef.current, 3]}
            count={COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colorsRef.current, 3]}
            count={COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function DataField({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField progressRef={progressRef} pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
