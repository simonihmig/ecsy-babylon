import { Component, ComponentSchema, Types } from 'ecsy';
import { PostProcessOptions } from '@babylonjs/core/PostProcesses/postProcess';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

export default class MotionBlurPostProcess extends Component<MotionBlurPostProcess> {
  name!: string;
  options!: number | PostProcessOptions;
  samplingMode!: number;
  motionStrength!: number;
  motionBlurSamples!: number;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: 'motion-blur' },
    options: { type: Types.Number, default: 1 },
    samplingMode: { type: Types.Number, default: Texture.BILINEAR_SAMPLINGMODE },
    motionStrength: { type: Types.Number, default: 1 },
    motionBlurSamples: { type: Types.Number, default: 32 },
  };
}
