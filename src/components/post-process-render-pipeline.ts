import { PostProcessRenderPipeline as BabylonPostProcessRenderPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/index';
import InstanceArrayComponent from './_instance-array';

export default class PostProcessRenderPipeline<
  C,
  I extends BabylonPostProcessRenderPipeline = BabylonPostProcessRenderPipeline
> extends InstanceArrayComponent<C, I> {}
