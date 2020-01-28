import { Component, createComponentClass, Entity } from 'ecsy';

export interface ParentComponent extends Component {
  value: Entity | null;
}

export default createComponentClass<ParentComponent>(
  {
    value: { default: null },
  },
  'Parent'
);
