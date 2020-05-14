import { BabylonCore, Box, Parent } from '../src/components';
import setupWorld from './helpers/setup-world';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

describe('primitive system', function () {
  it('can create a default box', function () {
    const { world, rootEntity } = setupWorld();

    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Box, { name: 'test' });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);
    const mesh = scene.meshes[0];

    expect(mesh).toBeInstanceOf(AbstractMesh);
    mesh.updateFacetData();
    expect(mesh.facetNb).toEqual(12); // 6 sides, two polys each
  });
});
