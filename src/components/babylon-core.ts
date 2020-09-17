import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Component, ComponentSchema, World, Types } from 'ecsy';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

export default class BabylonCore extends Component<BabylonCore> {
  world!: World;
  canvas!: HTMLCanvasElement;
  engine!: Engine;
  scene!: Scene;
  shadowGenerators: Set<ShadowGenerator> = new Set();
  beforeRender?: (delta: number, time: number) => void;
  afterRender?: (delta: number, time: number) => void;

  static schema: ComponentSchema = {
    world: {
      type: Types.Ref,
    },
    canvas: {
      type: Types.Ref,
    },
    engine: {
      type: Types.Ref,
    },
    scene: {
      type: Types.Ref,
    },
    shadowGenerators: {
      type: Types.Ref,
    },
    beforeRender: {
      type: Types.Ref,
    },
    afterRender: {
      type: Types.Ref,
    },
  };
}
