import { BabylonCore, Box, Parent, PBRMaterial } from '../src/components';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import setupWorld from './helpers/setup-world';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import Material from '../src/components/material';

describe('material system', function () {
  describe('pbr material', function () {
    it('can add PBR material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PBRMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const material = scene.getMaterialByName('test') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 1, 1)).toBeTrue();
    });

    it('can add PBR material with custom values', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(PBRMaterial, {
          albedoColor: new Color3(1, 0, 0),
          ambientColor: new Color3(0, 1, 0),
          emissiveColor: new Color3(0, 0, 1),
          roughness: 0.5,
          metallic: 0.1,
        });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const material = scene.getMaterialByName('test') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
      expect(material.roughness).toEqual(0.5);
      expect(material.metallic).toEqual(0.1);
    });

    it('can update PBR material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PBRMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(PBRMaterial);
      Object.assign(component, {
        albedoColor: new Color3(1, 0, 0),
        ambientColor: new Color3(0, 1, 0),
        emissiveColor: new Color3(0, 0, 1),
        roughness: 0.5,
        metallic: 0.1,
      });

      world.execute(0, 0);

      const material = scene.getMaterialByName('test') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
      expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
      expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
      expect(material.roughness).toEqual(0.5);
      expect(material.metallic).toEqual(0.1);
    });

    it('can apply PBR material to updated mesh', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(PBRMaterial, { albedoColor: new Color3(1, 0, 0) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(Box);
      component.size = 2;

      world.execute(0, 0);

      const material = scene.getMaterialByName('test') as BabylonPBRMaterial;

      expect(material).toBeInstanceOf(BabylonPBRMaterial);
      expect(scene.meshes[0].material).toEqual(material);
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
    });

    it('can remove PBR material', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box).addComponent(PBRMaterial);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      entity.remove();
      world.execute(0, 0);

      const material = scene.getMaterialByName('test');

      expect(material).toBeNull();
    });
  });

  describe('material', function () {
    it('can add existing material instance', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore);

      const material = new StandardMaterial('test', scene);
      entity.addComponent(Parent).addComponent(Box).addComponent(Material, { value: material });

      world.execute(0, 0);

      expect(scene.meshes[0].material).toEqual(material);
    });

    it('can override material properties', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore);

      const material = new StandardMaterial('test', scene);
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Material, { value: material, overrides: { useParallax: true } });

      world.execute(0, 0);

      expect(scene.meshes[0].material).toEqual(material);
      expect(material.useParallax).toBeTrue();
    });

    it('can update overridden material properties', function () {
      const { world, rootEntity } = setupWorld();

      world.execute(0, 0);

      const entity = world.createEntity();
      const { scene } = rootEntity.getComponent(BabylonCore);

      const material = new StandardMaterial('test', scene);
      entity
        .addComponent(Parent)
        .addComponent(Box)
        .addComponent(Material, { value: material, overrides: { useParallax: true } });

      world.execute(0, 0);

      const materialComponent = entity.getMutableComponent(Material);
      materialComponent.overrides.useParallax = false;

      world.execute(0, 0);

      expect(scene.meshes[0].material).toEqual(material);
      expect(material.useParallax).toBeFalse();
    });
  });
});
