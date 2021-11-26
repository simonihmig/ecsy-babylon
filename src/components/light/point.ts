import ShadowLight, { schema as baseSchema } from './_shadow';
import { ComponentSchema } from 'ecsy';

export default class PointLight extends ShadowLight<PointLight> {
  static schema: ComponentSchema = {
    ...baseSchema,
  };
}
