import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';
import ShadowLight, { schema as baseSchema } from './_shadow-light';
import { ComponentSchema } from 'ecsy';

export default class PointLight extends ShadowLight<PointLight, BabylonPointLight> {
  static schema: ComponentSchema = {
    ...baseSchema,
  };
}
