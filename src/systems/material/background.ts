import { Material, BackgroundMaterial } from '../../components';
import { BackgroundMaterial as BabylonBackgroundMaterial } from '@babylonjs/core/Materials/Background/backgroundMaterial';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';

export default class BackgroundMaterialSystem extends FactorySystem<
  BackgroundMaterial,
  Material<BabylonBackgroundMaterial>,
  BabylonBackgroundMaterial
> {
  protected instanceComponentConstructor = Material;
  protected transitionTarget = 'material';

  protected create(c: BackgroundMaterial): BabylonBackgroundMaterial {
    assert('PbrMaterialSystem needs BabylonCoreComponent', this.core);

    const instance = new BabylonBackgroundMaterial(BackgroundMaterial.name, this.core.scene);
    assign(instance, c);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [BackgroundMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
