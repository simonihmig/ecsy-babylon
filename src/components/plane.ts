import { Component, createComponentClass } from 'ecsy';
import { Mesh } from '@babylonjs/core';
import Types from '../types';

export interface PlaneComponent extends Component {
  size: number;
  width?: number;
  height?: number;
  updatable: boolean;
  sideOrientation: number;
}

export default createComponentClass<PlaneComponent>(
  {
    size: { default: 1 },
    width: { default: undefined, type: Types.OptionalNumber },
    height: { default: undefined, type: Types.OptionalNumber },
    updatable: { default: false },
    sideOrientation: { default: Mesh.DEFAULTSIDE },
  },
  'Plane'
);
