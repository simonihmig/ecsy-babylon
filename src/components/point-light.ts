import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';
import Light from './light';
import { ComponentSchema, Types } from 'ecsy';
import { BabylonTypes } from '../ecsy-types';

export default class PointLight extends Light<PointLight> {
  position!: Vector3;
  intensity!: number;
  light?: BabylonPointLight;

  static schema: ComponentSchema = {
    position: { type: BabylonTypes.Vector3, default: new Vector3(0, 1, 0) },
    intensity: { type: Types.Number, default: 1 },
    light: { type: Types.Ref },
  };
}
