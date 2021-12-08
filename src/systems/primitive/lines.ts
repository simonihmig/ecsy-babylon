import { Lines, Mesh } from '../../components';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { queries } from '../../-private/systems/with-core';
import FactorySystem from '../../-private/systems/factory';
import { assert } from '../../-private/utils/debug';
import { LinesBuilder } from '@babylonjs/core/Meshes/Builders/linesBuilder';

export default class LinesPrimitiveSystem extends FactorySystem<Lines, Mesh<BabylonMesh>, BabylonMesh> {
  protected instanceComponentConstructor = Mesh;
  protected recreateInstanceOnUpdate = true;

  protected create(c: Lines): BabylonMesh {
    assert('LinesPrimitiveSystem needs BabylonCoreComponent', this.core);

    const { color, alpha, ...rest } = c;

    const linesMesh = LinesBuilder.CreateLines(Lines.name, rest, this.core.scene);
    if (color) {
      linesMesh.color = color;
    }
    linesMesh.alpha = alpha;

    return linesMesh;
  }

  static queries = {
    ...queries,
    factory: {
      components: [Lines],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
