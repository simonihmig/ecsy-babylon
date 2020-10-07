import { Camera, TargetCamera } from '../../components';
import { TargetCamera as BabylonTargetCamera } from '@babylonjs/core/Cameras/targetCamera';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export default class TargetCameraSystem extends FactorySystem<
  TargetCamera,
  Camera<BabylonTargetCamera>,
  BabylonTargetCamera
> {
  protected instanceComponentConstructor = Camera;
  protected transitionTarget = 'camera';

  protected create(c: TargetCamera): BabylonTargetCamera {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { position, ...rest } = c;
    const { scene } = this.core;
    const camera = new BabylonTargetCamera(TargetCamera.name, position ?? Vector3.Zero(), scene, false);
    assign(camera, rest);

    return camera;
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
