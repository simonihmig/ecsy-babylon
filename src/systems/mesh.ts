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
    this.queries.meshes.changed?.forEach((e: Entity) => this.update(e));
    this.queries.meshes.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh);

    assert('MeshSystem needs BabylonCoreComponent', this.core);
    assert('Failed to add Mesh Component. No valid Mesh found.', !!meshComponent?.value);

    // We're using a clone here because we cannot reliably undo the internal transformations that happen when
    // parenting/un-parenting a mesh.
    // TODO: remove cloning?
    detachFromScene(meshComponent.value);
    const mesh = meshComponent.value.clone(`${meshComponent.value.name}__clone`, null, true);

    if (mesh) {
      const transformNodeComponent = entity.getComponent(TransformNode);
      mesh.parent = transformNodeComponent.value;
      mesh.computeWorldMatrix(true); // @todo still needed?
      // detachFromScene(mesh);

      meshComponent.value = mesh;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, _prevValue, ...restArgs } = meshComponent;

    Object.assign(value, restArgs);
    // this.core.scene.addMesh(meshComponent.value);

    meshComponent._prevValue = meshComponent.value;
  }

  update(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh);
    const previousMesh = meshComponent._prevValue;

    if (previousMesh && meshComponent.value !== previousMesh) {
      this.removeMesh(previousMesh);
    }

    this.setup(entity);
    if (previousMesh && meshComponent.value) {
      meshComponent.value.material = previousMesh.material;
    }
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

    this.removeMesh(meshComponent.value);
    meshComponent.value = null;
  }

  private removeMesh(mesh: AbstractMesh): void {
    this.core?.scene.removeMesh(mesh, false);

    // we work with a clone so we must always dispose
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
