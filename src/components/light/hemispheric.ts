import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { schema as baseSchema } from './_shadow';
import { ComponentSchema } from 'ecsy';
import { BabylonTypes } from '../../-private/ecsy-types';
import Light from './_light';
import { Color3 } from '@babylonjs/core/Maths/math.color';

export default class HemisphericLight extends Light<HemisphericLight> {
  direction!: Vector3;
  groundColor!: Color3;

  static schema: ComponentSchema = {
    ...baseSchema,
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
    groundColor: { type: BabylonTypes.Color3, default: Color3.Black() },
  };
}
