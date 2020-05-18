import { Component } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

export default class BoxComponent extends Component {
  size = 1;
  width?: number;
  height?: number;
  depth?: number;
  updatable = false;
  sideOrientation: number = Mesh.DEFAULTSIDE;

  reset(): void {
    this.size = 1;
    this.width = undefined;
    this.height = undefined;
    this.depth = undefined;
    this.updatable = false;
    this.sideOrientation = Mesh.DEFAULTSIDE;
  }
}

Object.defineProperty(BoxComponent, 'name', { value: 'Box' });
