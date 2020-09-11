import { TargetCamera, Camera } from '../../components';
import { TargetCamera as BabylonTargetCamera } from '@babylonjs/core/Cameras/targetCamera';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import assign from '../../-private/utils/assign';
import assert from '../../-private/utils/assert';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Entity } from 'ecsy';

export default class TargetCameraSystem extends FactorySystem<
  TargetCamera,
  Camera<TargetCamera, BabylonTargetCamera>,
  BabylonTargetCamera
> {
  protected instanceComponentConstructor = Camera;

  protected create(c: TargetCamera): BabylonTargetCamera {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { position, ...rest } = c;
    const { scene } = this.core;
    const instance = new BabylonTargetCamera(TargetCamera.name, position ?? Vector3.Zero(), scene, false);
    assign(instance, rest);

    return instance;
  }

  update(entity: Entity): void {
    const { target, ...rest } = entity.getComponent(this.factoryComponentConstructor)!;

    const instanceComponent = entity.getComponent(this.instanceComponentConstructor) as Camera<
      unknown,
      BabylonTargetCamera
    >;
    assert('No instance component found', instanceComponent?.value);
    const camera = instanceComponent.value;

    assign(camera, rest);
    if (target) {
      camera.setTarget(target);
    }
  }

  static queries = {
    ...queries,
    factory: {
      components: [TargetCamera],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
