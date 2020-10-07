import { Component, ComponentSchema, Types } from 'ecsy';

export interface TransitionConfig {
  property: string;
  frameRate: number;
  duration: number;
}

export default class Transitions extends Component<Transitions> {
  private _value!: TransitionConfig[];
  private _previousValue?: TransitionConfig[];

  get value(): TransitionConfig[] {
    return this._value;
  }

  set value(value: TransitionConfig[]) {
    this._previousValue = this._value;
    this._value = value;
  }

  get previousValue(): TransitionConfig[] | undefined {
    return this._previousValue;
  }

  static schema: ComponentSchema = {
    value: { type: Types.Array },
  };
}
