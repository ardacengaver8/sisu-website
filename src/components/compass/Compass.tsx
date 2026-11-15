"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { compass, stepHeading } from "@/lib/compass-store";
import { makeDialTexture } from "./dial";

/**
 * The Sisu compass, rendered as a technical line drawing (accent on ice).
 * Local space: unit radius ≈ 1, dial faces +Y, north = -Z.
 */

/** Line colours come from CSS custom properties so the drawing follows the page theme. */
function themeColors() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return { line: v("--drawing", "#e3ecff"), accent: v("--drawing-accent", "#8fbcff"), strong: v("--drawing-strong", "#ffffff") };
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Turns a list of points into line-segment pairs. */
const polyline = (pts: THREE.Vector3[]) => {
  const segs: THREE.Vector3[] = [];
  for (let i = 0; i < pts.length - 1; i++) segs.push(pts[i], pts[i + 1]);
  return new THREE.BufferGeometry().setFromPoints(segs);
};
const ring = (r: number, y: number, n = 160) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
  });

function useParts() {
  return useMemo(() => {
    // case outline: lathe profile → only its sharp edges become lines
    const profile = [
      [0.0, -0.17],
      [0.86, -0.17],
      [0.97, -0.15],
      [1.04, -0.09],
      [1.06, 0.0],
      [1.04, 0.08],
      [0.99, 0.12],
      [0.94, 0.12],
      [0.935, 0.05],
      [0.0, 0.05],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const body = new THREE.EdgesGeometry(new THREE.LatheGeometry(profile, 160), 18);

    // pocket-compass crown + bow at north
    const crownG = new THREE.CylinderGeometry(0.075, 0.075, 0.16, 32);
    crownG.rotateX(Math.PI / 2);
    crownG.translate(0, -0.02, -1.12);
    const bowG = new THREE.TorusGeometry(0.17, 0.028, 16, 64);
    bowG.rotateX(Math.PI / 2);
    bowG.translate(0, -0.02, -1.36);

    // glass dome silhouette: two crossing arcs + its rim
    const arc = (phi: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const x = (-1 + (2 * i) / 64) * 0.94;
        const y = 0.12 + (Math.sqrt(2.2 ** 2 - x * x) - Math.sqrt(2.2 ** 2 - 0.94 ** 2));
        pts.push(new THREE.Vector3(Math.cos(phi) * x, y, Math.sin(phi) * x));
      }
      return polyline(pts);
    };

    // needle halves (2D shape, +Y = north) laid into XZ with north = -Z
    const half = (dir: 1 | -1) => {
      const s = new THREE.Shape();
      s.moveTo(0, dir * 0.8);
      s.lineTo(0.075, 0);
      s.lineTo(-0.075, 0);
      s.closePath();
      const g = new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false });
      g.rotateX(-Math.PI / 2);
      g.translate(0, 0.085, 0);
      return g;
    };
    const northFill = half(1);
    const south = half(-1);
    const pivot = new THREE.CylinderGeometry(0.055, 0.065, 0.06, 32);
    pivot.translate(0, 0.12, 0);

    const dial = new THREE.CircleGeometry(0.93, 128);
    dial.rotateX(-Math.PI / 2);
    dial.translate(0, 0.052, 0);

    return {
      dial,
      northFill,
      /** outlines in draw order (the drawing "draws itself" in this sequence) */
      staticLines: [
        body,
        new THREE.EdgesGeometry(crownG, 30),
        new THREE.EdgesGeometry(bowG, 40),
        arc(0),
        arc(Math.PI / 2),
      ],
      needleLines: [
        new THREE.EdgesGeometry(northFill, 30),
        new THREE.EdgesGeometry(south, 30),
        new THREE.EdgesGeometry(pivot, 30),
      ],
      ripple: polyline(ring(1, 0.06)),
    };
  }, []);
}

/** Dashed centre lines, construction circles and the Ø dimension. */
function useConstruction(color: string) {
  return useMemo(() => {
    const dashed = new THREE.LineDashedMaterial({ color, dashSize: 0.06, gapSize: 0.045, transparent: true, depthWrite: false });
    const solid = new THREE.LineBasicMaterial({ color, transparent: true, depthWrite: false });
    const group = new THREE.Group();
    const add = (pts: THREE.Vector3[], m: THREE.Material) => {
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m);
      l.computeLineDistances();
      group.add(l);
    };
    const V = (x: number, z: number) => new THREE.Vector3(x, 0, z);
    add(ring(1.32, 0), dashed);
    add(ring(0.5, 0), dashed);
    add([V(-1.7, 0), V(1.7, 0)], dashed);
    add([V(0, -1.75), V(0, 1.7)], dashed);
    const z = 1.42;
    add([V(-1.06, z), V(1.06, z)], solid);
    add([V(-1.06, z - 0.08), V(-1.06, z + 0.08)], solid);
    add([V(1.06, z - 0.08), V(1.06, z + 0.08)], solid);
    add([V(-1.06, 0.1), V(-1.06, z + 0.05)], dashed);
    add([V(1.06, 0.1), V(1.06, z + 0.05)], dashed);
    return { group };
  }, [color]);
}

type Props = { label: string; sub: string };

export default function Compass({ label, sub }: Props) {
  const parts = useParts();
  const [colors] = useState(themeColors);
  const construction = useConstruction(colors.line);
  const { viewport, size, camera } = useThree();

  const outer = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const needle = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.LineSegments>(null);
  const dialRef = useRef<THREE.Mesh>(null);
  const northRef = useRef<THREE.Mesh>(null);
  const constructionRef = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(THREE.LineSegments | null)[]>([]);

  const mats = useMemo(
    () => ({
      line: new THREE.LineBasicMaterial({ color: colors.line, transparent: true }),
      dial: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
      north: new THREE.MeshBasicMaterial({ color: colors.accent, transparent: true, depthWrite: false }),
      ripple: new THREE.LineBasicMaterial({ color: colors.accent, transparent: true, opacity: 0 }),
    }),
    [colors],
  );

  // dial artwork needs the web fonts, so draw it once they're ready
  const [dialTex, setDialTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let alive = true;
    const css = getComputedStyle(document.documentElement);
    const sans = css.getPropertyValue("--font-archivo").trim() || "sans-serif";
    const mono = css.getPropertyValue("--font-plex-mono").trim() || "monospace";
    document.fonts.ready.then(() => {
      if (alive) setDialTex(makeDialTexture(sans, mono, colors));
    });
    return () => {
      alive = false;
    };
  }, [colors]);

  const tmp = useMemo(() => ({ c: new THREE.Vector3(), e: new THREE.Vector3(), x: new THREE.Vector3(1, 0, 0) }), []);
  const phys = useRef({ angle: 0, vel: 0, lastSpin: -1e9, yaw: 0, pitch: 0, t: 0, ripple: 1 });

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 30);
    const p = phys.current;
    p.t += dt;
    const reduced = compass.reduced;
    const mobile = size.width < 768;
    const travel = smooth(clamp(compass.travel));
    const exit = smooth(clamp(compass.exit));
    const draw = reduced ? 1 : clamp(compass.draw);

    /* ---- placement: right of the hero text → left of the expertise panel ---- */
    const unit = Math.min(viewport.width, viewport.height);
    const heroX = mobile ? 0 : viewport.width * 0.22;
    const heroY = mobile ? viewport.height * 0.25 : -viewport.height * 0.02;
    const expX = mobile ? 0 : -viewport.width * 0.21;
    const expY = mobile ? viewport.height * 0.24 : 0;
    const scale = (mobile ? unit * 0.27 : unit * 0.3) * lerp(1, mobile ? 1.05 : 0.9, travel) * (1 - exit * 0.25);
    const g = outer.current!;
    const bob = reduced ? 0 : Math.sin(p.t * 0.7) * 0.025 * scale;
    g.position.set(lerp(heroX, expX, travel), lerp(heroY, expY, travel) + exit * viewport.height * 0.45 + bob, 0);
    g.scale.setScalar(scale);

    /* ---- orientation: drag + gentle pointer parallax ---- */
    const pointerOn = compass.pointer.active && !mobile;
    const px = pointerOn ? (compass.pointer.x / size.width) * 2 - 1 : 0;
    const py = pointerOn ? (compass.pointer.y / size.height) * 2 - 1 : 0;
    if (!compass.drag.active) {
      compass.drag.yaw *= Math.exp(-dt * 1.4);
      compass.drag.pitch *= Math.exp(-dt * 1.8);
    }
    const ease = 1 - Math.exp(-dt * 6);
    p.yaw = lerp(p.yaw, compass.drag.yaw + px * 0.18 + (reduced ? 0 : Math.sin(p.t * 0.25) * 0.08), ease);
    p.pitch = lerp(p.pitch, compass.drag.pitch + py * 0.1, ease);
    g.rotation.set(p.pitch, p.yaw, lerp(-0.12, 0.08, travel));
    tilt.current!.rotation.x = Math.PI / 2 - lerp(0.62, 0.28, travel);

    /* ---- project centre + radius to screen px, for pointer hit-testing ---- */
    g.getWorldPosition(tmp.c);
    tmp.e.copy(tmp.c).addScaledVector(tmp.x, scale);
    tmp.c.project(camera);
    tmp.e.project(camera);
    const sx = (tmp.c.x * 0.5 + 0.5) * size.width;
    const sy = (-tmp.c.y * 0.5 + 0.5) * size.height;
    compass.screen.x = sx;
    compass.screen.y = sy;
    compass.screen.r = Math.abs((tmp.e.x * 0.5 + 0.5) * size.width - sx) * 1.1;

    /* ---- needle: damped spring toward a target heading (underdamped → it "searches") ---- */
    const now = performance.now();
    if (compass.spinAt !== p.lastSpin) {
      p.lastSpin = compass.spinAt;
      if (!reduced) p.vel += 1400;
      p.ripple = 0;
    }
    let target: number;
    let k = 55;
    let damp = 4.2;
    if (now - compass.spinAt < 1700) {
      target = 0; // click → spin, then settle on north
      k = 30;
      damp = 2.6;
    } else if (compass.step >= 0) {
      target = stepHeading(compass.step);
    } else if (pointerOn && compass.screen.r > 0) {
      target = (Math.atan2(compass.pointer.x - sx, -(compass.pointer.y - sy)) * 180) / Math.PI;
      k = 22;
      damp = 3.4;
    } else {
      target = Math.sin(p.t * 0.35) * 14 + Math.sin(p.t * 1.3) * 3;
      k = 18;
    }
    const diff = ((((target - p.angle) % 360) + 540) % 360) - 180;
    if (reduced) {
      p.angle += diff;
      p.vel = 0;
    } else {
      p.vel += (diff * k - p.vel * damp) * dt;
      p.vel += (Math.random() - 0.5) * 6; // magnetic tremble
      p.angle += p.vel * dt;
    }
    needle.current!.rotation.y = (-p.angle * Math.PI) / 180;

    /* ---- click ripple ---- */
    p.ripple = Math.min(1, p.ripple + dt * 1.1);
    rippleRef.current!.scale.setScalar(1 + smooth(p.ripple) * 0.6);
    (rippleRef.current!.material as THREE.LineBasicMaterial).opacity = (1 - p.ripple) * 0.9;

    /* ---- the drawing draws itself on load ---- */
    const n = lineRefs.current.length;
    lineRefs.current.forEach((l, i) => {
      if (!l) return;
      const count = l.geometry.attributes.position.count;
      const local = clamp(draw * 1.3 - (i / n) * 0.3);
      l.geometry.setDrawRange(0, Math.floor((count * local) / 2) * 2);
      (l.material as THREE.LineBasicMaterial).opacity = draw;
    });
    // (three.js objects are mutated through refs — see CLAUDE.md "React Compiler")
    const dialMat = dialRef.current!.material as THREE.MeshBasicMaterial;
    if (dialTex && dialMat.map !== dialTex) {
      dialMat.map = dialTex;
      dialMat.needsUpdate = true;
    }
    dialMat.opacity = clamp(draw * 1.5 - 0.3);
    (northRef.current!.material as THREE.MeshBasicMaterial).opacity = clamp(draw * 2 - 1) * 0.92;
    constructionRef.current!.children.forEach((c) => ((c as THREE.Line).material as THREE.Material).opacity = 0.55 * draw);
    const labelAlpha = String(clamp(draw * 1.4 - 0.4) * (1 - travel));
    if (labelRef.current) labelRef.current.style.opacity = labelAlpha;
    if (dimRef.current) dimRef.current.style.opacity = labelAlpha;
  });

  const setLine = (i: number) => (el: THREE.LineSegments | null) => {
    lineRefs.current[i] = el;
  };
  const nStatic = parts.staticLines.length;

  return (
    <group ref={outer}>
      <group ref={tilt}>
        <primitive ref={constructionRef} object={construction.group} />
        <mesh ref={dialRef} geometry={parts.dial} material={mats.dial} />
        {parts.staticLines.map((geo, i) => (
          <lineSegments key={i} ref={setLine(i)} geometry={geo} material={mats.line} />
        ))}
        <lineSegments ref={rippleRef} geometry={parts.ripple} material={mats.ripple} />

        <group ref={needle}>
          <mesh ref={northRef} geometry={parts.northFill} material={mats.north} />
          {parts.needleLines.map((geo, i) => (
            <lineSegments key={i} ref={setLine(nStatic + i)} geometry={geo} material={mats.line} />
          ))}
        </group>

        <Html position={[1.25, 0, -1.25]} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <div ref={labelRef} className="label whitespace-nowrap text-accent" style={{ opacity: 0 }}>
            <div>FIG. 01 — {label}</div>
            <div className="mt-1 normal-case tracking-normal text-muted">{sub}</div>
          </div>
        </Html>
        <Html position={[0, 0, 1.56]} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <div ref={dimRef} className="label whitespace-nowrap text-accent" style={{ opacity: 0 }}>
            Ø 64 mm
          </div>
        </Html>
      </group>
    </group>
  );
}
