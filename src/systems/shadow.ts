import { Entity } from 'ecsy';
import { Light, Mesh, ShadowGenerator } from '../components';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import { assert } from '../-private/utils/debug';
import { InstancedMesh } from '@babylonjs/core/Meshes/instancedMesh';
import { ShadowGenerator as _ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import { assign } from '../-private/utils/assign';
import { ShadowLight } from '@babylonjs/core/Lights/shadowLight';

export default class ShadowSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.shadowGenerator.added?.forEach((e: Entity) => this.setup(e));
    this.queries.shadowGenerator.changed?.forEach((e: Entity) => this.update(e));

    this.queries.mesh.added?.forEach((e: Entity) => this.addMesh(e));
    // this.queries.mesh.removed?.forEach((e: Entity) => this.removeMesh(e));

    this.queries.shadowGenerator.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    assert('ShadowSystem needs BabylonCoreComponent', this.core);

    const lightComponent = entity.getComponent(Light);
    assert('No light instance was found on this light component.', lightComponent?.value);

    const light = lightComponent.value;

    const component = entity.getMutableComponent(ShadowGenerator)!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...options } = component;

    assert('ShadowLight instance required for shadows', light instanceof ShadowLight);
    const shadowGenerator = new _ShadowGenerator(options.size, light);
    assign(shadowGenerator, options);

    // disable continuous shadow calculation
    // light.autoUpdateExtends = false;
    // shadowGenerator.getShadowMap().refreshRate = RenderTargetTexture.REFRESHRATE_RENDER_ONCE;

    this.core.scene.meshes.forEach((m) => {
      // TODO: remove, pass this option to the mesh or primitive directly
      const mesh = m instanceof InstancedMesh ? m.sourceMesh : m;
      mesh.receiveShadows = true;

      shadowGenerator.addShadowCaster(m, false);
    });

    component.value = shadowGenerator;
    this.core.shadowGenerators.add(shadowGenerator);
  }

  update(entity: Entity): void {
    assert('ShadowSystem needs BabylonCoreComponent', this.core);

    const shadowComponent = entity.getComponent(ShadowGenerator);
    assert('No shadow generator instance was found.', shadowComponent?.value);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...options } = shadowComponent;

    assign(shadowComponent.value, options);
  }

  addMesh(entity: Entity): void {
    assert('ShadowSystem needs BabylonCoreComponent', this.core);

    const meshComponent = entity.getComponent(Mesh);

    if (meshComponent?.value) {
      const mesh = meshComponent.value;
      mesh.receiveShadows = true;
      this.core.shadowGenerators.forEach((sg) => sg.addShadowCaster(mesh, false));
    }
  }

  // TODO: currently this method does nothing, it runs when a Mesh is removed
  //  but a removed Mesh is always disposed right now.
  // removeMesh(entity: Entity): void {
  //   const meshComponent = entity.getRemovedComponent(Mesh);
  //
  //   // we only need to remove the shadowCaster if the Mesh still exists
  //   if (meshComponent?.value) {
  //     const component = entity.getMutableComponent(ShadowGenerator);
  //     // eslint-disable-next-line no-unused-expressions
  //     component.value?.removeShadowCaster(meshComponent.value, false);
  //   }
  // }

  remove(entity: Entity): void {
    assert('ShadowSystem needs BabylonCoreComponent', this.core);

    const component = entity.getRemovedComponent(ShadowGenerator)!;

    if (component.value) {
      this.core.shadowGenerators.delete(component.value);
      component.value.dispose();
      // component.value = undefined;
    }
  }

  static queries = {
    ...queries,
    shadowGenerator: {
      components: [ShadowGenerator],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    mesh: {
      components: [Mesh],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
