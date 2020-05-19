import { Component } from 'ecsy';
import { Color3 } from '@babylonjs/core/Maths/math.color';

export default class StandardMaterial extends Component {
  ambientColor: Color3 = Color3.Black();
  diffuseColor: Color3 = Color3.White();
  emissiveColor: Color3 = Color3.Black();
  disableLighting = false;
  alpha = 1;

  reset() {
    this.ambientColor.set(0, 0, 0);
    this.diffuseColor.set(1, 1, 1);
    this.emissiveColor.set(0, 0, 0);
    this.disableLighting = false;
    this.alpha = 1;
  }
}

Object.defineProperty(StandardMaterial, 'name', { value: 'StandardMaterial' });
