import { ComponentConstructor, Entity, System, SystemConstructor } from 'ecsy';
import { BabylonCore } from '../../src/components';
import { components, systems, World } from '../../src';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine';
import { Component } from 'ecsy/src/Component';
import { Engine } from '@babylonjs/core/Engines/engine';

export interface SetupWorld {
  world: World;
  rootEntity: Entity;
  engine: Engine;
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

  return {
    world,
    rootEntity,
    engine,
  };
}
