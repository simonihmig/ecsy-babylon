import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

export default class HemisphericLight extends Component {
  direction: Vector3 = new Vector3(0, -1, 0);
  intensity = 1;
  light?: BabylonHemisphericLight;

  reset(): void {
    this.direction.set(0, -1, 0);
    this.intensity = 1;
    this.light = undefined;
  }
}

Object.defineProperty(HemisphericLight, 'name', { value: 'HemisphericLight' });
