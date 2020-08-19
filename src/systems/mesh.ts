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

    const mesh = meshComponent.value;
    detachFromScene(mesh);

    const transformNodeComponent = entity.getComponent(TransformNode);
    mesh.parent = transformNodeComponent.value;
    mesh.computeWorldMatrix(true); // @todo still needed?
    meshComponent.value = mesh;

    const { value, overrides } = meshComponent;
    Object.assign(value, overrides);

    this.core.scene.addMesh(mesh);
    meshComponent._prevValue = mesh;
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
    const mesh = meshComponent.value;
    if (entity.hasComponent(Material) || entity.hasRemovedComponent(Material)) {
      // unset the material so it is not also disposed of here
      meshComponent.value.material = null;
    }

    const isUsed = this.queries.meshes.results.some((e) => e !== entity && e.getComponent(Mesh).value === mesh);

    if (!isUsed) {
      this.removeMesh(meshComponent.value);
    }
    meshComponent.value = null;
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
