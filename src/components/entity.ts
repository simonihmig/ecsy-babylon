import { Component, createComponentClass, Entity } from 'ecsy';

interface EntityComponent extends Component {
  parent: Entity | null;
}

export default createComponentClass<EntityComponent>(
  {
    parent: { default: null },
  },
  'Entity'
);
