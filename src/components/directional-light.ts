import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import Light from './light';
import { ComponentSchema, Types } from 'ecsy';
import { BabylonTypes } from '../-private/ecsy-types';

export default class DirectionalLight extends Light<DirectionalLight> {
  direction!: Vector3;
  intensity!: number;
  light?: BabylonDirectionalLight;

  static schema: ComponentSchema = {
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
    intensity: { type: Types.Number, default: 1 },
    light: { type: Types.Ref },
  };
}
