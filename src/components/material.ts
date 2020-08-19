import { Component } from 'ecsy';
import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';

export default class Material extends Component {
  value: BabylonMaterial | null = null;
  overrides: Record<string, unknown> = {};

  reset(): void {
    this.value = null;
    this.overrides = {};
  }
}

Object.defineProperty(Material, 'name', { value: 'Material' });
