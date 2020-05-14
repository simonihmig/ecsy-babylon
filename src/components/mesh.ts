import { Component } from 'ecsy';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

export default class MeshComponent extends Component {
  value: AbstractMesh | null = null;

  reset(): void {
    this.value = null;
  }
}

Object.defineProperty(MeshComponent, 'name', { value: 'Mesh' });
