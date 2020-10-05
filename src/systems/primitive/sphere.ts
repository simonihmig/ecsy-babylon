import { Sphere, Mesh } from '../../components';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assert } from '../../-private/utils/debug';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';

export default class SpherePrimitiveSystem extends FactorySystem<Sphere, Mesh<BabylonMesh>, BabylonMesh> {
  protected instanceComponentConstructor = Mesh;
  protected recreateInstanceOnUpdate = true;

  protected create(c: Sphere): BabylonMesh {
    assert('SpherePrimitiveSystem needs BabylonCoreComponent', this.core);

    // Babylon's Builder unfortunately mutate the passed options, so we need to spread to clone them
    return SphereBuilder.CreateSphere(Sphere.name, { ...c });
  }

  static queries = {
    ...queries,
    factory: {
      components: [Sphere],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
