import { Component, ComponentConstructor, Entity } from 'ecsy';
import SystemWithCore from '../../-private/systems/with-core';
import { assert } from '../utils/debug';
import InstanceComponent from '../../components/_instance';
import World from '../../world';
import { Attributes } from 'ecsy/src/System';
import { IDisposable } from '@babylonjs/core/scene';

export default abstract class FactorySystem<
  C extends Component<unknown>,
  D extends InstanceComponent<unknown, I>,
  I extends IDisposable
> extends SystemWithCore {
  protected abstract create(component: C): I;
  protected abstract instanceComponentConstructor: ComponentConstructor<D>;
  protected factoryComponentConstructor: ComponentConstructor<C>;
  protected recreateInstanceOnUpdate = false;
  protected transitionTarget?: string;

  constructor(world: World, attributes?: Attributes) {
    super(world, attributes);

    assert(
      'System derived from FactorySystem must define "factory" query',
      typeof (this.constructor as typeof FactorySystem).queries.factory !== 'undefined'
    );

    this.factoryComponentConstructor = (this.constructor as typeof FactorySystem).queries.factory
      .components[0] as ComponentConstructor<C>;
  }

  execute(): void {
    super.execute();

    this.queries.factory.added?.forEach((e: Entity) => this.setup(e));
    this.queries.factory.changed?.forEach((e: Entity) => this.update(e));
    this.queries.factory.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const c = entity.getComponent(this.factoryComponentConstructor)!;

    const instance = this.create(c);
    this.addInstance(entity, instance);
  }

  update(entity: Entity): void {
    const c = entity.getComponent(this.factoryComponentConstructor)!;

    if (this.recreateInstanceOnUpdate) {
      const instanceComponent = entity.getMutableComponent(this.instanceComponentConstructor);
      assert('No instance component found', instanceComponent);

      const instance = this.create(c);
      instanceComponent.value = instance;
    } else {
      const instanceComponent = entity.getComponent(this.instanceComponentConstructor);
      assert('No instance found', instanceComponent?.value);
      if (this.transitionTarget) {
        this.world.babylonManager.updateProperties(entity, instanceComponent.value!, this.transitionTarget, c);
      } else {
        this.world.babylonManager.setProperties(entity, instanceComponent.value!, c);
      }
    }
  }

  remove(entity: Entity): void {
    this.removeInstance(entity);
  }

  private addInstance(entity: Entity, instance: I): void {
    const instanceComponent = entity.getMutableComponent(this.instanceComponentConstructor);
    if (instanceComponent) {
      instanceComponent.value = instance;
    } else {
      entity.addComponent(this.instanceComponentConstructor as ComponentConstructor<InstanceComponent<D, I>>, {
        value: instance,
      });
    }
  }

  private removeInstance(entity: Entity): void {
    const instanceComponent = entity.getComponent(this.instanceComponentConstructor, true);
    assert('No instance component found', instanceComponent?.value);

    entity.removeComponent(this.instanceComponentConstructor);
    instanceComponent.value.dispose();
  }
}
