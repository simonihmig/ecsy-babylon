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
  for (const system of options.systems ?? systems) {
    world.registerSystem(system);
  }

  for (const Component of options.components ?? components) {
    // somehow TS freaks out on this
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    world.registerComponent(Component);
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
