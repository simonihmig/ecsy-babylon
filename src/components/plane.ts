import { Component } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

export default class PlaneComponent extends Component {
  size = 1;
  width?: number;
  height?: number;
  updatable = false;
  sideOrientation: number = Mesh.DEFAULTSIDE;

  reset(): void {
    this.size = 1;
    this.width = undefined;
    this.height = undefined;
    this.updatable = false;
    this.sideOrientation = Mesh.DEFAULTSIDE;
  }
}

Object.defineProperty(PlaneComponent, 'name', { value: 'Plane' });
