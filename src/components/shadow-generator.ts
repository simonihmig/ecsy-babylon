import { Component, ComponentSchema, Types } from 'ecsy';
import { ShadowGenerator as BabylonShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class ShadowGenerator extends Component<ShadowGenerator> {
  value?: BabylonShadowGenerator;
  size = 512;
  forceBackFacesOnly?: boolean;
  useBlurCloseExponentialShadowMap?: boolean;
  useKernelBlur?: boolean;
  blurKernel?: number;
  bias?: number;
  normalBias?: number;
  frustrumEdgeFallof?: number;

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
    size: { type: Types.Number, default: 512 },
    forceBackFacesOnly: { type: Types.Boolean, default: undefined },
    useBlurCloseExponentialShadowMap: { type: Types.Boolean, default: undefined },
    useKernelBlur: { type: Types.Boolean, default: undefined },
    blurKernel: { type: Types.Number, default: undefined },
    bias: { type: Types.Number, default: undefined },
    normalBias: { type: Types.Number, default: undefined },
    frustrumEdgeFallof: { type: Types.Number, default: undefined },
  };
}
