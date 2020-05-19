import { Component } from 'ecsy';
import { ShadowGenerator as BabylonShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class ShadowGenerator extends Component {
  size = 512;
  forceBackFacesOnly?: boolean;
  useBlurCloseExponentialShadowMap?: boolean;
  useKernelBlur?: boolean;
  blurKernel?: number;
  bias?: number;
  normalBias?: number;
  frustrumEdgeFallof?: number;
  value?: BabylonShadowGenerator;

  reset(): void {
    this.size = 512;
    this.forceBackFacesOnly = undefined;
    this.useBlurCloseExponentialShadowMap = undefined;
    this.useKernelBlur = undefined;
    this.blurKernel = undefined;
    this.bias = undefined;
    this.normalBias = undefined;
    this.frustrumEdgeFallof = undefined;
    this.value = undefined;
  }
}

Object.defineProperty(ShadowGenerator, 'name', { value: 'ShadowGenerator' });
