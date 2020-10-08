import { Entity } from 'ecsy';
import { Camera, TransformNode } from '../components';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import { assert } from '../-private/utils/debug';

export default class CameraSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.camera.added?.forEach((e: Entity) => this.setup(e));
    this.queries.camera.changed?.forEach((e: Entity) => this.update(e));
    this.queries.camera.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { scene, canvas } = this.core;
    const { value: camera } = entity.getComponent(Camera)!;

    assert('Failed to add Camera, no camera instance found.', camera);

    scene.addCamera(camera);
    scene.activeCamera = camera;
    camera.attachControl(canvas, false);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for cameras, add Parent component to fix', transformNodeComponent);
    camera.parent = transformNodeComponent.value;
  }

  update(entity: Entity): void {
    const { previousValue: prevInstance } = entity.getComponent(Camera)!;

    this.setup(entity);

    if (prevInstance) {
      prevInstance.dispose();
    }
  }

  remove(entity: Entity): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const cameraComponent = entity.getRemovedComponent(Camera)!;
    cameraComponent.value?.dispose();
  }

  static queries = {
    ...queries,
    camera: {
      components: [Camera],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
