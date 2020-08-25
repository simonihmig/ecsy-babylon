import { Component, ComponentSchema, Types } from 'ecsy';
import { Light as BabylonLight } from '@babylonjs/core/Lights/light';

export default abstract class Light<C, L extends BabylonLight> extends Component<C> {
  _light?: L;

  intensity!: number;
}

export const schema: ComponentSchema = {
  intensity: { type: Types.Number, default: 1 },
  _light: { type: Types.Ref },
};
