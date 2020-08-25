import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { schema as baseSchema } from './_shadow-light';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { ComponentSchema } from 'ecsy';
import { BabylonTypes } from '../-private/ecsy-types';
import Light from './_light';

export default class HemisphericLight extends Light<HemisphericLight, BabylonHemisphericLight> {
  direction!: Vector3;

  static schema: ComponentSchema = {
    ...baseSchema,
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
  };
}
