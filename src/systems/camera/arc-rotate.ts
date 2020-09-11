import { ArcRotateCamera, Camera } from '../../components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import assign from '../../-private/utils/assign';
import assert from '../../-private/utils/assert';

export default class ArcRotateCameraSystem extends FactorySystem<
  ArcRotateCamera,
  Camera<BabylonArcRotateCamera>,
  BabylonArcRotateCamera
> {
  protected instanceComponentConstructor = Camera;

  protected create(c: ArcRotateCamera): BabylonArcRotateCamera {
    assert('CameraSystem needs BabylonCoreComponent', this.core);

    const { alpha, beta, radius, target, ...rest } = c;
    const { scene } = this.core;
    const instance = new BabylonArcRotateCamera(ArcRotateCamera.name, alpha, beta, radius, target, scene, false);
    assign(instance, rest);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [ArcRotateCamera],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
