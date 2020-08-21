import { ComponentConstructor, Entity } from 'ecsy';
import { ArcRotateCamera, TransformNode } from '../components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import SystemWithCore, { queries } from '../SystemWithCore';
import assert from '../utils/assert';

export default class CameraSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.arcRotateCamera.added?.forEach((e: Entity) => this.setupArcRotateCamera(e));
    this.queries.arcRotateCamera.changed?.forEach((e: Entity) => this.update(e, ArcRotateCamera));
    this.queries.arcRotateCamera.removed?.forEach((e: Entity) => this.remove(e, ArcRotateCamera));

    super.afterExecute();
  }

  setupArcRotateCamera(entity: Entity): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { scene, canvas } = this.core;
    const cameraComponent = entity.getMutableComponent(ArcRotateCamera)!;
    const { value, ...args } = cameraComponent;
    const { alpha, beta, radius, target } = args;
    const instance =
      value || new BabylonArcRotateCamera(ArcRotateCamera.name, alpha, beta, radius, target, scene, false);

    Object.assign(instance, args);
    cameraComponent.value = instance;

    scene.activeCamera = instance;
    scene.activeCamera.attachControl(canvas, false);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for cameras, add Parent component to fix', transformNodeComponent);
    instance.parent = transformNodeComponent.value;
  }

  update(entity: Entity, component: ComponentConstructor<ArcRotateCamera>): void {
    const cameraComponent = entity.getComponent(component)!;

    const { value, ...args } = cameraComponent;

    Object.assign(value, args);
  }

  remove(entity: Entity, component: ComponentConstructor<ArcRotateCamera>): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { scene, canvas, defaultCamera } = this.core;
    const cameraComponent = entity.getRemovedComponent(component)!;

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
