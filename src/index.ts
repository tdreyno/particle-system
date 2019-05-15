import { System } from "./System.js";
import { randomizeVector, randomizeNumber } from "./random.js";
import { Point } from "./Vector.js";

const system = new System(
  document.getElementById("canvas") as HTMLCanvasElement,
  window.innerWidth,
  window.innerHeight
);

system.emitters.push({
  frequency: 1,
  // position: randomizeVector([0, window.innerHeight / 4], [window.innerWidth, window.innerHeight / 4]),
  position: () => new Point(window.innerWidth / 2, window.innerHeight / 4),
  colors: [
    "#291b44",
    "#bd72f2",
    "#f8656a",
    "#5c497f",
    "#402e60",
    "#f4fafc",
    "#cc9d70",
    "#82cbb1"
  ],

  radius: randomizeNumber(4, 8),
  initialVelocity: randomizeVector([-40, 40], [-40, 40]),

  acceleration: randomizeVector([0, 0], [0, 0]),

  // lifetime: randomizeNumber(0.8, 1.2),
  lifetime: () => Infinity,

  wander: 100,
  friction: 0
});
