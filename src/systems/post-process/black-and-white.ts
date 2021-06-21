import { BlackAndWhitePostProcess, PostProcess } from '../../components';
import { BlackAndWhitePostProcess as BabylonBlackAndWhitePostProcess } from '@babylonjs/core/PostProcesses/blackAndWhitePostProcess';
import { queries } from '../../-private/systems/with-core';
import { Camera } from '@babylonjs/core/Cameras/camera';
import FactoryArraySystem from '../../-private/systems/factory-array';

export default class BlackAndWhitePostProcessSystem extends FactoryArraySystem<
  BlackAndWhitePostProcess,
  PostProcess<BabylonBlackAndWhitePostProcess>,
  BabylonBlackAndWhitePostProcess
> {
  protected instanceComponentConstructor = PostProcess;
  protected instanceConstructor = BabylonBlackAndWhitePostProcess;

  protected create(c: BlackAndWhitePostProcess): BabylonBlackAndWhitePostProcess {
    return new BabylonBlackAndWhitePostProcess(
      c.name,
      c.options,
      null as unknown as Camera, // class constructor is wrongly typed in Babylon
      c.samplingMode,
      this.core?.engine
    );
  }

  static queries = {
    ...queries,
    factory: {
      components: [BlackAndWhitePostProcess],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
