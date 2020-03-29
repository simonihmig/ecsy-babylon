import { Camera, Engine, Scene, ShadowGenerator } from '@babylonjs/core';
import { Component, World } from 'ecsy';

export default class BabylonCore extends Component {
  world!: World;
  canvas!: HTMLCanvasElement;
  defaultCamera!: Camera;
  engine!: Engine;
  scene!: Scene;
  shadowGenerators: Set<ShadowGenerator> = new Set();
  beforeRender?: (delta: number, time: number) => void;
  afterRender?: (delta: number, time: number) => void;
}

Object.defineProperty(BabylonCore, 'name', { value: 'BabylonCore' });
