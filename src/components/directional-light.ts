import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import ShadowLight, { schema as baseSchema } from './_shadow-light';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { ComponentSchema } from 'ecsy';
import { BabylonTypes } from '../-private/ecsy-types';

export default class DirectionalLight extends ShadowLight<DirectionalLight, BabylonDirectionalLight> {
  direction!: Vector3;

  static schema: ComponentSchema = {
    ...baseSchema,
    direction: { type: BabylonTypes.Vector3, default: new Vector3(0, -1, 0) },
  };
}
