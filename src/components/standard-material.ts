import { Component, ComponentSchema, Types } from 'ecsy';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { BabylonTypes } from '../ecsy-types';

export default class StandardMaterial extends Component<StandardMaterial> {
  ambientColor!: Color3;
  diffuseColor!: Color3;
  emissiveColor!: Color3;
  disableLighting!: boolean;
  alpha!: number;

  static schema: ComponentSchema = {
    ambientColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    diffuseColor: { type: BabylonTypes.Color3, default: Color3.White() },
    emissiveColor: { type: BabylonTypes.Color3, default: Color3.Black() },
    disableLighting: { type: Types.Boolean },
    alpha: { type: Types.Number, default: 1 },
  };
}
