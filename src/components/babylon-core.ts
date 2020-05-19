import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Component, World } from 'ecsy';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class BabylonCore extends Component {
  world!: World;
  canvas!: HTMLCanvasElement;
  defaultCamera!: Camera;
  engine!: Engine;
  scene!: Scene;
  shadowGenerators: Set<ShadowGenerator> = new Set();
  beforeRender?: (delta: number, time: number) => void;
  afterRender?: (delta: number, time: number) => void;

  reset(): void {
    // this is not really supposed to be re-used.
  }
}

Object.defineProperty(BabylonCore, 'name', { value: 'BabylonCore' });
