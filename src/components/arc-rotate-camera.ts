import { Component, createComponentClass } from 'ecsy';
import { ArcRotateCamera, Vector3 } from '@babylonjs/core';
import Types from '../types';

export interface ArcRotateComponent extends Component {
  name: string;
  value: ArcRotateCamera | null;
  alpha: number;
  beta: number;
  radius: number;
  target: Vector3;

  lowerAlphaLimit: number | null;
  lowerBetaLimit: number | null;
  lowerRadiusLimit: number | null;

  upperAlphaLimit: number | null;
  upperBetaLimit: number | null;
  upperRadiusLimit: number | null;
}

export default createComponentClass<ArcRotateComponent>(
  {
    value: { default: null },
    alpha: { default: 0 },
    beta: { default: 0 },
    radius: { default: 10 },
    // target: { default: null, type: Types.Vector3 },

    lowerAlphaLimit: { default: null, type: Types.OptionalNumber },
    lowerBetaLimit: { default: null, type: Types.OptionalNumber },
    lowerRadiusLimit: { default: null, type: Types.OptionalNumber },

    upperAlphaLimit: { default: null, type: Types.OptionalNumber },
    upperBetaLimit: { default: null, type: Types.OptionalNumber },
    upperRadiusLimit: { default: null, type: Types.OptionalNumber },

    panningSensibility: { default: 0 },
  },
  'ArcRotateCamera'
);
