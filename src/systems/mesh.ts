import { Entity } from 'ecsy';
import { Mesh, TransformNode, Material } from '../components';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import { assert } from '../-private/utils/debug';
import { assign } from '../-private/utils/assign';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

function detachFromScene(mesh: AbstractMesh): void {
  const scene = mesh.getScene();
  if (scene) {
    scene.removeMesh(mesh);
  }
}

export default class MeshSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.meshes.added?.forEach((e: Entity) => this.setup(e));
    this.queries.meshes.changed?.forEach((e: Entity) => this.update(e));
    this.queries.meshes.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh);

    assert('MeshSystem needs BabylonCoreComponent', this.core);
    assert('Failed to add Mesh Component. No valid Mesh found.', !!meshComponent?.value);

    const mesh = meshComponent.value;
    detachFromScene(mesh);

    const transformNodeComponent = entity.getComponent(TransformNode);
    assert('TransformNode needed for meshes, add Parent component to fix', transformNodeComponent);

    mesh.parent = transformNodeComponent.value;
    mesh.computeWorldMatrix(true); // @todo still needed?

    const { value, overrides } = meshComponent;
    assign(value, overrides);

    this.core.scene.addMesh(mesh);
  }

  update(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh)!;
    const mesh = meshComponent.value;
    const previousMesh = meshComponent.previousValue;

    if (previousMesh && mesh !== previousMesh) {
      this.removeMesh(previousMesh);
    }

    this.setup(entity);
    if (previousMesh && mesh) {
      mesh.material = previousMesh.material;
    }
  }

  remove(entity: Entity): void {
    const meshComponent = entity.getRemovedComponent(Mesh);

    assert('MeshSystem needs BabylonCoreComponent', this.core);
    assert(
      'No removed Mesh Component found. Make sure this system is registered at the correct time.',
      !!meshComponent?.value
    );
    const mesh = meshComponent.value;
    if (entity.hasComponent(Material) || entity.hasRemovedComponent(Material)) {
      // unset the material so it is not also disposed of here
      meshComponent.value.material = null;
    }

    const isUsed = this.queries.meshes.results.some((e) => e !== entity && e.getComponent(Mesh)!.value === mesh);

    if (!isUsed) {
      this.removeMesh(meshComponent.value);
    }
  }

  private removeMesh(mesh: AbstractMesh): void {
    assert('MeshSystem needs BabylonCoreComponent', this.core);

    this.core.scene.removeMesh(mesh, false);

    mesh.dispose(true, false);
  }

  static queries = {
    ...queries,
    meshes: {
      components: [Mesh],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
