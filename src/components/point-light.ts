import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';

export default class PointLight extends Component {
  position: Vector3 = new Vector3(0, 1, 0);
  intensity = 1;
  light?: BabylonPointLight;

  reset(): void {
    this.position.set(0, 1, 0);
    this.intensity = 1;
    this.light = undefined;
  }
}

Object.defineProperty(PointLight, 'name', { value: 'PointLight' });
