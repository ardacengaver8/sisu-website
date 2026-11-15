import * as THREE from "three";
import { stepHeading } from "@/lib/compass-store";

const COBALT = "#1d3bd6";
const INK = "#0a1220";

/** Cardinal letters are always N/E/S/W — the international convention on real compasses. */
const CARDINALS = ["N", "E", "S", "W"];

/** Draws the compass rose as cobalt line-work on a transparent canvas texture. */
export function makeDialTexture(fontFamily: string, monoFamily: string) {
  const S = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const C = S / 2;
  const R = S / 2;
  const at = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [C + Math.sin(a) * r * R, C - Math.cos(a) * r * R] as const;
  };
  const stroke = COBALT;

  // rings
  g.strokeStyle = stroke;
  for (const [r, w] of [
    [0.985, 3],
    [0.9, 1.5],
    [0.78, 1],
    [0.6, 1.5],
    [0.2, 1],
  ] as const) {
    g.lineWidth = w;
    g.beginPath();
    g.arc(C, C, r * R, 0, Math.PI * 2);
    g.stroke();
  }

  // ticks
  for (let d = 0; d < 360; d += 2) {
    const major = d % 30 === 0;
    const mid = d % 10 === 0;
    const [x1, y1] = at(d, 0.9);
    const [x2, y2] = at(d, major ? 0.82 : mid ? 0.85 : 0.875);
    g.lineWidth = major ? 3 : mid ? 2 : 1;
    g.strokeStyle = stroke;
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke();
  }

  // degree numbers
  g.fillStyle = stroke;
  g.font = `500 26px ${monoFamily}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let d = 30; d < 360; d += 30) {
    if (d % 90 === 0) continue;
    const [x, y] = at(d, 0.94);
    g.save();
    g.translate(x, y);
    g.rotate((d * Math.PI) / 180);
    g.fillText(String(d).padStart(3, "0"), 0, 0);
    g.restore();
  }

  // cardinal letters
  g.font = `700 92px ${fontFamily}`;
  CARDINALS.forEach((l, i) => {
    const d = i * 90;
    const [x, y] = at(d, 0.69);
    g.save();
    g.translate(x, y);
    g.rotate((d * Math.PI) / 180);
    g.fillStyle = i === 0 ? INK : stroke;
    g.fillText(l, 0, 0);
    g.restore();
  });

  // star rose (thin)
  g.lineWidth = 1.2;
  g.strokeStyle = "rgba(29,59,214,.6)";
  for (let i = 0; i < 8; i++) {
    const d = i * 45;
    const long = i % 2 === 0 ? 0.56 : 0.4;
    const [tx, ty] = at(d, long);
    const [lx, ly] = at(d - 22.5, 0.12);
    const [rx, ry] = at(d + 22.5, 0.12);
    g.beginPath();
    g.moveTo(lx, ly);
    g.lineTo(tx, ty);
    g.lineTo(rx, ry);
    g.stroke();
  }

  // expertise markers 01–07
  for (let i = 0; i < 7; i++) {
    const d = stepHeading(i);
    const [tx, ty] = at(d, 0.775);
    const [lx, ly] = at(d - 2.6, 0.73);
    const [rx, ry] = at(d + 2.6, 0.73);
    g.fillStyle = COBALT;
    g.beginPath();
    g.moveTo(tx, ty);
    g.lineTo(lx, ly);
    g.lineTo(rx, ry);
    g.closePath();
    g.fill();
    const [x, y] = at(d, 0.665);
    g.save();
    g.translate(x, y);
    g.rotate((d * Math.PI) / 180);
    g.font = `500 24px ${monoFamily}`;
    g.fillText(String(i + 1).padStart(2, "0"), 0, 0);
    g.restore();
  }

  // maker's mark
  g.fillStyle = COBALT;
  g.font = `600 22px ${monoFamily}`;
  g.fillText("SİSU", C, C + 0.32 * R);
  g.font = `400 16px ${monoFamily}`;
  g.fillText("41°03′N  28°59′E", C, C + 0.37 * R);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
