import { Attributes, Entity, System } from 'ecsy';
import { Transitions } from '../components';
import { World } from '../index';
import BabylonWorld from '../world';
import { Animation } from '@babylonjs/core/Animations/animation';

export default class TransitionSystem extends System<Entity, World> {
  constructor(world: BabylonWorld, attributes: Attributes) {
    super(world, attributes);

    this.world.babylonManager.injectAnimationDependencies(Animation);
  }

  execute(): void {
    this.queries.transitions.added?.forEach((e: Entity) => this.setup(e));
    this.queries.transitions.changed?.forEach((e: Entity) => this.update(e));
    this.queries.transitions.removed?.forEach((e: Entity) => this.remove(e));
  }

  setup(entity: Entity): void {
    const c = entity.getComponent(Transitions)!;

    c.value.forEach((transitionConfig) => {
      this.world.babylonManager.registerTransition(entity, transitionConfig);
    });
  }

  update(_entity: Entity): void {
    // @todo
  }

  remove(_entity: Entity): void {
    // @todo
  }

  static queries = {
    transitions: {
      components: [Transitions],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
