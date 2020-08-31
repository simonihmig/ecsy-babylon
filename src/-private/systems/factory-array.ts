import { Component, ComponentConstructor, Entity } from 'ecsy';
import SystemWithCore from '../../-private/systems/with-core';
import assert from '../../-private/utils/assert';
import assign from '../../-private/utils/assign';
import InstanceArrayComponent from '../../components/_instance-array';
import { World } from 'ecsy/src/World';
import { Attributes } from 'ecsy/src/System';
import { IDisposable } from '@babylonjs/core/scene';

interface Constructor<C> {
  new (): C;
}

export default abstract class FactoryArraySystem<
  C extends Component<unknown>,
  D extends InstanceArrayComponent<D, I>,
  I extends IDisposable
> extends SystemWithCore {
  protected abstract create(component: C): I;
  protected abstract instanceComponentConstructor: ComponentConstructor<D>;
  protected factoryComponentConstructor: ComponentConstructor<C>;
  protected abstract instanceConstructor: Function;

  constructor(world: World, attributes?: Attributes) {
    super(world, attributes);

    assert(
      'System derived from FactoryArraySystem must define "factory" query',
      typeof (this.constructor as typeof FactoryArraySystem).queries.factory !== 'undefined'
    );

    this.factoryComponentConstructor = (this.constructor as typeof FactoryArraySystem).queries.factory
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
    const ic = instanceComponent as InstanceArrayComponent<unknown, I>;
    assert('Existing instance array component has invalid value', ic.value);
    const instance = ic.value.find((i) => i instanceof this.instanceConstructor);
    assert('No instance found', instance);
    this.updateInstance(instance, c);
  }

  remove(entity: Entity): void {
    this.removeInstance(entity);
  }

  protected updateInstance(instance: I, c: C): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    assign(instance, c);
  }

  private addInstance(entity: Entity, instance: I): void {
    const instanceComponent = entity.getMutableComponent(this.instanceComponentConstructor);
    if (instanceComponent) {
      const ic = instanceComponent as InstanceArrayComponent<unknown, I>;
      assert('Existing instance array component has invalid value', ic.value);
      ic.value = [...ic.value, instance];
    } else {
      entity.addComponent(this.instanceComponentConstructor as ComponentConstructor<InstanceArrayComponent<D, I>>, {
        value: [instance],
      });
    }
  }

  private removeInstance(entity: Entity): void {
    const instanceComponent = entity.getComponent(this.instanceComponentConstructor);
    assert('No instance component found', instanceComponent?.value);

    const ic = instanceComponent as InstanceArrayComponent<unknown, I>;
    assert('Existing instance array component has invalid value', ic.value);
    const removedInstance = ic.value.find((i) => i instanceof this.instanceConstructor);
    assert('No instance found to remove', removedInstance);
    const instances = ic.value.filter((i) => i !== removedInstance);

    if (instances.length > 0) {
      const _instanceComponent = entity.getMutableComponent(
        this.instanceComponentConstructor
      ) as InstanceArrayComponent<unknown, I>;
      _instanceComponent.value = instances;
    } else {
      entity.removeComponent(this.instanceComponentConstructor);
    }
    removedInstance.dispose();
  }
}
