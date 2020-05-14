import { BabylonCore, Box, Parent, Plane, Sphere } from '../src/components';
import setupWorld from './helpers/setup-world';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

describe('primitive system', function () {
  describe('box', function () {
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
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, -0.5)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0.5)).toBeTrue();
    });

    it('can create a custom box', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box, { name: 'test', width: 2, height: 3, depth: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const mesh = scene.meshes[0];

      expect(mesh).toBeInstanceOf(AbstractMesh);
      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(12); // 6 sides, two polys each
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 2)).toBeTrue();
    });
  });

  describe('plane', function () {
    it('can create a default plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const mesh = scene.meshes[0];

      expect(mesh).toBeInstanceOf(AbstractMesh);
      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(2);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0)).toBeTrue();
    });

    it('can create a custom plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test', width: 2, height: 3 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const mesh = scene.meshes[0];

      expect(mesh).toBeInstanceOf(AbstractMesh);
      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(2);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 0)).toBeTrue();
    });
  });

  describe('sphere', function () {
    it('can create a default sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const mesh = scene.meshes[0];

      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, -0.5)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0.5)).toBeTrue();
    });

    it('can create a custom sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test', diameterX: 2, diameterY: 3, diameterZ: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const mesh = scene.meshes[0];

      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 2)).toBeTrue();
    });
  });
});
