import { ComponentConstructor, Entity } from 'ecsy';
import { Mesh, PBRMaterial, Material, ShadowOnlyMaterial, BackgroundMaterial, StandardMaterial } from '../components';
import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { BackgroundMaterial as BabylonBackgroundMaterial } from '@babylonjs/core/Materials/Background/backgroundMaterial';
import { StandardMaterial as BabylonStandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import { ShadowOnlyMaterial as BabylonShadowOnlyMaterial } from '@babylonjs/materials/shadowOnly/shadowOnlyMaterial';
import assert from '../utils/assert';
import SystemWithCore, { queries } from '../SystemWithCore';
import { StandardMaterialComponent } from '../components/standard-material';
import { ShadowOnlyMaterialComponent } from '../components/shadow-only-material';
import { BackgroundMaterialComponent } from '../components/background-material';

type MaterialConstructor<T> = { new (name: string, scene: Scene, doNotAdd?: boolean): T };

export default class MaterialSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.StandardMaterial.added?.forEach((e: Entity) =>
      this.setupMaterial(e, StandardMaterial, BabylonStandardMaterial)
    );
    this.queries.StandardMaterial.changed?.forEach((e: Entity) => this.updateMaterial(e, StandardMaterial));
    this.queries.StandardMaterial.removed?.forEach((e: Entity) => this.removeMaterial(e));

    this.queries.ShadowOnlyMaterial.added?.forEach((e: Entity) =>
      this.setupMaterial(e, ShadowOnlyMaterial, BabylonShadowOnlyMaterial)
    );
    this.queries.ShadowOnlyMaterial.changed?.forEach((e: Entity) => this.updateMaterial(e, ShadowOnlyMaterial));
    this.queries.ShadowOnlyMaterial.removed?.forEach((e: Entity) => this.removeMaterial(e));

    this.queries.BackgroundMaterial.added?.forEach((e: Entity) =>
      this.setupMaterial(e, BackgroundMaterial, BabylonBackgroundMaterial)
    );
    this.queries.BackgroundMaterial.changed?.forEach((e: Entity) => this.updateMaterial(e, BackgroundMaterial));
    this.queries.BackgroundMaterial.removed?.forEach((e: Entity) => this.removeMaterial(e));

    this.queries.PBRMaterial.added?.forEach((e: Entity) => this.setupMaterial(e, PBRMaterial, BabylonPBRMaterial));
    this.queries.PBRMaterial.changed?.forEach((e: Entity) => this.updateMaterial(e, PBRMaterial));
    this.queries.PBRMaterial.removed?.forEach((e: Entity) => this.removeMaterial(e));

    this.queries.Material.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.Material.added?.forEach((e: Entity) => this.setup(e));
    this.queries.Material.changed?.forEach((e: Entity) => this.setup(e));

    super.afterExecute();
  }

  hasMesh(entity: Entity, removed = false): boolean {
    const component = removed
      ? entity.getComponent(Mesh) || entity.getRemovedComponent(Mesh)
      : entity.getComponent(Mesh);

    return !!component?.value;
  }

  getMesh(entity: Entity, removed = false): BabylonMesh {
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
    const materialComponent = entity.getComponent(Material);

    if (materialComponent.value) {
      const { value, ...restArgs } = materialComponent;

      Object.assign(value, restArgs);
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

    const material = entity.getRemovedComponent(Material);

    if (material.value) {
      // we should not dispose here, a Material instance is always passed, never created here
      material.value = null;
    }
  }

  setupMaterial(
    entity: Entity,
    Component: ComponentConstructor<
      PBRMaterial | ShadowOnlyMaterialComponent | BackgroundMaterialComponent | StandardMaterialComponent
    >,
    MaterialClass: MaterialConstructor<BabylonMaterial>
  ): void {
    assert('MaterialSystem needs BabylonCoreComponent', this.core);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { name, ...props } = entity.getComponent(Component);

    const material = new MaterialClass(name, this.core.scene);
    Object.assign(material, props);

    entity.addComponent(Material, { value: material });
  }

  updateMaterial(
    entity: Entity,
    Component: ComponentConstructor<
      PBRMaterial | ShadowOnlyMaterialComponent | BackgroundMaterialComponent | StandardMaterialComponent
    >
  ): void {
    const mesh = this.getMesh(entity);
    const materialComponent = entity.getComponent(Component);

    Object.assign(mesh.material, materialComponent);
  }

  removeMaterial(entity: Entity): void {
    const component = entity.getComponent(Material) || entity.getRemovedComponent(Material);

    if (component.value) {
      component.value.dispose();
    }

    entity.removeComponent(Material);
  }

  static queries = {
    ...queries,
    Material: {
      components: [Mesh, Material],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    StandardMaterial: {
      components: [Mesh, StandardMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    BackgroundMaterial: {
      components: [Mesh, BackgroundMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    PBRMaterial: {
      components: [Mesh, PBRMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    ShadowOnlyMaterial: {
      components: [Mesh, ShadowOnlyMaterial],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
