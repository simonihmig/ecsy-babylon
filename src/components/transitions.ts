import { Component, ComponentSchema, Types } from 'ecsy';
import { EasingFunction } from '@babylonjs/core/Animations/easing';

export interface TransitionConfig {
  property: string;
  frameRate: number;
  duration: number;
  easingFunction?: EasingFunction;
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
