import { Component, createComponentClass } from 'ecsy';
import { Vector3 } from '@babylonjs/core';
import Types from '../types';

export interface RotationComponent extends Component {
  value: Vector3;
}

export default createComponentClass<RotationComponent>(
  {
    value: { default: new Vector3(0, 0, 0), type: Types.Vector3 },
  },
  'Rotation'
);
