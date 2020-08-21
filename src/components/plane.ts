import { Component, ComponentSchema, Types } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

export default class PlaneComponent extends Component<PlaneComponent> {
  size!: number;
  width?: number;
  height?: number;
  updatable!: boolean;
  sideOrientation!: number;

  static schema: ComponentSchema = {
    size: { type: Types.Number, default: 1 },
    width: { type: Types.Number, default: undefined },
    height: { type: Types.Number, default: undefined },
    updatable: { type: Types.Boolean },
    sideOrientation: { type: Types.Number, default: Mesh.DEFAULTSIDE },
  };
}
