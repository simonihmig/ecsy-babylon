import { PostProcess as BabylonPostProcess } from '@babylonjs/core/PostProcesses/postProcess';
import InstanceArrayComponent from './_instance-array';

export default class PostProcess<I extends BabylonPostProcess = BabylonPostProcess> extends InstanceArrayComponent<
  PostProcess,
  I
> {}
