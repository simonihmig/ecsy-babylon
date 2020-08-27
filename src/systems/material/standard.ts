import { Material, StandardMaterial } from '../../components';
import { StandardMaterial as BabylonStandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import assign from '../../-private/utils/assign';
import assert from '../../-private/utils/assert';

export default class StandardMaterialSystem extends FactorySystem<
  StandardMaterial,
  Material<StandardMaterial, BabylonStandardMaterial>,
  BabylonStandardMaterial
> {
  protected instanceComponentConstructor = Material;

  protected create(c: StandardMaterial): BabylonStandardMaterial {
    assert('StandardMaterialSystem needs BabylonCoreComponent', this.core);

    const instance = new BabylonStandardMaterial(StandardMaterial.name, this.core.scene);
    assign(instance, c);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [StandardMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
