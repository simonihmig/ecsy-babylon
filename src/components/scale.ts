import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export default class Scale extends Component<Scale> {
  value: Vector3 = new Vector3(1, 1, 1);

  reset(): void {
    this.value.set(1, 1, 1);
  }
}
