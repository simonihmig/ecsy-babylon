import { Component, createComponentClass } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import Types from '../types';

export interface ScaleComponent extends Component {
  value: Vector3;
}

export default createComponentClass<ScaleComponent>(
  {
    value: { default: new Vector3(1, 1, 1), type: Types.Vector3 },
  },
  'Scale'
);
