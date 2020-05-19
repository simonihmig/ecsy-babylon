import { Component } from 'ecsy';
import { TransformNode as BabylonTransformNode } from '@babylonjs/core/Meshes/transformNode';

export default class TransformNode extends Component {
  value: BabylonTransformNode | null = null;
  clone = false;

  reset(): void {
    this.value = null;
    this.clone = false;
  }
}

Object.defineProperty(TransformNode, 'name', { value: 'TransformNode' });
