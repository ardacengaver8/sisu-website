/**
 * Shared, mutable state between the DOM (scroll triggers, pointer events)
 * and the three.js render loop. Deliberately not React state: it changes
 * every frame and must not trigger re-renders.
 */
export const compass = {
  /** 0 → 1: line-drawing "draws itself" on load */
  draw: 0,
  /** 0 = hero position, 1 = expertise position */
  travel: 0,
  /** 0 = visible, 1 = scrolled away */
  exit: 0,
  /** active expertise index, -1 when outside the expertise section */
  step: -1,
  pointer: { x: 0, y: 0, active: false },
  /** compass centre + radius on screen, in CSS px (written by the render loop) */
  screen: { x: -9999, y: -9999, r: 0 },
  drag: { active: false, yaw: 0, pitch: 0 },
  /** performance.now() of the last click — triggers the "snap to north" spin */
  spinAt: -1e9,
  reduced: false,
};

/** Expertise i points to this heading (degrees clockwise from north). */
export const STEP_OFFSET = 360 / 14;
export const stepHeading = (i: number) => STEP_OFFSET + (i * 360) / 7;
