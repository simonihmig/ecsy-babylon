import { Entity } from 'ecsy';
import { Camera, PostProcess } from '../components';
import { Camera as BabylonCamera } from '@babylonjs/core/Cameras/camera';
import { PostProcess as BabylonPostProcess } from '@babylonjs/core/PostProcesses/postProcess';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import assert from '../-private/utils/assert';

export default class PostProcessSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.postprocess.added?.forEach((e: Entity) => this.setup(e));
    this.queries.postprocess.changed?.forEach((e: Entity) => this.update(e));
    this.queries.postprocess.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const ppComponent = entity.getComponent(PostProcess);

    assert('Failed to add PostProcess Component. No valid PostProcess found.', !!ppComponent?.value);

    const pps = ppComponent.value;
    const camera = this.getCamera(entity);
    pps.forEach((pp) => this.addPostProcess(camera, pp));
  }

  private getCamera(entity: Entity): BabylonCamera {
    const cameraComponent = entity.getComponent(Camera);
    assert('No Camera found for post processing', cameraComponent?.value);
    return cameraComponent.value;
  }

  private addPostProcess(camera: BabylonCamera, pp: BabylonPostProcess): void {
    const scene = camera.getScene();

    camera.attachPostProcess(pp);
    if (!scene.postProcesses.includes(pp)) {
      scene.postProcesses.push(pp);
    }
  }

  private removePostProcess(camera: BabylonCamera, pp: BabylonPostProcess): void {
    const scene = camera.getScene();
    const index = scene.postProcesses.indexOf(pp);

    camera.detachPostProcess(pp);
    if (index !== -1) {
      scene.postProcesses.splice(index, 1);
    }
  }

  update(entity: Entity): void {
    const ppComponent = entity.getMutableComponent(PostProcess);
    assert('Failed to add PostProcess Component. No valid PostProcess found.', !!ppComponent?.value);

    const pps = ppComponent.value;
    const prevPps = ppComponent.previousValue;

    let added: BabylonPostProcess[];
    let removed: BabylonPostProcess[] | undefined;

    if (prevPps) {
      added = pps.filter((pp) => !prevPps.includes(pp));
      removed = prevPps.filter((pp) => !pps.includes(pp));
    } else {
      added = pps;
    }

    const camera = this.getCamera(entity);
    if (removed) {
      removed.forEach((pp) => this.removePostProcess(camera, pp));
    }
    added.forEach((pp) => this.addPostProcess(camera, pp));
  }

  remove(entity: Entity): void {
    const ppComponent = entity.getRemovedComponent(PostProcess);
    assert('Failed to remove PostProcess Component. No valid PostProcess found.', !!ppComponent?.value);

    const camera = this.getCamera(entity);
    ppComponent.value.forEach((pp) => this.removePostProcess(camera, pp));
  }

  static queries = {
    ...queries,
    postprocess: {
      components: [PostProcess],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
