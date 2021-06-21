import { SpotLight } from '../../components';
import { SpotLight as BabylonSpotLight } from '@babylonjs/core/Lights/spotLight';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';
import Light from '../../components/light';
import { Scene } from '@babylonjs/core/scene';

export default class SpotLightSystem extends FactorySystem<SpotLight, Light<BabylonSpotLight>, BabylonSpotLight> {
  protected instanceComponentConstructor = Light;
  protected transitionTarget = 'light';

  protected create(c: SpotLight): BabylonSpotLight {
    assert('SpotLightSystem needs BabylonCoreComponent', this.core);

    const { direction, position, angle, exponent, ...options } = c;
    const instance = new BabylonSpotLight(
      SpotLight.name,
      position,
      direction,
      angle,
      exponent,
      null as unknown as Scene // passing null is actually possible, but the typings require a Scene
    );
    assign(instance, options);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [SpotLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
