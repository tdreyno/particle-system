import {
  NumberPairGenerator,
  NumberGenerator,
  AccelerationGenerator
} from "./random.js";

export interface Emitter {
  wander: number;
  frequency: number;
  initialVelocity: NumberPairGenerator;
  position: NumberPairGenerator;
  radius: NumberGenerator;
  acceleration: AccelerationGenerator;
  colors: string[];
  lifetime: NumberGenerator;
  friction: number;
}
