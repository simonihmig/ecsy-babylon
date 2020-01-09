import { Camera, Engine, Scene, ShadowGenerator } from '@babylonjs/core';
import { createComponentClass, Component, World } from 'ecsy';

export interface BabylonCoreComponent extends Component {
  world: World;
  canvas: HTMLCanvasElement;
  defaultCamera: Camera;
  engine: Engine;
  scene: Scene;
  shadowGenerators: Set<ShadowGenerator>;
  beforeRender?: (delta: number, time: number) => void;
  afterRender?: (delta: number, time: number) => void;
}

export default createComponentClass<BabylonCoreComponent>(
  {
    world: { default: null },
    canvas: { default: null },
    defaultCamera: { default: null },
    engine: { default: null },
    scene: { default: null },
    shadowGenerators: { default: new Set() },
    beforeRender: { default: undefined },
    afterRender: { default: undefined },
  },
  'BabylonCore'
);
