import { BabylonCore, Box, Parent, PbrMaterial, StandardMaterial } from '../src/components';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import setupWorld from './helpers/setup-world';
import { StandardMaterial as BabylonStandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import Material from '../src/components/material';

describe('material system', function () {
  describe('pbr material', function () {
    it('can add material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PbrMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const material = scene.getMaterialByName('PbrMaterial') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 1, 1)).toBeTrue();
    });

    it('can add material with custom values', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(PbrMaterial, {
          albedoColor: new Color3(1, 0, 0),
          ambientColor: new Color3(0, 1, 0),
          emissiveColor: new Color3(0, 0, 1),
          roughness: 0.5,
          metallic: 0.1,
        });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const material = scene.getMaterialByName('PbrMaterial') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
      expect(material.roughness).toBe(0.5);
      expect(material.metallic).toBe(0.1);
    });

    it('can update material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PbrMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(PbrMaterial);
      Object.assign(component, {
        albedoColor: new Color3(1, 0, 0),
        ambientColor: new Color3(0, 1, 0),
        emissiveColor: new Color3(0, 0, 1),
        roughness: 0.5,
        metallic: 0.1,
      });

      world.execute(0, 0);

      const material = scene.getMaterialByName('PbrMaterial') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
      expect(material.roughness).toBe(0.5);
      expect(material.metallic).toBe(0.1);
    });

    it('can apply material to updated mesh', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(PbrMaterial, { albedoColor: new Color3(1, 0, 0) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Box)!;
      component.size = 2;

      world.execute(0, 0);

      const material = scene.getMaterialByName('PbrMaterial') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
    });

    it('can remove material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PbrMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      entity.removeComponent(PbrMaterial);
      world.execute(0, 0);

      const material = scene.getMaterialByName('PbrMaterial');

      expect(material).toBeNull();
      expect(scene.meshes[0].material).toBeNull();
    });

    it('can remove whole entity', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PbrMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      entity.remove();
      world.execute(0, 0);

      const material = scene.getMaterialByName('PbrMaterial');

      expect(material).toBeNull();
    });
  });

  describe('standard material', function () {
    it('can add material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(StandardMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const material = scene.getMaterialByName('StandardMaterial') as BabylonStandardMaterial;

      expect(material).toBeInstanceOf(BabylonStandardMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.diffuseColor.equalsFloats(1, 1, 1)).toBeTrue();
    });

    it('can add material with custom values', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(StandardMaterial, {
          diffuseColor: new Color3(1, 0, 0),
          ambientColor: new Color3(0, 1, 0),
          emissiveColor: new Color3(0, 0, 1),
        });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const material = scene.getMaterialByName('StandardMaterial') as BabylonStandardMaterial;

      expect(material).toBeInstanceOf(BabylonStandardMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.diffuseColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
    });

    it('can update material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(StandardMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(StandardMaterial);
      Object.assign(component, {
        diffuseColor: new Color3(1, 0, 0),
        ambientColor: new Color3(0, 1, 0),
        emissiveColor: new Color3(0, 0, 1),
      });

      world.execute(0, 0);

      const material = scene.getMaterialByName('StandardMaterial') as BabylonStandardMaterial;

      expect(material).toBeInstanceOf(BabylonStandardMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.diffuseColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
    });

    it('can remove material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(StandardMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      entity.removeComponent(StandardMaterial);
      world.execute(0, 0);

      const material = scene.getMaterialByName('StandardMaterial');

      expect(material).toBeNull();
      expect(scene.meshes[0].material).toBeNull();
    });
  });

  describe('material', function () {
    it('can add material instance', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const material = new BabylonPBRMaterial('PbrMaterial', scene);
      entity.addComponent(Parent).addComponent(Box).addComponent(Material, { value: material });

      world.execute(0, 0);

      expect(scene.meshes[0].material).toEqual(material);
    });

    it('can update material instance', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const material = new BabylonPBRMaterial('PbrMaterial', scene);
      entity.addComponent(Parent).addComponent(Box).addComponent(Material, { value: material });

      world.execute(0, 0);

      const component = entity.getMutableComponent(Material)!;
      const material2 = new BabylonStandardMaterial('Standard', scene);
      component.value = material2;

      world.execute(0, 0);

      expect(scene.meshes[0].material).toEqual(material2);
    });

    it('can remove material instance', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const material = new BabylonPBRMaterial('PbrMaterial', scene);
      entity.addComponent(Parent).addComponent(Box).addComponent(Material, { value: material });

      world.execute(0, 0);

      entity.removeComponent(Material);

      world.execute(0, 0);

      expect(scene.meshes[0].material).toBeNull();
    });
  });
});
