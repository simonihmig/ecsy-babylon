import { Component } from 'ecsy';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

export default class MeshComponent extends Component {
  value: AbstractMesh | null = null;
  overrides: Record<string, unknown> = {};
  _prevValue: AbstractMesh | null = null;

  reset(): void {
    this.value = null;
    this._prevValue = null;
    this.overrides = {};
  }
}

Object.defineProperty(MeshComponent, 'name', { value: 'Mesh' });
