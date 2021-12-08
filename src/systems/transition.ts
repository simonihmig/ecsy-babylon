import { Attributes, Entity, System } from 'ecsy';
import { Transitions } from '../components';
import { World } from '../index';
import BabylonWorld from '../world';
import { Animation } from '@babylonjs/core/Animations/animation';
import '@babylonjs/core/Animations/animatable'; // needed to enable animation support on Scene in a tree-shaken build

export default class TransitionSystem extends System {
  world!: World;

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

  update(entity: Entity): void {
    const { value, previousValue } = entity.getComponent(Transitions)!;

    value.forEach((transition) => this.world.babylonManager.registerTransition(entity, transition));
    if (previousValue) {
      previousValue
        .filter((transition) => !value.includes(transition))
        .forEach((transition) => this.world.babylonManager.unregisterTransition(entity, transition));
    }
  }

  remove(entity: Entity): void {
    this.world.babylonManager.unregisterTransition(entity);
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
