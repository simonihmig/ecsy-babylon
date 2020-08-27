import { Component, ComponentConstructor, Entity } from 'ecsy';
import SystemWithCore from '../../-private/systems/with-core';
import assert from '../../-private/utils/assert';
import assign from '../../-private/utils/assign';
import InstanceComponent from '../../components/_instance';
import { World } from 'ecsy/src/World';
import { Attributes } from 'ecsy/src/System';

export default abstract class FactorySystem<
  C extends Component<unknown>,
  D extends InstanceComponent<unknown, I>,
  I
> extends SystemWithCore {
  protected abstract create(component: C): I;
  protected abstract instanceComponentConstructor: ComponentConstructor<D>;
  protected factoryComponentConstructor: ComponentConstructor<C>;

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
    const instanceComponent = entity.getComponent(this.instanceComponentConstructor);
    assert('No instance component found', instanceComponent);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    assign(instanceComponent.value, c);
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
  }
}
