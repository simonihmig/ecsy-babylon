import { DirectionalLight } from '../../components';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';
import Light from '../../components/light';
import { Scene } from '@babylonjs/core/scene';

export default class DirectionalLightSystem extends FactorySystem<
  DirectionalLight,
  Light<BabylonDirectionalLight>,
  BabylonDirectionalLight
> {
  protected instanceComponentConstructor = Light;
  protected transitionTarget = 'light';

  protected create(c: DirectionalLight): BabylonDirectionalLight {
    assert('DirectionalLightSystem needs BabylonCoreComponent', this.core);

    const { direction, ...options } = c;
    const instance = new BabylonDirectionalLight(
      DirectionalLight.name,
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );
    assign(instance, options);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [DirectionalLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
