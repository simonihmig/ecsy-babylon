import { Component, createComponentClass } from 'ecsy';
import Types from '../types';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Constants } from '@babylonjs/core/Engines/constants';

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
