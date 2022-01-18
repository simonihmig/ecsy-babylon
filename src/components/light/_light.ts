import { Component, ComponentSchema, Types } from 'ecsy';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { BabylonTypes } from '../../-private/ecsy-types';

export default abstract class Light<C> extends Component<C> {
  intensity!: number;
  diffuse!: Color3;
  specular!: Color3;
}

export const schema: ComponentSchema = {
  intensity: { type: Types.Number, default: 1 },
  diffuse: { type: BabylonTypes.Color3, default: Color3.White() },
  specular: { type: BabylonTypes.Color3, default: Color3.White() },
};
