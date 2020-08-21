import { Component, Entity } from 'ecsy';

export default class Parent extends Component<Parent> {
  value: Entity | null = null;

  reset(): void {
    this.value = null;
  }
}
