import { Material, PbrMaterial } from '../../components';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assign } from '../../-private/utils/assign';
import { assert } from '../../-private/utils/debug';

export default class PbrMaterialSystem extends FactorySystem<
  PbrMaterial,
  Material<BabylonPBRMaterial>,
  BabylonPBRMaterial
> {
  protected instanceComponentConstructor = Material;

  protected create(c: PbrMaterial): BabylonPBRMaterial {
    assert('PbrMaterialSystem needs BabylonCoreComponent', this.core);

    const instance = new BabylonPBRMaterial(PbrMaterial.name, this.core.scene);
    assign(instance, c);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [PbrMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
