import { BabylonCore, Mesh, Parent } from '../src/components';
import setupWorld from './helpers/setup-world';
import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';

describe('mesh system', function () {
  it('can add mesh', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const box = BoxBuilder.CreateBox('test', { size: 1 });
    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { name: 'test', value: box });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);

    const mesh = scene.meshes[0];
    expect(mesh).toBeInstanceOf(BabylonMesh);
  });

  it('can remove mesh', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const box = BoxBuilder.CreateBox('test', { size: 1 });
    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { name: 'test', value: box });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);

    entity.remove();
    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(0);
  });
});
