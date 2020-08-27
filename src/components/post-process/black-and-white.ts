import { Component, ComponentSchema, Types } from 'ecsy';
import { PostProcessOptions } from '@babylonjs/core/PostProcesses/postProcess';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

export default class BlackAndWhitePostProcess extends Component<BlackAndWhitePostProcess> {
  name!: string;
  options!: number | PostProcessOptions;
  samplingMode!: number;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: 'black-and-white' },
    options: { type: Types.Number, default: 1 },
    samplingMode: { type: Types.Number, default: Texture.BILINEAR_SAMPLINGMODE },
  };
}
