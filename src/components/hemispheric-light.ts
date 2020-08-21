import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import Light from './light';

export default class HemisphericLight extends Light<HemisphericLight> {
  direction: Vector3 = new Vector3(0, -1, 0);
  intensity = 1;
  light?: BabylonHemisphericLight;

  reset(): void {
    this.direction.set(0, -1, 0);
    this.intensity = 1;
    this.light = undefined;
  }
}
