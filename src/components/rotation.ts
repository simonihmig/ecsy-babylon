import { Component, ComponentSchema } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../-private/ecsy-types';

export default class Rotation extends Component<Rotation> {
  value!: Vector3;

  static schema: ComponentSchema = {
    value: { type: BabylonTypes.Vector3 },
  };
}
