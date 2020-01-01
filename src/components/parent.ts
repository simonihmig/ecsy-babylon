import { Component, createComponentClass, Entity } from 'ecsy';

interface EntityComponent extends Component {
  value: Entity | null;
}

export default createComponentClass<EntityComponent>(
  {
    value: { default: null },
  },
  'Parent'
);
