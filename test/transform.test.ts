import { BabylonCore, Box, Parent, Position, Rotation, Scale } from '../src/components';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import setupWorld from './helpers/setup-world';

describe('transform system', function () {
  describe('position', function () {
    it('can add position', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Position, { value: new Vector3(1, 2, 3) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().equalsToFloats(1, 2, 3)).toBeTrue();
    });

    it('can update position', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().equalsToFloats(1, 2, 3)).toBeTrue();
    });

    it('can remove position', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Position, { value: new Vector3(1, 0, 1) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      entity.removeComponent(Position);
      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().equalsToFloats(0, 0, 0)).toBeTrue();
    });
  });
  describe('rotation', function () {
    it('can add rotation', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Rotation, { value: new Vector3(0, Math.PI, 0) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(-1);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);
    });

    it('can update rotation', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(Rotation, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Rotation)!;
      component.value = new Vector3(0, Math.PI, 0);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(-1);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);
    });

    it('can remove rotation', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Rotation, { value: new Vector3(1, 0, 1) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      entity.removeComponent(Rotation);
      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(1);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);
    });
  });
  describe('scale', function () {
    it('can add scale', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Scale, { value: new Vector3(2, 1, 1) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeCloseTo(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toBeCloseTo(0);
    });

    it('can update scale', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Scale)!;
      component.value = new Vector3(2, 1, 1);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeCloseTo(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toBeCloseTo(0);
    });

    it('can remove scale', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Scale, { value: new Vector3(3, 1, 1) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      entity.removeComponent(Scale);
      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);

      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeCloseTo(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toBeCloseTo(0);
    });
  });
});
