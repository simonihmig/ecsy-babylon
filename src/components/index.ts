import BabylonCore from './babylon-core';
import ArcRotateCamera from './arc-rotate-camera';
import Mesh from './mesh';
import Plane from './plane';
import Box from './box';
import Sphere from './sphere';
import Lines from './lines';
import Material from './material';
import StandardMaterial from './standard-material';
import PBRMaterial from './pbr-material';
import BackgroundMaterial from './background-material';
import ShadowOnlyMaterial from './shadow-only-material';
import HemisphericLight from './hemispheric-light';
import DirectionalLight from './directional-light';
import PointLight from './point-light';
import ShadowGenerator from './shadow-generator';
import TransformNode from './transform-node';
import Position from './position';
import Rotation from './rotation';
import Scale from './scale';
import Action from './action';
import Parent from './parent';
import { ComponentConstructor } from 'ecsy';

export {
  BabylonCore,
  ArcRotateCamera,
  Mesh,
  Plane,
  Box,
  Sphere,
  Lines,
  Material,
  StandardMaterial,
  PBRMaterial,
  BackgroundMaterial,
  ShadowOnlyMaterial,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  ShadowGenerator,
  TransformNode,
  Position,
  Rotation,
  Scale,
  Action,
  Parent,
};

export default [
  BabylonCore,
  ArcRotateCamera,
  Mesh,
  Plane,
  Box,
  Sphere,
  Lines,
  Material,
  StandardMaterial,
  PBRMaterial,
  BackgroundMaterial,
  ShadowOnlyMaterial,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  ShadowGenerator,
  TransformNode,
  Position,
  Rotation,
  Scale,
  Action,
  Parent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as ComponentConstructor<any>[];
