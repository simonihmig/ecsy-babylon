import { Box, Mesh } from '../../components';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assert } from '../../-private/utils/debug';
import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder';

export default class BoxPrimitiveSystem extends FactorySystem<Box, Mesh<BabylonMesh>, BabylonMesh> {
  protected instanceComponentConstructor = Mesh;
  protected recreateInstanceOnUpdate = true;

  protected create(c: Box): BabylonMesh {
    assert('BoxPrimitiveSystem needs BabylonCoreComponent', this.core);

    // Babylon's Builder unfortunately mutate the passed options, so we need to spread to clone them
    return BoxBuilder.CreateBox(Box.name, { ...c });
  }

  static queries = {
    ...queries,
    factory: {
      components: [Box],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
