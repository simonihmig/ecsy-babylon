import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';
import Light from './light';

export default class PointLight extends Light<PointLight> {
  position: Vector3 = new Vector3(0, 1, 0);
  intensity = 1;
  light?: BabylonPointLight;

  reset(): void {
    this.position.set(0, 1, 0);
    this.intensity = 1;
    this.light = undefined;
  }
}
