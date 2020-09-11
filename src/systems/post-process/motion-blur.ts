import { MotionBlurPostProcess, PostProcess } from '../../components';
import { MotionBlurPostProcess as BabylonMotionBlurPostProcess } from '@babylonjs/core/PostProcesses/motionBlurPostProcess';
import { queries } from '../../-private/systems/with-core';
import FactoryArraySystem from '../../-private/systems/factory-array';
import assign from '../../-private/utils/assign';

export default class MotionMotionBlurPostProcessSystem extends FactoryArraySystem<
  MotionBlurPostProcess,
  PostProcess<BabylonMotionBlurPostProcess>,
  BabylonMotionBlurPostProcess
> {
  protected instanceComponentConstructor = PostProcess;
  protected instanceConstructor = BabylonMotionBlurPostProcess;

  protected create(c: MotionBlurPostProcess): BabylonMotionBlurPostProcess {
    const { name, options, samplingMode, ...rest } = c;
    const pp = new BabylonMotionBlurPostProcess(name, this.core!.scene, options, null, samplingMode, this.core!.engine);
    assign(pp, rest);

    return pp;
  }

  static queries = {
    ...queries,
    factory: {
      components: [MotionBlurPostProcess],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
