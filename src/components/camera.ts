import InstanceComponent from './_instance';
import { Camera } from '@babylonjs/core/Cameras/camera';

export default class CameraComponent<I extends Camera = Camera> extends InstanceComponent<CameraComponent, I> {}
