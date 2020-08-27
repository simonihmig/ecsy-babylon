import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../../-private/ecsy-types';
import { PostProcessOptions } from '@babylonjs/core/PostProcesses/postProcess';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

export default class BlurPostProcess extends Component<BlurPostProcess> {
  name!: string;
  direction!: Vector2;
  kernel!: number;
  options!: number | PostProcessOptions;
  samplingMode!: number;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: 'blur' },
    direction: { type: BabylonTypes.Vector2 },
    kernel: { type: Types.Number },
    options: { type: Types.Number, default: 1 },
    samplingMode: { type: Types.Number, default: Texture.BILINEAR_SAMPLINGMODE },
  };
}
