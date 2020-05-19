import { Component, Entity } from 'ecsy';

export default class Parent extends Component {
  value: Entity | null = null;

  reset(): void {
    this.value = null;
  }
}

Object.defineProperty(Parent, 'name', { value: 'Parent' });
