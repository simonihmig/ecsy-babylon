import { Material, ShadowOnlyMaterial } from '../../components';
import { ShadowOnlyMaterial as BabylonShadowOnlyMaterial } from '@babylonjs/materials/shadowOnly/shadowOnlyMaterial';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import assign from '../../-private/utils/assign';
import assert from '../../-private/utils/assert';

export default class ShadowOnlyMaterialSystem extends FactorySystem<
  ShadowOnlyMaterial,
  Material<BabylonShadowOnlyMaterial>,
  BabylonShadowOnlyMaterial
> {
  protected instanceComponentConstructor = Material;

  protected create(c: ShadowOnlyMaterial): BabylonShadowOnlyMaterial {
    assert('PbrMaterialSystem needs BabylonCoreComponent', this.core);

    const instance = new BabylonShadowOnlyMaterial(ShadowOnlyMaterial.name, this.core.scene);
    assign(instance, c);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [ShadowOnlyMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
