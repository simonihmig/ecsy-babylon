import { Component, ComponentSchema, Types } from 'ecsy';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { BabylonTypes } from '../-private/ecsy-types';

export default class PbrMaterial extends Component<PbrMaterial> {
  directIntensity!: number;
  emissiveIntensity!: number;
  environmentIntensity!: number;
  specularIntensity!: number;
  albedoTexture!: BaseTexture | null;
  ambientTexture!: BaseTexture | null;
  ambientTextureStrength!: number;
  ambientTextureImpactOnAnalyticalLights!: number;
  opacityTexture!: BaseTexture | null;
  reflectionTexture!: BaseTexture | null;
  emissiveTexture!: BaseTexture | null;
  reflectivityTexture!: BaseTexture | null;
  metallicTexture!: BaseTexture | null;
  roughness!: number | null;
  metallic!: number | null;
  metallicF0Factor!: number;
  useMetallicF0FactorFromMetallicTexture = false;
  microSurfaceTexture!: BaseTexture | null;
  bumpTexture!: BaseTexture | null;
  lightmapTexture!: BaseTexture | null;
  ambientColor!: Color3;
  albedoColor!: Color3;
  reflectivityColor!: Color3;
  reflectionColor!: Color3;
  emissiveColor!: Color3;
  microSurface!: number;
  useLightmapAsShadowmap = false;
  useAlphaFromAlbedoTexture = false;
  forceAlphaTest = false;
  alphaCutOff!: number;
  useSpecularOverAlpha = true;
  useMicroSurfaceFromReflectivityMapAlpha = false;
  useRoughnessFromMetallicTextureAlpha = true;
  useRoughnessFromMetallicTextureGreen = false;
  useMetallnessFromMetallicTextureBlue = false;
  useAmbientOcclusionFromMetallicTextureRed = false;
  useAmbientInGrayScale = false;
  useAutoMicroSurfaceFromReflectivityMap = false;
  useRadianceOverAlpha = true;
  useObjectSpaceNormalMap = false;
  useParallax = false;
  useParallaxOcclusion = false;
  parallaxScaleBias!: number;
  disableLighting = false;
  forceIrradianceInFragment = false;
  maxSimultaneousLights!: number;
  invertNormalMapX = false;
  invertNormalMapY = false;
  twoSidedLighting = false;
  useAlphaFresnel = false;
  useLinearAlphaFresnel = false;
  environmentBRDFTexture!: BaseTexture | null;
  forceNormalForward = false;
  enableSpecularAntiAliasing = false;
  useHorizonOcclusion = true;
  useRadianceOcclusion = true;
  unlit = false;

  static schema: ComponentSchema = {
    directIntensity: { type: Types.Number, default: 1 },
    emissiveIntensity: { type: Types.Number, default: 1 },
    environmentIntensity: { type: Types.Number, default: 1 },
    specularIntensity: { type: Types.Number, default: 1 },
    albedoTexture: { type: Types.Ref, default: null },
    ambientTexture: { type: Types.Ref, default: null },
    ambientTextureStrength: { type: Types.Number, default: 1 },
    ambientTextureImpactOnAnalyticalLights: {
      type: Types.Number,
      default: BabylonPBRMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS,
    },
    opacityTexture: { type: Types.Ref, default: null },
    reflectionTexture: { type: Types.Ref, default: null },
    emissiveTexture: { type: Types.Ref, default: null },
    reflectivityTexture: { type: Types.Ref, default: null },
    metallicTexture: { type: Types.Ref, default: null },
    roughness: { type: Types.Number, default: null },
    metallic: { type: Types.Number, default: null },
    metallicF0Factor: { type: Types.Number, default: 0.5 },
    useMetallicF0FactorFromMetallicTexture: { type: Types.Boolean },
    microSurfaceTexture: { type: Types.Ref, default: null },
    bumpTexture: { type: Types.Ref, default: null },
    lightmapTexture: { type: Types.Ref, default: null },
    ambientColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    albedoColor: { type: BabylonTypes.Color3, default: Color3.White() },
    reflectivityColor: { type: BabylonTypes.Color3, default: Color3.White() },
    reflectionColor: { type: BabylonTypes.Color3, default: Color3.White() },
    emissiveColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    microSurface: { type: Types.Number, default: 1 },
    useLightmapAsShadowmap: { type: Types.Boolean },
    useAlphaFromAlbedoTexture: { type: Types.Boolean },
    forceAlphaTest: { type: Types.Boolean },
    alphaCutOff: { type: Types.Number, default: 0.4 },
    useSpecularOverAlpha: { type: Types.Boolean, default: true },
    useMicroSurfaceFromReflectivityMapAlpha: { type: Types.Boolean },
    useRoughnessFromMetallicTextureAlpha: { type: Types.Boolean, default: true },
    useRoughnessFromMetallicTextureGreen: { type: Types.Boolean },
    useMetallnessFromMetallicTextureBlue: { type: Types.Boolean },
    useAmbientOcclusionFromMetallicTextureRed: { type: Types.Boolean },
    useAmbientInGrayScale: { type: Types.Boolean },
    useAutoMicroSurfaceFromReflectivityMap: { type: Types.Boolean },
    useRadianceOverAlpha: { type: Types.Boolean, default: true },
    useObjectSpaceNormalMap: { type: Types.Boolean },
    useParallax: { type: Types.Boolean },
    useParallaxOcclusion: { type: Types.Boolean },
    parallaxScaleBias: { type: Types.Number, default: 0.05 },
    disableLighting: { type: Types.Boolean },
    forceIrradianceInFragment: { type: Types.Boolean },
    maxSimultaneousLights: { type: Types.Number, default: 4 },
    invertNormalMapX: { type: Types.Boolean },
    invertNormalMapY: { type: Types.Boolean },
    twoSidedLighting: { type: Types.Boolean },
    useAlphaFresnel: { type: Types.Boolean },
    useLinearAlphaFresnel: { type: Types.Boolean },
    environmentBRDFTexture: { type: Types.Ref, default: null },
    forceNormalForward: { type: Types.Boolean },
    enableSpecularAntiAliasing: { type: Types.Boolean },
    useHorizonOcclusion: { type: Types.Boolean, default: true },
    useRadianceOcclusion: { type: Types.Boolean, default: true },
    unlit: { type: Types.Boolean },
  };
}
