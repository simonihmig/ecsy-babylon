import { Component, ComponentSchema, Types } from 'ecsy';
import { PostProcess as BabylonPostProcess } from '@babylonjs/core/PostProcesses/postProcess';

export default class PostProcess extends Component<PostProcess> {
  value?: BabylonPostProcess;
  _prevValue?: BabylonPostProcess;

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
    _prevValue: { type: Types.Ref },
  };
}
