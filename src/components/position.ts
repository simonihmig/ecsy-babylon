import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export default class Position extends Component {
  value: Vector3 = new Vector3(0, 0, 0);

  reset(): void {
    this.value.set(0, 0, 0);
  }
}

Object.defineProperty(Position, 'name', { value: 'Position' });
