import { HemisphericLight } from '../../components';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';
import Light from '../../components/light';
import { Scene } from '@babylonjs/core/scene';

export default class HemisphericLightSystem extends FactorySystem<
  HemisphericLight,
  Light<BabylonHemisphericLight>,
  BabylonHemisphericLight
> {
  protected instanceComponentConstructor = Light;

  protected create(c: HemisphericLight): BabylonHemisphericLight {
    assert('HemisphericLightSystem needs BabylonCoreComponent', this.core);

    const { direction, ...options } = c;
    const instance = new BabylonHemisphericLight(
      HemisphericLight.name,
      direction,
      (null as unknown) as Scene // passing null is actually possible, but the typings require a Scene
    );
    assign(instance, options);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [HemisphericLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
