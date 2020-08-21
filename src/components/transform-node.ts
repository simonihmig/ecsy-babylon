import { Component, ComponentSchema, Types } from 'ecsy';
import { TransformNode as BabylonTransformNode } from '@babylonjs/core/Meshes/transformNode';

export default class TransformNode extends Component<TransformNode> {
  value!: BabylonTransformNode | null;
  cloneNode!: boolean;

  static schema: ComponentSchema = {
    value: { type: Types.Ref, default: null },
    cloneNode: { type: Types.Boolean },
  };
}
