import { Component, createComponentClass } from 'ecsy';
import { Color3, Constants, Texture } from '@babylonjs/core';
import Types from '../types';

export interface BackgroundMaterialComponent extends Component {
  name: string;
  diffuseTexture: Texture | null;
  alpha: number | null;
  alphaMode: number | null;
  shadowLevel: number | null;
  primaryColor: Color3 | null;
  useRGBColor: boolean;
  enableNoise: boolean;
}

export default createComponentClass<BackgroundMaterialComponent>(
  {
    diffuseTexture: { default: null },
    alpha: { default: 1.0 },
    alphaMode: { default: Constants.ALPHA_PREMULTIPLIED_PORTERDUFF },
    shadowLevel: { default: 0.5 },
    primaryColor: { default: new Color3(0, 0, 0), type: Types.Color3 },
    useRGBColor: { default: false },
    enableNoise: { default: true },
  },
  'BackgroundMaterial'
);
