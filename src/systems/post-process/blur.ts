import { BlurPostProcess, PostProcess } from '../../components';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import { queries } from '../../-private/systems/with-core';
import FactoryArraySystem from '../../-private/systems/factory-array';

export default class BlackAndWhitePostProcessSystem extends FactoryArraySystem<
  BlurPostProcess,
  PostProcess<BlurPostProcess, BabylonBlurPostProcess>,
  BabylonBlurPostProcess
> {
  protected instanceComponentConstructor = PostProcess;
  protected instanceConstructor = BabylonBlurPostProcess;

  protected create(c: BlurPostProcess): BabylonBlurPostProcess {
    return new BabylonBlurPostProcess(
      c.name,
      c.direction,
      c.kernel,
      c.options,
      null,
      c.samplingMode,
      this.core?.engine
    );
  }

  static queries = {
    ...queries,
    factory: {
      components: [BlurPostProcess],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
