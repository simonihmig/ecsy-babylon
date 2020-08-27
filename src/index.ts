import { Component, ComponentConstructor, System, SystemConstructor } from 'ecsy';

import * as _components from './components';
import {
  ActionSystem,
  BabylonSystem,
  CameraSystem,
  MeshSystem,
  PrimitiveSystem,
  TransformSystem,
  MaterialSystem,
  LightSystem,
  ShadowSystem,
  PostProcessSystem,
  BlurPostProcessSystem,
  BlackAndWhitePostProcessSystem,
  ArcRotateCameraSystem,
} from './systems';

const components = Object.values(_components) as ComponentConstructor<Component<unknown>>[];
// export array of systems explicitly, as the order is relevant for proper system execution!
const systems = [
  BabylonSystem,
  TransformSystem,
  ArcRotateCameraSystem,
  CameraSystem,
  PrimitiveSystem,
  MeshSystem,
  MaterialSystem,
  LightSystem,
  ShadowSystem,
  ActionSystem,
  BlurPostProcessSystem,
  BlackAndWhitePostProcessSystem,
  PostProcessSystem,
] as SystemConstructor<System>[];

export { components, systems };
export * from './systems';
export * from './components';
