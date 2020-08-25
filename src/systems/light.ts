import { ComponentConstructor, Entity, System } from 'ecsy';
import { DirectionalLight, HemisphericLight, PointLight, TransformNode } from '../components';
import { HemisphericLight as _HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { DirectionalLight as _DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { PointLight as _PointLight } from '@babylonjs/core/Lights/pointLight';
import { Scene } from '@babylonjs/core/scene';
import Light from '../components/light';
import assert from '../-private/utils/assert';

export default class LightSystem extends System {
  execute(): void {
    this.queries.hemisphericLight.added?.forEach((e: Entity) => this.setupHemisphericLight(e, HemisphericLight));
    this.queries.directionalLight.added?.forEach((e: Entity) => this.setupDirectionalLight(e, DirectionalLight));
    this.queries.pointLight.added?.forEach((e: Entity) => this.setupPointLight(e, PointLight));

    this.queries.hemisphericLight.changed?.forEach((e: Entity) => this.update(e, HemisphericLight));
    this.queries.directionalLight.changed?.forEach((e: Entity) => this.update(e, DirectionalLight));
    this.queries.pointLight.changed?.forEach((e: Entity) => this.update(e, PointLight));

    this.queries.hemisphericLight.removed?.forEach((e: Entity) => this.remove(e, HemisphericLight));
    this.queries.directionalLight.removed?.forEach((e: Entity) => this.remove(e, DirectionalLight));
    this.queries.pointLight.removed?.forEach((e: Entity) => this.remove(e, PointLight));
  }

  setupHemisphericLight(entity: Entity, Component: ComponentConstructor<HemisphericLight>): void {
    const component = entity.getMutableComponent(Component)!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, direction, ...options } = component;

    component.light = new _HemisphericLight(
      HemisphericLight.name,
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for lights, add Parent component to fix', transformNodeComponent);

    component.light.parent = transformNodeComponent.value;
  }

  setupPointLight(entity: Entity, Component: ComponentConstructor<PointLight>): void {
    const component = entity.getMutableComponent(Component)!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, position, ...options } = component;

    component.light = new _PointLight(
      PointLight.name,
      position,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for lights, add Parent component to fix', transformNodeComponent);

    component.light.parent = transformNodeComponent.value;
  }

  setupDirectionalLight(entity: Entity, Component: ComponentConstructor<DirectionalLight>): void {
    const component = entity.getMutableComponent(Component)!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, direction, ...options } = component;

    component.light = new _DirectionalLight(
      DirectionalLight.name,
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for lights, add Parent component to fix', transformNodeComponent);

    component.light.parent = transformNodeComponent.value;
  }

  update<L extends Light<L>>(entity: Entity, Component: ComponentConstructor<L>): void {
    const component = entity.getComponent(Component)!;
    const { light, ...rest } = component;

    if (light) {
      Object.assign(light, rest);
    }
  }

  remove<L extends Light<L>>(entity: Entity, Component: ComponentConstructor<L>): void {
    const component = entity.getRemovedComponent(Component)!;
    if (component.light) {
      component.light.dispose();
    }
  }

  static queries = {
    hemisphericLight: {
      components: [HemisphericLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    directionalLight: {
      components: [DirectionalLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    pointLight: {
      components: [PointLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
