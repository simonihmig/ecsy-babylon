import { ComponentConstructor, Entity, System } from 'ecsy';
import { DirectionalLight, HemisphericLight, PointLight, TransformNode } from '../components';
import { HemisphericLight as _HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { DirectionalLight as _DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { PointLight as _PointLight } from '@babylonjs/core/Lights/pointLight';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLightComponent } from '../components/hemispheric-light';
import { DirectionalLightComponent } from '../components/directional-light';
import { PointLightComponent } from '../components/point-light';

export default class LightSystem extends System {
  execute(): void {
    this.queries.hemisphericLight.added?.forEach((e: Entity) => this.setupHemisphericLight(e, HemisphericLight));
    this.queries.directionalLight.added?.forEach((e: Entity) => this.setupDirectionalLight(e, DirectionalLight));
    this.queries.pointLight.added?.forEach((e: Entity) => this.setupPointLight(e, PointLight));

    this.queries.hemisphericLight.removed?.forEach((e: Entity) => this.remove(e, HemisphericLight));
    this.queries.directionalLight.removed?.forEach((e: Entity) => this.remove(e, DirectionalLight));
    this.queries.pointLight.removed?.forEach((e: Entity) => this.remove(e, PointLight));
  }

  setupHemisphericLight(entity: Entity, Component: ComponentConstructor<HemisphericLightComponent>): void {
    const component = entity.getMutableComponent(Component);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, direction, ...options } = component;

    component.light = new _HemisphericLight(
      component.name ?? 'Hemispheric Light',
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    component.light.parent = transformNodeComponent.value;
  }

  setupPointLight(entity: Entity, Component: ComponentConstructor<PointLightComponent>): void {
    const component = entity.getMutableComponent(Component);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, position, ...options } = component;

    component.light = new _PointLight(
      component.name ?? 'Hemispheric Light',
      position,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    component.light.parent = transformNodeComponent.value;
  }

  setupDirectionalLight(entity: Entity, Component: ComponentConstructor<DirectionalLightComponent>): void {
    const component = entity.getMutableComponent(Component);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light, direction, ...options } = component;

    component.light = new _DirectionalLight(
      component.name,
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );

    Object.assign(component.light, options);

    const transformNodeComponent = entity.getComponent(TransformNode);
    component.light.parent = transformNodeComponent.value;
  }

  remove(
    entity: Entity,
    Component: ComponentConstructor<HemisphericLightComponent | PointLightComponent | DirectionalLightComponent>
  ): void {
    const component = entity.getRemovedComponent(Component);
    if (component.light) {
      component.light.dispose();
    }
  }

  static queries = {
    hemisphericLight: {
      components: [HemisphericLight],
      listen: {
        added: true,
        removed: true,
      },
    },
    directionalLight: {
      components: [DirectionalLight],
      listen: {
        added: true,
        removed: true,
      },
    },
    pointLight: {
      components: [PointLight],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
