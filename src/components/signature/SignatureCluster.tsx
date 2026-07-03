"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GROUPS = [
  { label: "Product", color: "#4cc9f0", count: 60 },
  { label: "Billing", color: "#5b6ef5", count: 45 },
  { label: "Support", color: "#9b7cff", count: 38 },
  { label: "Marketing", color: "#f2f3f5", count: 50 },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildNodes() {
  const rnd = seededRandom(7);
  const total = GROUPS.reduce((a, g) => a + g.count, 0);
  const scattered = new Float32Array(total * 3);
  const clustered = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);

  const clusterCenters = [
    [-2.1, 1.1, 0],
    [2.1, 1.0, -0.4],
    [-1.9, -1.2, 0.3],
    [2.0, -1.1, 0.1],
  ];

  let idx = 0;
  GROUPS.forEach((g, gi) => {
    const color = new THREE.Color(g.color);
    for (let i = 0; i < g.count; i++) {
      const r = 3.4 * Math.cbrt(rnd());
      const theta = rnd() * Math.PI * 2;
      const phi = Math.acos(2 * rnd() - 1);
      scattered[idx * 3] = r * Math.sin(phi) * Math.cos(theta);
      scattered[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      scattered[idx * 3 + 2] = r * Math.cos(phi) * 0.6;

      const [cx, cy, cz] = clusterCenters[gi];
      const localR = 0.55 * Math.cbrt(rnd());
      const lt = rnd() * Math.PI * 2;
      const lp = Math.acos(2 * rnd() - 1);
      clustered[idx * 3] = cx + localR * Math.sin(lp) * Math.cos(lt);
      clustered[idx * 3 + 1] = cy + localR * Math.sin(lp) * Math.sin(lt);
      clustered[idx * 3 + 2] = cz + localR * Math.cos(lp);

      colors[idx * 3] = color.r;
      colors[idx * 3 + 1] = color.g;
      colors[idx * 3 + 2] = color.b;
      idx++;
    }
  });

  return { scattered, clustered, colors, total };
}

function Nodes({ clustered: isClustered }: { clustered: boolean }) {
  const dataRef = useRef(buildNodes());
  const positionsRef = useRef(dataRef.current.scattered.slice());
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((state) => {
    const { scattered, clustered, total } = dataRef.current;
    const positions = positionsRef.current;

    const target = isClustered ? 1 : 0;
    progress.current += (target - progress.current) * 0.045;
    const t = progress.current;

    const posAttr = geomRef.current?.attributes.position as THREE.BufferAttribute | undefined;
    if (posAttr) {
      for (let i = 0; i < total; i++) {
        const ix = i * 3;
        positions[ix] = THREE.MathUtils.lerp(scattered[ix], clustered[ix], t);
        positions[ix + 1] = THREE.MathUtils.lerp(scattered[ix + 1], clustered[ix + 1], t);
        positions[ix + 2] = THREE.MathUtils.lerp(scattered[ix + 2], clustered[ix + 2], t);
      }
      posAttr.needsUpdate = true;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsRef.current, 3]}
            count={dataRef.current.total}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dataRef.current.colors, 3]}
            count={dataRef.current.total}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.075} vertexColors transparent opacity={0.95} sizeAttenuation />
      </points>
    </group>
  );
}

export default function SignatureCluster() {
  const [clustered, setClustered] = useState(false);

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.75]}>
        <Nodes clustered={clustered} />
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <button
          onClick={() => setClustered((c) => !c)}
          className="px-5 py-2.5 rounded-full text-[13px] font-medium bg-text text-bg hover:opacity-90 transition-opacity"
        >
          {clustered ? "Scatter the data" : "Organize into clusters"}
        </button>
        <div className="flex items-center gap-4">
          {GROUPS.map((g) => (
            <div key={g.label} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: g.color }} />
              <span className="mono-label text-text-faint">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
