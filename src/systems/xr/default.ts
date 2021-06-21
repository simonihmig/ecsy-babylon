import { Entity } from 'ecsy';
import { Scene } from '@babylonjs/core/scene';
import { assert } from '../../-private/utils/debug';
import SystemWithCore, { queries } from '../../-private/systems/with-core';
import WebXrDefaultExperience from '../../components/xr/default';
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience';

const experiences = new WeakMap<Scene, WebXRDefaultExperience>();

export default class WebXrDefaultExperienceSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.xp.added?.forEach((e: Entity) => this.setup(e) as unknown as void);
    this.queries.xp.removed?.forEach(() => this.remove());

    super.afterExecute();
  }

  async setup(entity: Entity): Promise<void> {
    assert('WebXrDefaultExperienceSystem needs BabylonCoreComponent', this.core);
    assert('Scene already has a WebXRDefaultExperience', !experiences.has(this.core.scene));

    const options = entity.getComponent(WebXrDefaultExperience);

    const defaultXRExperience = await WebXRDefaultExperience.CreateAsync(this.core.scene, options);
    experiences.set(this.core.scene, defaultXRExperience);
  }

  remove(): void {
    experiences.get(this.core!.scene)?.dispose();
  }

  static queries = {
    ...queries,
    xp: {
      components: [WebXrDefaultExperience],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
