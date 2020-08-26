import { ComponentConstructor, Entity } from 'ecsy';
import { ArcRotateCamera, Camera, TransformNode } from '../components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import SystemWithCore, { queries } from '../-private/SystemWithCore';
import assert from '../-private/utils/assert';
import assign from '../-private/utils/assign';

export default class CameraSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.arcRotateCamera.added?.forEach((e: Entity) => this.setupArcRotateCamera(e));
    this.queries.arcRotateCamera.changed?.forEach((e: Entity) => this.updateCamera(e, ArcRotateCamera));
    this.queries.arcRotateCamera.removed?.forEach((e: Entity) => this.removeCamera(e));

    this.queries.camera.added?.forEach((e: Entity) => this.setup(e));
    this.queries.camera.changed?.forEach((e: Entity) => this.update(e));
    this.queries.camera.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  // Lifecycle handler for camera builders (ArcRotateCamera etc.)

  setupArcRotateCamera(entity: Entity): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { scene } = this.core;
    const component = entity.getComponent(ArcRotateCamera)!;
    const { alpha, beta, radius, target, ...rest } = component;
    const instance = new BabylonArcRotateCamera(ArcRotateCamera.name, alpha, beta, radius, target, scene, false);

    assign(instance, rest);

    entity.addComponent(Camera, { value: instance });
  }

  updateCamera(entity: Entity, Component: ComponentConstructor<ArcRotateCamera>): void {
    const component = entity.getComponent(Component)!;
    const cameraComponent = entity.getComponent(Camera);
    assert('No camera instance found', cameraComponent?.value);

    assign(cameraComponent.value, component);
  }

  removeCamera(entity: Entity): void {
    entity.removeComponent(Camera);
  }

  // Lifecycle handler for Camera instance component

  setup(entity: Entity): void {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { scene, canvas } = this.core;
    const { value: instance } = entity.getComponent(Camera)!;

    assert('Failed to add Camera, no camera instance found.', instance);

    scene.activeCamera = instance;
    scene.activeCamera.attachControl(canvas, false);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for cameras, add Parent component to fix', transformNodeComponent);
    instance.parent = transformNodeComponent.value;
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

    const { scene, canvas, defaultCamera } = this.core;
    const cameraComponent = entity.getRemovedComponent(Camera)!;

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
