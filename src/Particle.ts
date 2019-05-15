import { randomizeNumber } from "./random.js";
import { Point, Vector } from "./Vector.js";

const { PI, sin, cos } = Math;
const RANDOM_THETA = randomizeNumber(PI, PI * 2);
const RANDOM_FIFTY = randomizeNumber(-0.5, 0.5);

export class Particle {
  theta: number;
  age = 0;
  isDead = false;

  constructor(
    public color: string,
    public radius: number,
    public position: Point,
    public velocity: Vector,
    public acceleration: Vector,

    public wander: number,
    public maxAge: number,
    public friction: number
  ) {
    this.theta = wander > 0 ? RANDOM_THETA() : 0;
  }

  kill() {
    this.isDead = true;
  }

  tick(delta: number) {
    if (this.age > this.maxAge) {
      this.kill();
    }

    this.age += delta;

    // Move
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    // Accelerate
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    // Friction
    this.velocity.x *= 1 - this.friction * delta;
    this.velocity.y *= 1 - this.friction * delta;

    // Wander
    this.theta += RANDOM_FIFTY() * this.wander;
    this.velocity.x += sin(this.theta) * 0.1;
    this.velocity.y += cos(this.theta) * 0.1;
  }
}
