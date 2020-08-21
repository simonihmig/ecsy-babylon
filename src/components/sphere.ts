import { Component } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

export default class SphereComponent extends Component<SphereComponent> {
  segments = 32;
  diameter = 1;
  diameterX?: number;
  diameterY?: number;
  diameterZ?: number;
  arc = 1;
  slice = 1;
  updatable = false;
  sideOrientation: number = Mesh.DEFAULTSIDE;

  reset(): void {
    this.segments = 32;
    this.diameter = 1;
    this.diameterX = undefined;
    this.diameterY = undefined;
    this.diameterZ = undefined;
    this.arc = 1;
    this.slice = 1;
    this.updatable = false;
    this.sideOrientation = Mesh.DEFAULTSIDE;
  }
}
