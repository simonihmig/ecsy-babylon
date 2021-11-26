import { Component, ComponentSchema, Types } from 'ecsy';

export default abstract class Light<C> extends Component<C> {
  intensity!: number;
}

export const schema: ComponentSchema = {
  intensity: { type: Types.Number, default: 1 },
};
