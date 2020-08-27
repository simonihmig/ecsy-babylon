import { ComponentSchema, Types } from 'ecsy';
import { PostProcess as BabylonPostProcess } from '@babylonjs/core/PostProcesses/postProcess';
import InstanceComponent from './_instance';

export default class PostProcess extends InstanceComponent<PostProcess, BabylonPostProcess[]> {
  static schema: ComponentSchema = {
    value: { type: Types.Array },
  };
}
