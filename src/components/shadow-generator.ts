import { Component, ComponentSchema, Types } from 'ecsy';
import { ShadowGenerator as BabylonShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class ShadowGenerator extends Component<ShadowGenerator> {
  value?: BabylonShadowGenerator;
  size = 512;
  enableSoftTransparentShadow?: boolean;
  forceBackFacesOnly?: boolean;
  frustumEdgeFalloff?: boolean;
  useBlurCloseExponentialShadowMap?: boolean;
  useBlurExponentialShadowMap?: boolean;
  useCloseExponentialShadowMap?: boolean;
  useContactHardeningShadow?: boolean;
  useExponentialShadowMap?: boolean;
  useKernelBlur?: boolean;
  usePercentageCloserFiltering?: boolean;
  usePoissonSampling?: boolean;
  blurKernel?: number;
  blurScale?: number;
  depthScale?: number;
  filter?: number;
  filteringQuality?: number;
  bias?: number;
  normalBias?: number;
  frustrumEdgeFallof?: number;
  darkness?: number;
  transparencyShadow?: boolean;

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
    size: { type: Types.Number, default: 512 },
    enableSoftTransparentShadow: { type: Types.Boolean, default: undefined },
    forceBackFacesOnly: { type: Types.Boolean, default: undefined },
    frustumEdgeFalloff: { type: Types.Number, default: undefined },
    useBlurCloseExponentialShadowMap: { type: Types.Boolean, default: undefined },
    useBlurExponentialShadowMap: { type: Types.Boolean, default: undefined },
    useCloseExponentialShadowMap: { type: Types.Boolean, default: undefined },
    useContactHardeningShadow: { type: Types.Boolean, default: undefined },
    useExponentialShadowMap: { type: Types.Boolean, default: undefined },
    useKernelBlur: { type: Types.Boolean, default: undefined },
    usePercentageCloserFiltering: { type: Types.Boolean, default: undefined },
    usePoissonSampling: { type: Types.Boolean, default: undefined },
    blurKernel: { type: Types.Number, default: undefined },
    blurScale: { type: Types.Number, default: undefined },
    depthScale: { type: Types.Number, default: undefined },
    filter: { type: Types.Number, default: undefined },
    filteringQuality: { type: Types.Number, default: undefined },
    bias: { type: Types.Number, default: undefined },
    normalBias: { type: Types.Number, default: undefined },
    frustrumEdgeFallof: { type: Types.Number, default: undefined },
    darkness: { type: Types.Number, default: undefined },
    transparencyShadow: { type: Types.Boolean, default: undefined },
  };
}
