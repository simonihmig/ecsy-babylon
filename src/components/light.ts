import InstanceComponent from './_instance';
import { Light as BabylonLight } from '@babylonjs/core/Lights/light';

export default class Light<C, I extends BabylonLight = BabylonLight> extends InstanceComponent<C, I> {}
