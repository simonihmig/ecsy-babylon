import { BabylonCore } from '../src/components';
import { waitForRAF } from './helpers/wait';
import setupWorld from './helpers/setup-world';

describe('babylon system', function () {
  it('sets up babylon scene', function () {
    const { world, rootEntity } = setupWorld();

    world.execute(0, 0);
    const babylonComponent = rootEntity.getComponent(BabylonCore);

    expect(babylonComponent.engine).toBeDefined();
    expect(babylonComponent.scene).toBeDefined();
  });

  it('calls render beforeRender and afterRender', async function () {
    const beforeRender = jest.fn();
    const afterRender = jest.fn();

    const { world } = setupWorld({
      rootEntityValues: {
        beforeRender,
        afterRender,
      },
    });

    world.execute(0, 0);

    await waitForRAF();

    expect(beforeRender).toHaveBeenCalled();
    expect(beforeRender.mock.calls[0][0]).toBe(0);
    expect(beforeRender.mock.calls[0][1]).toBeGreaterThan(15); // an animation frame

    expect(afterRender).toHaveBeenCalled();
    expect(afterRender.mock.calls[0][0]).toBe(0);
    expect(afterRender.mock.calls[0][1]).toBeGreaterThan(15); // an animation frame
  });
});
