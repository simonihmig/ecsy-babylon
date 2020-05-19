import { Component } from 'ecsy';
import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';

export default class Material extends Component {
  value: BabylonMaterial | null = null;

  reset(): void {
    this.value = null;
  }
}

Object.defineProperty(Material, 'name', { value: 'Material' });
