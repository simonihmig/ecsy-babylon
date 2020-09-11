import { ComponentSchema, Types } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../../-private/ecsy-types';
import { AbstractTargetCamera, schema as baseSchema } from './target';

export default class ArcRotateCamera extends AbstractTargetCamera<ArcRotateCamera> {
  alpha!: number;
  beta!: number;
  radius!: number;
  target!: Vector3;

  lowerAlphaLimit!: number | null;
  lowerBetaLimit?: number;
  lowerRadiusLimit!: number | null;

  upperAlphaLimit!: number | null;
  upperBetaLimit?: number;
  upperRadiusLimit!: number | null;

  static schema: ComponentSchema = {
    ...baseSchema,
    alpha: { type: Types.Number },
    beta: { type: Types.Number },
    radius: { type: Types.Number, default: 10 },
    target: { type: BabylonTypes.Vector3 },
    lowerAlphaLimit: { type: Types.Number, default: null },
    lowerBetaLimit: { type: Types.Number, default: undefined },
    lowerRadiusLimit: { type: Types.Number, default: null },
    upperAlphaLimit: { type: Types.Number, default: null },
    upperBetaLimit: { type: Types.Number, default: undefined },
    upperRadiusLimit: { type: Types.Number, default: null },
  };
}
