import { Component } from 'ecsy';
import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';

export default class Material extends Component<Material> {
  value: BabylonMaterial | null = null;
  overrides: Record<string, unknown> = {};

  reset(): void {
    this.value = null;
    this.overrides = {};
  }
}
