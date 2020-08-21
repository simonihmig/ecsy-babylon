import { ComponentConstructor, Entity, System, SystemConstructor, World } from 'ecsy';
import systems from '../../src/systems';
import components, { BabylonCore } from '../../src/components';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine';
import { Component } from 'ecsy/src/Component';

export interface SetupWorld {
  world: World;
  rootEntity: Entity;
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

  rootEntity.addComponent(BabylonCore, {
    world,
    canvas,
    engine: new NullEngine(),
    ...(options.rootEntityValues ?? {}),
  });

  return {
    world,
    rootEntity,
  };
}
