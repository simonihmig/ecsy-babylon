import { World } from 'ecsy';
import { Babylon } from '../src/systems';
import { BabylonCore } from '../src/components';
import { NullEngine } from '@babylonjs/core';

describe('babylon system', function() {
  it('sets up babylon scene', function() {
    const canvas = document.createElement('canvas');
    const world = new World();
    world.registerSystem(Babylon);

    const entity = world.createEntity();

    entity.addComponent(BabylonCore, {
      world,
      canvas,
      engine: new NullEngine(),
    });

    world.execute(0, 0);
    const babylonComponent = entity.getComponent(BabylonCore);

    expect(babylonComponent.engine).toBeDefined();
    expect(babylonComponent.scene).toBeDefined();
  });
});
