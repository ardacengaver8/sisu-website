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

/**
 * Heading (degrees clockwise from north) for expertise i — seven roughly even
 * directions, rounded to multiples of 5 so the readout is always a clean number.
 * The dial markers are drawn from the same table.
 */
export const HEADINGS = [25, 75, 130, 180, 230, 285, 335];
export const stepHeading = (i: number) => HEADINGS[i % HEADINGS.length];
