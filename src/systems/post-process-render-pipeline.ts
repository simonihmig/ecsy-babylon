import { Entity } from 'ecsy';
import { Camera, PostProcessRenderPipeline } from '../components';
import { Camera as BabylonCamera } from '@babylonjs/core/Cameras/camera';
import { PostProcessRenderPipeline as BabylonPostProcessRenderPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderPipeline';
import SystemWithCore, { queries } from '../-private/systems/with-core';
import assert from '../-private/utils/assert';
import '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderPipelineManagerSceneComponent';

export default class PostProcessRenderPipelineSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.postprocess.added?.forEach((e: Entity) => this.setup(e));
    this.queries.postprocess.changed?.forEach((e: Entity) => this.update(e));
    this.queries.postprocess.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const ppComponent = entity.getComponent(PostProcessRenderPipeline);

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

  private addPostProcess(camera: BabylonCamera, pp: BabylonPostProcessRenderPipeline): void {
    const { postProcessRenderPipelineManager } = camera.getScene();

    postProcessRenderPipelineManager.addPipeline(pp);
    postProcessRenderPipelineManager.attachCamerasToRenderPipeline(pp.name, camera);
  }

  private removePostProcess(camera: BabylonCamera, pp: BabylonPostProcessRenderPipeline): void {
    const { postProcessRenderPipelineManager } = camera.getScene();

    // @todo no addPipeline() equivalent needed?
    postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(pp.name, camera);
  }

  update(entity: Entity): void {
    const ppComponent = entity.getMutableComponent(PostProcessRenderPipeline);
    assert(
      'Failed to add PostProcessRenderPipeline Component. No valid PostProcessRenderPipeline found.',
      !!ppComponent?.value
    );

    const pps = ppComponent.value;
    const prevPps = ppComponent.previousValue;

    let added: BabylonPostProcessRenderPipeline[];
    let removed: BabylonPostProcessRenderPipeline[] | undefined;

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
    const ppComponent = entity.getRemovedComponent(PostProcessRenderPipeline);
    assert('Failed to remove PostProcess Component. No valid PostProcess found.', !!ppComponent?.value);

    const camera = this.getCamera(entity);
    ppComponent.value.forEach((pp) => this.removePostProcess(camera, pp));
  }

  static queries = {
    ...queries,
    postprocess: {
      components: [PostProcessRenderPipeline],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
