import { Plane, Mesh } from '../../components';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assert } from '../../-private/utils/debug';
import { PlaneBuilder } from '@babylonjs/core/Meshes/Builders/planeBuilder';

export default class PlanePrimitiveSystem extends FactorySystem<Plane, Mesh<BabylonMesh>, BabylonMesh> {
  protected instanceComponentConstructor = Mesh;
  protected recreateInstanceOnUpdate = true;

  protected create(c: Plane): BabylonMesh {
    assert('PlanePrimitiveSystem needs BabylonCoreComponent', this.core);

    // Babylon's Builder unfortunately mutate the passed options, so we need to spread to clone them
    return PlaneBuilder.CreatePlane(Plane.name, { ...c });
  }

  static queries = {
    ...queries,
    factory: {
      components: [Plane],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
