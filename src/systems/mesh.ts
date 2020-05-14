import { Entity } from 'ecsy';
import { Mesh, TransformNode, Material } from '../components';
import SystemWithCore, { queries } from '../SystemWithCore';
import assert from '../utils/assert';
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
    this.queries.meshes.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh);

    assert('MeshSystem needs BabylonCoreComponent', this.core);
    assert('Failed to add Mesh Component. No valid Mesh found.', !!meshComponent?.value);

    // We're using an instance here because we cannot reliably undo the internal transformations that happen when
    // parenting/un-parenting a mesh. An instance of a mesh has the identical geometry and properties of the original
    // but with its own position, rotation, scaling meaning the original won't be touched.
    // TODO: remove cloning?
    detachFromScene(meshComponent.value);
    const mesh = meshComponent.value.clone(`${meshComponent.value.name}__clone`, null, true);

    if (mesh) {
      const transformNodeComponent = entity.getComponent(TransformNode);
      meshComponent.value.parent = transformNodeComponent.value;
      meshComponent.value.computeWorldMatrix(true);
      detachFromScene(mesh);

      meshComponent.value = mesh;
    }

    const { value, ...restArgs } = meshComponent;

    Object.assign(value, restArgs);
    this.core.scene.addMesh(meshComponent.value);
  }

  remove(entity: Entity): void {
    const meshComponent = entity.getRemovedComponent(Mesh);

    assert('MeshSystem needs BabylonCoreComponent', this.core);
    assert(
      'No removed Mesh Component found. Make sure this system is registered at the correct time.',
      !!meshComponent?.value
    );

    if (entity.hasComponent(Material) || entity.hasRemovedComponent(Material)) {
      // unset the material so it is not also disposed of here
      meshComponent.value.material = null;
    }

    this.core.scene.removeMesh(meshComponent.value);

    // we work with a clone so we must always dispose
    meshComponent.value.dispose();
    meshComponent.value = null;
  }

  static queries = {
    ...queries,
    meshes: {
      components: [Mesh],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
