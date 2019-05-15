import { Vector } from "./Vector.js";

const { floor, random } = Math;

export type NumberGenerator = () => number;
export type NumberPairGenerator = () => Vector;
export type AccelerationGenerator = (velocity: Vector) => Vector;

export function randomizeNumber(a: number, b: number): NumberGenerator {
  return () => {
    return a + (b - a) * random();
  };
}

export function randomizeVector(
  x: [number, number],
  y: [number, number]
): NumberPairGenerator {
  const randX = randomizeNumber(...x);
  const randY = randomizeNumber(...y);
  return () => new Vector(randX(), randY());
}

export function randomizeArray<T>(a: T[]): () => T {
  const rand = randomizeNumber(0, a.length - 1);
  return () => {
    const i = floor(rand());
    return a[i];
  };
}
