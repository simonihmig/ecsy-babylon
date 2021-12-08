import { PointLight } from '../../components';
import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';
import Light from '../../components/light';

export default class PointLightSystem extends FactorySystem<PointLight, Light<BabylonPointLight>, BabylonPointLight> {
  protected instanceComponentConstructor = Light;
  protected transitionTarget = 'light';

  protected create(c: PointLight): BabylonPointLight {
    assert('PointLightSystem needs BabylonCoreComponent', this.core);

    const { position, ...options } = c;
    const instance = new BabylonPointLight(PointLight.name, position, this.core.scene);
    assign(instance, options);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [PointLight],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
