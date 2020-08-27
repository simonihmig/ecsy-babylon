import { ComponentSchema, Types } from 'ecsy';
import { ShadowLight as BabylonShadowLight } from '@babylonjs/core/Lights/shadowLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../../-private/ecsy-types';
import Light, { schema as baseSchema } from './_light';

export default abstract class ShadowLight<C, L extends BabylonShadowLight> extends Light<C, L> {
  position!: Vector3;
  shadowMinZ?: number;
  shadowMaxZ?: number;
}

export const schema: ComponentSchema = {
  ...baseSchema,
  shadowMinZ: { type: Types.Number, default: undefined },
  shadowMaxZ: { type: Types.Number, default: undefined },
  position: { type: BabylonTypes.Vector3, default: undefined },
};
