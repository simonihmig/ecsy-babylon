import { Component, ComponentSchema, Types } from 'ecsy';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Constants } from '@babylonjs/core/Engines/constants';
import { BabylonTypes } from '../ecsy-types';

export default class BackgroundMaterial extends Component<BackgroundMaterial> {
  diffuseTexture!: Texture | null;
  reflectionTexture!: Texture | null;
  alpha!: number;
  alphaMode!: number;
  shadowLevel!: number;
  primaryColor!: Color3;
  useRGBColor!: boolean;
  enableNoise!: boolean;

  static schema: ComponentSchema = {
    diffuseTexture: { type: Types.Ref, default: null },
    reflectionTexture: { type: Types.Ref, default: null },
    alpha: { type: Types.Number, default: 1 },
    alphaMode: { type: Types.Number, default: Constants.ALPHA_PREMULTIPLIED_PORTERDUFF },
    shadowLevel: { type: Types.Number, default: 0 },
    primaryColor: { type: BabylonTypes.Color3, default: Color3.White() },
    useRGBColor: { type: Types.Boolean },
    enableNoise: { type: Types.Boolean },
  };
}
