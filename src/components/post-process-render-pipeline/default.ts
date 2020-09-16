import { Component, ComponentSchema, Types } from 'ecsy';
import { ImageProcessingPostProcess } from '@babylonjs/core/PostProcesses/imageProcessingPostProcess';
import { ChromaticAberrationPostProcess } from '@babylonjs/core/PostProcesses/chromaticAberrationPostProcess';

interface ImageProcessingOptions {
  colorCurvesEnabled: ImageProcessingPostProcess['colorCurvesEnabled'];
  colorCurves: ImageProcessingPostProcess['colorCurves'];
  colorGradingEnabled: ImageProcessingPostProcess['colorGradingEnabled'];
  colorGradingTexture: ImageProcessingPostProcess['colorGradingTexture'];
  exposure: ImageProcessingPostProcess['exposure'];
  toneMappingEnabled: ImageProcessingPostProcess['toneMappingEnabled'];
  toneMappingType: ImageProcessingPostProcess['toneMappingType'];
  contrast: ImageProcessingPostProcess['contrast'];
  vignetteStretch: ImageProcessingPostProcess['vignetteStretch'];
  vignetteCentreX: ImageProcessingPostProcess['vignetteCentreX'];
  vignetteCentreY: ImageProcessingPostProcess['vignetteCentreY'];
  vignetteWeight: ImageProcessingPostProcess['vignetteWeight'];
  vignetteColor: ImageProcessingPostProcess['vignetteColor'];
  vignetteCameraFov: ImageProcessingPostProcess['vignetteCameraFov'];
  vignetteBlendMode: ImageProcessingPostProcess['vignetteBlendMode'];
  vignetteEnabled: ImageProcessingPostProcess['vignetteEnabled'];
  fromLinearSpace: ImageProcessingPostProcess['fromLinearSpace'];
}

interface ChromaticAberrationOptions {
  aberrationAmount: ChromaticAberrationPostProcess['aberrationAmount'];
  adaptScaleToCurrentViewport: ChromaticAberrationPostProcess['adaptScaleToCurrentViewport'];
  alphaMode: ChromaticAberrationPostProcess['alphaMode'];
  alwaysForcePOT: ChromaticAberrationPostProcess['alwaysForcePOT'];
  enablePixelPerfectMode: ChromaticAberrationPostProcess['enablePixelPerfectMode'];
  forceFullscreenViewport: ChromaticAberrationPostProcess['forceFullscreenViewport'];
}

interface DepthOfFieldOptions {
  fStop: number;
  focalLength: number;
  focusDistance: number;
  lensSize: number;
}

interface FxaaOptions {
  samples: number;
  adaptScaleToCurrentViewport: boolean;
}

interface GlowLayerOptions {
  blurKernelSize: number;
  intensity: number;
}

interface GrainOptions {
  animated: boolean;
  intensity: number;
  adaptScaleToCurrentViewport: boolean;
}

interface SharpenOptions {
  edgeAmount: number;
  colorAmount: number;
  adaptScaleToCurrentViewport: boolean;
}

export default class DefaultRenderingPipeline extends Component<DefaultRenderingPipeline> {
  name!: string;
  imageProcessingEnabled?: boolean;
  imageProcessing: Partial<ImageProcessingOptions> | null | undefined;

  bloomEnabled?: boolean;
  bloomKernel?: number;
  bloomScale?: number;
  bloomThreshold?: number;
  bloomWeight?: number;

  chromaticAberrationEnabled?: boolean;
  chromaticAberration: Partial<ChromaticAberrationOptions> | null | undefined;

  depthOfFieldEnabled?: boolean;
  depthOfFieldBlurLevel?: number;
  depthOfField: Partial<DepthOfFieldOptions> | null | undefined;

  samples?: number;

  fxaaEnabled?: boolean;
  fxaa: Partial<FxaaOptions> | null | undefined;

  glowLayerEnabled?: boolean;
  glowLayer: Partial<GlowLayerOptions> | null | undefined;

  grainEnabled?: boolean;
  grain: Partial<GrainOptions> | null | undefined;

  sharpenEnabled?: boolean;
  sharpen: Partial<SharpenOptions> | null | undefined;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: 'defaultPipeline' },
    imageProcessingEnabled: { type: Types.Boolean, default: undefined },
    imageProcessing: { type: Types.JSON },
    bloomEnabled: { type: Types.Boolean, default: undefined },
    bloomKernel: { type: Types.Number, default: undefined },
    bloomScale: { type: Types.Number, default: undefined },
    bloomThreshold: { type: Types.Number, default: undefined },
    bloomWeight: { type: Types.Number, default: undefined },
    chromaticAberrationEnabled: { type: Types.Boolean, default: undefined },
    chromaticAberration: { type: Types.JSON },

    depthOfFieldEnabled: { type: Types.Boolean, default: undefined },
    depthOfFieldBlurLevel: { type: Types.Number, default: undefined },
    depthOfField: { type: Types.JSON },
    fxaaEnabled: { type: Types.Boolean, default: undefined },

    samples: { type: Types.Number, default: undefined },

    fxaa: { type: Types.JSON },
    glowLayerEnabled: { type: Types.Boolean, default: undefined },
    glowLayer: { type: Types.JSON },
    grainEnabled: { type: Types.Boolean, default: undefined },
    grain: { type: Types.JSON },
    sharpenEnabled: { type: Types.Boolean, default: undefined },
    sharpen: { type: Types.JSON },
  };
}
