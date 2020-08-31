import { PostProcessRenderPipeline, SsaoRenderingPipeline } from '../../components';
import { queries } from '../../-private/systems/with-core';
import assert from '../../-private/utils/assert';
import { SSAORenderingPipeline as BabylonSSAORenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline';
import assign from '../../-private/utils/assign';
import FactoryArraySystem from '../../-private/systems/factory-array';
import '@babylonjs/core/Rendering/depthRendererSceneComponent';

export default class SsaoRenderPipelineSystem extends FactoryArraySystem<
  SsaoRenderingPipeline,
  PostProcessRenderPipeline<SsaoRenderingPipeline, BabylonSSAORenderingPipeline>,
  BabylonSSAORenderingPipeline
> {
  protected instanceComponentConstructor = PostProcessRenderPipeline;
  protected instanceConstructor = BabylonSSAORenderingPipeline;

  protected create(c: SsaoRenderingPipeline): BabylonSSAORenderingPipeline {
    assert('SsaoRenderPipelineSystem needs BabylonCoreComponent', this.core);

    const { name, combineRatio, ssaoRatio, ...args } = c;
    const instance = new BabylonSSAORenderingPipeline(name, this.core.scene, { combineRatio, ssaoRatio });
    assign(instance, args);

    return instance;
  }

  static queries = {
    ...queries,
    factory: {
      components: [SsaoRenderingPipeline],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
