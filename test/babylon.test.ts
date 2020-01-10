import { World } from 'ecsy';
import { Babylon } from '../src/systems';
import { BabylonCore } from '../src/components';
import { NullEngine } from '@babylonjs/core';
import { waitForRAF } from './helpers/wait';

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

  it('calls render beforeRender and afterRender', async function() {
    const canvas = document.createElement('canvas');
    const world = new World();
    world.registerSystem(Babylon);

    const entity = world.createEntity();
    const beforeRender = jest.fn();
    const afterRender = jest.fn();

    entity.addComponent(BabylonCore, {
      world,
      canvas,
      engine: new NullEngine(),
      beforeRender,
      afterRender,
    });

    world.execute(0, 0);

    await waitForRAF();

    expect(beforeRender).toHaveBeenCalled();
    expect(beforeRender.mock.calls[0][0]).toBe(0);
    expect(beforeRender.mock.calls[0][1]).toBeGreaterThanOrEqual(16); // an animation frame

    expect(afterRender).toHaveBeenCalled();
    expect(afterRender.mock.calls[0][0]).toBe(0);
    expect(afterRender.mock.calls[0][1]).toBeGreaterThanOrEqual(16); // an animation frame
  });
});
