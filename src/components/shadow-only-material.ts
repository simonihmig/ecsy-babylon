import { Component } from 'ecsy';
import { Light } from '@babylonjs/core/Lights/light';

export default class ShadowOnlyMaterial extends Component {
  activeLight: Light | null = null;

  reset() {
    this.activeLight = null;
  }
}

Object.defineProperty(ShadowOnlyMaterial, 'name', { value: 'ShadowOnlyMaterial' });
