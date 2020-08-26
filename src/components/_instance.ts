import { Component, ComponentSchema, Types } from 'ecsy';

export default abstract class InstanceComponent<C, I> extends Component<C> {
  overrides!: Record<string, unknown>;
  private _value?: I;
  private _previousValue?: I;

  get value(): I | undefined {
    return this._value;
  }

  set value(value: I | undefined) {
    this._previousValue = this._value;
    this._value = value;
  }

  get previousValue(): I | undefined {
    return this._previousValue;
  }

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
    overrides: { type: Types.JSON, default: {} },
  };
}
