import { ComponentConstructor, Entity, System, SystemConstructor } from 'ecsy';
import { BabylonCore } from '../../src/components';
import { components, systems, World } from '../../src';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine';
import { Component } from 'ecsy/src/Component';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';

export interface SetupWorld {
  world: World;
  rootEntity: Entity;
  engine: Engine;
  scene: Scene;
}

export interface SetupWorldOptions {
  systems?: SystemConstructor<System>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: ComponentConstructor<Component<any>>[];
  rootEntityValues?: Partial<BabylonCore>;
}

export default function setupWorld(options: SetupWorldOptions = {}): SetupWorld {
  const canvas = document.createElement('canvas');
  const world = new World();

  for (const Component of options.components ?? components) {
    world.registerComponent(Component);
  }

  for (const system of options.systems ?? systems) {
    world.registerSystem(system);
  }

  const rootEntity = world.createEntity();
  const engine = new NullEngine();

  rootEntity.addComponent(BabylonCore, {
    world,
    canvas,
    engine,
    ...(options.rootEntityValues ?? {}),
  });

  world.execute(0, 0);
  const { scene } = rootEntity.getComponent(BabylonCore)!;

  // This has the side effect that Engine.LastCreatedScene is null, which forces us to always explicitly pass a Scene
  // when created new Babylon instances that require it. Omitting to do that works in general, as Babylon will then use
  // this Engine.LastCreatedScene, but this can break when dealing with multiple Scenes in a single browser session (e.g.
  // adding and tearing down a new <canvas> in a SPA).
  const dummyScene = new Scene(engine);
  dummyScene.dispose();

  return {
    world,
    rootEntity,
    engine,
    scene,
  };
}
