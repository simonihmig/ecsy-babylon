import { createComponentClass, Component } from 'ecsy';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export interface ShadowGeneratorComponent extends Component {
  size: number;
  forceBackFacesOnly: boolean;
  useBlurCloseExponentialShadowMap: boolean;
  useKernelBlur: boolean;
  blurKernel: number;
  bias: number;
  normalBias: number;
  frustrumEdgeFallof: number;
  value?: ShadowGenerator;
}

export default createComponentClass<ShadowGeneratorComponent>(
  {
    size: { default: 512 },
    value: { default: null },
  },
  'ShadowGenerator'
);
