import { Particle } from "./Particle.js";
import { Emitter } from "./Emitter.js";
import { randomizeArray } from "./random.js";

const { round, floor, PI, random } = Math;

const DPR = window.devicePixelRatio;

export class System {
  canvasWidth: number;
  canvasHeight: number;
  lastTimestamp: number = 0;
  lifetimeParticles = 0;
  particles: {
    [key: string]: Particle;
  } = {};
  emitters: Emitter[] = [];

  constructor(
    public canvas: HTMLCanvasElement,
    public width: number,
    public height: number
  ) {
    this.canvasWidth = round(width * DPR);
    this.canvasHeight = round(height * DPR);

    this.onFrame = this.onFrame.bind(this);

    this.setupCanvas();

    this.lastTimestamp = performance.now();
    this.onFrame(this.lastTimestamp);
  }

  emit({
    frequency,
    initialVelocity,
    position,
    colors,
    acceleration,
    lifetime,
    radius,
    wander,
    friction
  }: Emitter) {
    let num =
      frequency < 1 ? (random() <= frequency ? 1 : 0) : floor(frequency);

    while (num--) {
      const color = randomizeArray(colors)();

      const v = initialVelocity();

      this.particles[this.lifetimeParticles++] = new Particle(
        color,
        radius(),
        position(),
        v,
        acceleration(v),
        wander,
        lifetime(),
        friction
      );
    }
  }

  private setupCanvas() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  onFrame(timestamp: DOMHighResTimeStamp) {
    // Emit
    for (const e of this.emitters) {
      this.emit(e);
    }

    const delta = (timestamp - this.lastTimestamp) / 1000;
    const ctx = this.canvas.getContext("2d")!;

    ctx.save();

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    ctx.scale(DPR, DPR);

    for (const k in this.particles) {
      if (!this.particles.hasOwnProperty(k)) {
        continue;
      }

      const p = this.particles[k];

      // Grouped by color for perf reasons.
      ctx.fillStyle = p.color;

      p.tick(delta);

      if (p.isDead) {
        delete this.particles[k];
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.position.x, p.position.y, p.radius, 0, PI * 2);
      ctx.fill();
    }

    ctx.restore();

    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.onFrame);
  }
}
