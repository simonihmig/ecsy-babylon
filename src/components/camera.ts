import InstanceComponent from './_instance';
import { Camera } from '@babylonjs/core/Cameras/camera';

export default class CameraComponent<C, I extends Camera = Camera> extends InstanceComponent<C, I> {}
