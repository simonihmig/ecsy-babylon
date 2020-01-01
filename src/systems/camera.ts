import { ComponentConstructor, Entity } from 'ecsy';
import { ArcRotateCamera, TransformNode } from '../components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core';
import guidFor from '../utils/guid';
import SystemWithCore, { queries } from '../SystemWithCore';

export default class PrimitiveSystem extends SystemWithCore {
  execute() {
    super.execute();

    this.queries.arcRotateCamera.added.forEach((e: Entity) => this.setupArcRotateCamera(e));
    this.queries.arcRotateCamera.changed.forEach((e: Entity) => this.update(e, ArcRotateCamera));
    this.queries.arcRotateCamera.removed.forEach((e: Entity) => this.remove(e, ArcRotateCamera));

    super.afterExecute();
  }

  setupArcRotateCamera(entity: Entity) {
    const { scene, canvas } = this.core;

    const cameraComponent = entity.getComponent(ArcRotateCamera);

    const { value, ...args } = cameraComponent;

    const { alpha, beta, radius, target } = args;

    const instance =
      value ||
      new BabylonArcRotateCamera(`${guidFor(entity)}__ArcRotateCamera`, alpha, beta, radius, target, scene, false);

    Object.assign(instance, args);
    cameraComponent.value = instance;

    scene.activeCamera = instance;
    scene.activeCamera.attachControl(canvas, false);

    const transformNodeComponent = entity.getComponent(TransformNode);
    instance.parent = transformNodeComponent.value;
  }

  update(entity: Entity, component: ComponentConstructor<any>) {
    const cameraComponent = entity.getComponent(component);

    const { value, ...args } = cameraComponent;

    Object.assign(value, args);
  }

  remove(entity: Entity, component: ComponentConstructor<any>) {
    const { scene, canvas, defaultCamera } = this.core;

    const cameraComponent = entity.getRemovedComponent(component);

    // TODO: We might need something smarter here in the future, what if there's multiple camera entities?
    // set defaultCamera as current active camera if it exists
    scene.activeCamera = defaultCamera || null;

    if (scene.activeCamera) {
      // restore control if there is still an active camera
      scene.activeCamera.attachControl(canvas, false);
    }

    if (cameraComponent.value) {
      cameraComponent.value.dispose();
    }
  }

  static queries = {
    ...queries,
    arcRotateCamera: {
      components: [ArcRotateCamera],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
