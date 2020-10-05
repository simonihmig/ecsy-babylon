import { Component, ComponentSchema, Types } from 'ecsy';

export interface TransitionConfig {
  property: string;
  frameRate: number;
  duration: number;
}

export default class Transitions extends Component<Transitions> {
  value!: TransitionConfig[];

  static schema: ComponentSchema = {
    value: { type: Types.Array },
  };
}
