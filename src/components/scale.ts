import { Component, ComponentSchema } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../ecsy-types';

export default class Scale extends Component<Scale> {
  value!: Vector3;

  static schema: ComponentSchema = {
    value: { type: BabylonTypes.Vector3 },
  };
}
