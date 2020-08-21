import { Component, ComponentSchema, Entity, Types } from 'ecsy';

export default class Parent extends Component<Parent> {
  value?: Entity;

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
  };
}
