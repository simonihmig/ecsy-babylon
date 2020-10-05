import { Entity } from 'ecsy';
import { Material, Mesh } from '../components';
import { Scene } from '@babylonjs/core/scene';
import { assert } from '../-private/utils/debug';
import { assign } from '../-private/utils/assign';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

type MaterialConstructor<T> = { new (name: string, scene: Scene, doNotAdd?: boolean): T };

export default class MaterialSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.Material.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.Material.added?.forEach((e: Entity) => this.setup(e));
    this.queries.Material.changed?.forEach((e: Entity) => this.setup(e));

    super.afterExecute();
  }

  hasMesh(entity: Entity, removed = false): boolean {
    const component = entity.getComponent(Mesh, removed);

    return !!component?.value;
  }

  getMesh(entity: Entity, removed = false): AbstractMesh {
    // Optionally allow getting the TransformNode as a removed component.
    // Useful in the case where the entire Entity is being removed.
    const meshComponent = removed
      ? entity.getComponent(Mesh) || entity.getRemovedComponent(Mesh)
      : entity.getComponent(Mesh);

    assert('No valid ECSY Mesh component found on this Entity.', meshComponent && meshComponent.value);

    return meshComponent.value;
  }

  setup(entity: Entity): void {
    const mesh = this.getMesh(entity);
    const materialComponent = entity.getComponent(Material)!;

    if (materialComponent.value) {
      const { value, overrides } = materialComponent;

      assign(value, overrides);
      mesh.material = value;
    } else {
      console.warn(`No material was applied to mesh "${mesh.name}".`);
    }
  }

  remove(entity: Entity): void {
    // remove mesh from material if there still is one
    if (this.hasMesh(entity, true)) {
      const mesh = this.getMesh(entity, true);

      if (mesh.material) {
        mesh.material = null;
      }
    }
  }

  static queries = {
    ...queries,
    Material: {
      components: [Mesh, Material],
      listen: {
        added: true,
        changed: [Material],
        removed: true,
      },
    },
  };
}
