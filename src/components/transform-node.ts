import { Component } from 'ecsy';
import { TransformNode as BabylonTransformNode } from '@babylonjs/core/Meshes/transformNode';

export default class TransformNode extends Component<TransformNode> {
  value: BabylonTransformNode | null = null;
  cloneNode = false;

  reset(): void {
    this.value = null;
    this.cloneNode = false;
  }
}
