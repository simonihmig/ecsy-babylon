import { Component } from 'ecsy';
import { Light } from '@babylonjs/core/Lights/light';

export default class ShadowOnlyMaterial extends Component<ShadowOnlyMaterial> {
  activeLight: Light | null = null;

  reset(): void {
    this.activeLight = null;
  }
}
