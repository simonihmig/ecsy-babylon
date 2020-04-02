import { Entity, System, SystemConstructor, World } from 'ecsy';
import systems from '../../src/systems';
import { BabylonCore } from '../../src/components';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine';

export interface SetupWorld {
  world: World;
  rootEntity: Entity;
}

export interface SetupWorldOptions {
  systems?: SystemConstructor<System>[];
  rootEntityValues?: Partial<BabylonCore>;
}

export default function setupWorld(options: SetupWorldOptions = {}): SetupWorld {
  const canvas = document.createElement('canvas');
  const world = new World();
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
