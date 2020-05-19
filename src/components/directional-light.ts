import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';

export default class DirectionalLight extends Component {
  direction: Vector3 = new Vector3(0, -1, 0);
  intensity = 1;
  light?: BabylonDirectionalLight;

  reset(): void {
    this.direction.set(0, -1, 0);
    this.intensity = 1;
  }
}

Object.defineProperty(DirectionalLight, 'name', { value: 'DirectionalLight' });
