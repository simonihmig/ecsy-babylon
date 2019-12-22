import { Component, createComponentClass } from 'ecsy';
import { Mesh } from '@babylonjs/core';
import Types from '../types';

export interface BoxComponent extends Component {
  size: number;
  width?: number;
  height?: number;
  depth?: number;
  // TODO
  // faceColors: Color4[];
  // faceUV: Vector4[];
  updatable: boolean;
  sideOrientation: number;
}

export default createComponentClass<BoxComponent>(
  {
    size: { default: 1 },
    width: { default: undefined, type: Types.OptionalNumber },
    height: { default: undefined, type: Types.OptionalNumber },
    depth: { default: undefined, type: Types.OptionalNumber },
    updatable: { default: false },
    sideOrientation: { default: Mesh.DEFAULTSIDE },
  },
  'Box'
);
