import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import ShadowLight, { schema as baseSchema } from './_shadow';
import { ComponentSchema, Types } from 'ecsy';
import { BabylonTypes } from '../../-private/ecsy-types';

export default class SpotLight extends ShadowLight<SpotLight> {
  direction!: Vector3;
  angle!: number;
  exponent!: number;

  static schema: ComponentSchema = {
    ...baseSchema,
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
    angle: { type: Types.Number, default: Math.PI / 3 },
    exponent: { type: Types.Number, default: 2 },
  };
}
