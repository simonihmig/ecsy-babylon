import { Entity, System } from 'ecsy';
import { Light, TransformNode } from '../components';
import { assert } from '../-private/utils/debug';

export default class LightSystem extends System {
  execute(): void {
    this.queries.light.added?.forEach((e: Entity) => this.setup(e));
    this.queries.light.changed?.forEach((e: Entity) => this.update(e));
    this.queries.light.removed?.forEach((e: Entity) => this.remove(e));
  }

  setup(entity: Entity): void {
    const component = entity.getComponent(Light)!;
    assert('No light instance found', component.value);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for lights, add Parent component to fix', transformNodeComponent);

    component.value.parent = transformNodeComponent.value;
  }

  update(entity: Entity): void {
    const { previousValue: prevInstance } = entity.getComponent(Light)!;

    this.setup(entity);

    if (prevInstance) {
      prevInstance.dispose();
    }
  }

  remove(entity: Entity): void {
    const component = entity.getComponent(Light, true)!;
    component.value?.dispose();
  }

  static queries = {
    light: {
      components: [Light],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
