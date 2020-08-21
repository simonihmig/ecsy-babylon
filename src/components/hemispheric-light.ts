import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import Light from './light';
import { ComponentSchema, Types } from 'ecsy';
import { BabylonTypes } from '../ecsy-types';

export default class HemisphericLight extends Light<HemisphericLight> {
  direction!: Vector3;
  intensity!: number;
  light?: BabylonHemisphericLight;

  static schema: ComponentSchema = {
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
    intensity: { type: Types.Number, default: 1 },
    light: { type: Types.Ref },
  };
}
