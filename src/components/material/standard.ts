import { Component, ComponentSchema, Types } from 'ecsy';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { BabylonTypes } from '../../-private/ecsy-types';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

export default class StandardMaterial extends Component<StandardMaterial> {
  ambientTexture!: BaseTexture | null;
  bumpTexture!: BaseTexture | null;
  diffuseTexture!: BaseTexture | null;
  emissiveTexture!: BaseTexture | null;
  lightmapTexture!: BaseTexture | null;
  opacityTexture!: BaseTexture | null;
  reflectionTexture!: BaseTexture | null;
  refractionTexture!: BaseTexture | null;
  specularTexture!: BaseTexture | null;
  ambientColor!: Color3;
  diffuseColor!: Color3;
  emissiveColor!: Color3;
  specularColor!: Color3;
  disableLighting!: boolean;
  alpha!: number;

  static schema: ComponentSchema = {
    ambientTexture: { type: Types.Ref, default: null },
    bumpTexture: { type: Types.Ref, default: null },
    diffuseTexture: { type: Types.Ref, default: null },
    emissiveTexture: { type: Types.Ref, default: null },
    lightmapTexture: { type: Types.Ref, default: null },
    opacityTexture: { type: Types.Ref, default: null },
    reflectionTexture: { type: Types.Ref, default: null },
    refractionTexture: { type: Types.Ref, default: null },
    specularTexture: { type: Types.Ref, default: null },
    ambientColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    diffuseColor: { type: BabylonTypes.Color3, default: Color3.White() },
    emissiveColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    specularColor: { type: BabylonTypes.Color3, default: Color3.White() },
    disableLighting: { type: Types.Boolean },
    alpha: { type: Types.Number, default: 1 },
  };
}
