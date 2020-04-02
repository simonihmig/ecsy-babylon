import { Component, createComponentClass } from 'ecsy';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';

export interface TransformNodeComponent extends Component {
  value: TransformNode | null;
  clone?: boolean;
}

export default createComponentClass<TransformNodeComponent>(
  {
    value: { default: null },
    clone: { default: false },
  },
  'TransformNode'
);
