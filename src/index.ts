import { Component, ComponentConstructor, System, SystemConstructor } from 'ecsy';

import * as _components from './components';
import {
  ActionSystem,
  BabylonSystem,
  CameraSystem,
  MeshSystem,
  BoxPrimitiveSystem,
  LinesPrimitiveSystem,
  PlanePrimitiveSystem,
  SpherePrimitiveSystem,
  TransformSystem,
  PbrMaterialSystem,
  StandardMaterialSystem,
  BackgroundMaterialSystem,
  ShadowOnlyMaterialSystem,
  MaterialSystem,
  LightSystem,
  ShadowSystem,
  PostProcessSystem,
  BlurPostProcessSystem,
  MotionBlurPostProcessSystem,
  BlackAndWhitePostProcessSystem,
  ArcRotateCameraSystem,
  DirectionalLightSystem,
  SpotLightSystem,
  HemisphericLightSystem,
  PointLightSystem,
  PostProcessRenderPipelineSystem,
  SsaoRenderPipelineSystem,
  DefaultRenderPipelineSystem,
} from './systems';

const components = Object.values(_components) as ComponentConstructor<Component<unknown>>[];
// export array of systems explicitly, as the order is relevant for proper system execution!
const systems = [
  BabylonSystem,
  TransformSystem,
  ArcRotateCameraSystem,
  CameraSystem,
  BoxPrimitiveSystem,
  LinesPrimitiveSystem,
  PlanePrimitiveSystem,
  SpherePrimitiveSystem,
  MeshSystem,
  PbrMaterialSystem,
  StandardMaterialSystem,
  BackgroundMaterialSystem,
  ShadowOnlyMaterialSystem,
  MaterialSystem,
  DirectionalLightSystem,
  SpotLightSystem,
  HemisphericLightSystem,
  PointLightSystem,
  LightSystem,
  ShadowSystem,
  ActionSystem,
  BlurPostProcessSystem,
  MotionBlurPostProcessSystem,
  BlackAndWhitePostProcessSystem,
  PostProcessSystem,
  DefaultRenderPipelineSystem,
  SsaoRenderPipelineSystem,
  PostProcessRenderPipelineSystem,
] as SystemConstructor<System>[];

export { components, systems };
export * from './systems';
export * from './components';
