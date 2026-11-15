"use client";

import { Canvas } from "@react-three/fiber";
import Compass from "./Compass";

type Props = { label: string; sub: string };

/** Full-viewport WebGL layer (transparent; the blueprint grid shows through). */
export default function CompassCanvas(props: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Compass {...props} />
    </Canvas>
  );
}
