import { ComponentSchema, Types } from 'ecsy';
import InstanceComponent from './_instance';

export default abstract class InstanceArrayComponent<C, I> extends InstanceComponent<C, I[]> {
  static schema: ComponentSchema = {
    value: { type: Types.Array },
    overrides: { type: Types.JSON, default: {} },
  };
}
