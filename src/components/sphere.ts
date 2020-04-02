import { Component, createComponentClass } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import Types from '../types';

export interface SphereComponent extends Component {
  name: string;
  segments: number;
  diameter: number;
  diameterX?: number;
  diameterY?: number;
  diameterZ?: number;
  arc: number;
  slice: number;
  updatable: boolean;
  sideOrientation: number;
}

export default createComponentClass<SphereComponent>(
  {
    segments: { default: 32 },
    diameter: { default: 1 },
    diameterX: { type: Types.OptionalNumber },
    diameterY: { type: Types.OptionalNumber },
    diameterZ: { type: Types.OptionalNumber },
    arc: { default: 1 },
    slice: { default: 1 },
    updatable: { default: false },
    sideOrientation: { default: Mesh.DEFAULTSIDE },
  },
  'Sphere'
);
