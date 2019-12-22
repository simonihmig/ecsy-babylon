import { Component } from 'ecsy';
import { Light } from '@babylonjs/core';

export interface LightComponent extends Component {
  intensity: number;
  light?: Light;
}

export const schema = {
  intensity: { default: 1 },
  light: { default: undefined },
};
