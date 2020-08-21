import BabylonSystem from './babylon';
import CameraSystem from './camera';
import TransformSystem from './transform';
import PrimitiveSystem from './primitive';
import MeshSystem from './mesh';
import MaterialSystem from './material';
import LightSystem from './light';
import ShadowSystem from './shadow';
import ActionSystem from './action';
import { System, SystemConstructor } from 'ecsy';

export {
  BabylonSystem,
  TransformSystem,
  CameraSystem,
  PrimitiveSystem,
  MeshSystem,
  MaterialSystem,
  LightSystem,
  ShadowSystem,
  ActionSystem,
};

export default [
  BabylonSystem,
  TransformSystem,
  CameraSystem,
  PrimitiveSystem,
  MeshSystem,
  MaterialSystem,
  LightSystem,
  ShadowSystem,
  ActionSystem,
] as SystemConstructor<System>[];
