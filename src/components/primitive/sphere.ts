import { Component, ComponentSchema, Types } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

export default class SphereComponent extends Component<SphereComponent> {
  segments!: number;
  diameter!: number;
  diameterX?: number;
  diameterY?: number;
  diameterZ?: number;
  arc!: number;
  slice!: number;
  updatable!: boolean;
  sideOrientation!: number;

  static schema: ComponentSchema = {
    segments: { type: Types.Number, default: 32 },
    diameter: { type: Types.Number, default: 1 },
    diameterX: { type: Types.Number, default: undefined },
    diameterY: { type: Types.Number, default: undefined },
    diameterZ: { type: Types.Number, default: undefined },
    arc: { type: Types.Number, default: 1 },
    slice: { type: Types.Number, default: 1 },
    updatable: { type: Types.Boolean },
    sideOrientation: { type: Types.Number, default: Mesh.DEFAULTSIDE },
  };
}
