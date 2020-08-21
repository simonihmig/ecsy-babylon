import { Entity } from 'ecsy';
import { ShadowGenerator, DirectionalLight, PointLight, Mesh } from '../components';
import SystemWithCore, { queries } from '../SystemWithCore';
import assert from '../utils/assert';
import { InstancedMesh } from '@babylonjs/core/Meshes/instancedMesh';
import { ShadowGenerator as _ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class ShadowSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.shadowGenerator.added?.forEach((e: Entity) => this.setup(e));

    this.queries.mesh.added?.forEach((e: Entity) => this.addMesh(e));
    // this.queries.mesh.removed?.forEach((e: Entity) => this.removeMesh(e));

    this.queries.shadowGenerator.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  getLightComponent(entity: Entity): DirectionalLight | PointLight {
    const component = entity.getMutableComponent(DirectionalLight) || entity.getComponent(PointLight);

    assert('No light component was found on this entity.', component);

    return component;
  }

  setup(entity: Entity): void {
    assert('ShadowSystem needs BabylonCoreComponent', this.core);

    const lightComponent = this.getLightComponent(entity);
    assert('No light instance was found on this light component.', lightComponent.light);

    const light = lightComponent.light;

    const component = entity.getMutableComponent(ShadowGenerator)!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...options } = component;

    const shadowGenerator = new _ShadowGenerator(options.size, light);
    Object.assign(shadowGenerator, options);

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
