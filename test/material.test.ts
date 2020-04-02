import { BabylonCore, Box, Parent, PBRMaterial } from '../src/components';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PBRMaterial as BabylonPBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import setupWorld from './helpers/setup-world';

describe('material system', function() {
  it('can add PBR material', function() {
    const { world, rootEntity } = setupWorld();

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Box)
      .addComponent(PBRMaterial, { name: 'test' });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);
    const material = scene.getMaterialByName('test') as BabylonPBRMaterial;

    expect(material).toBeInstanceOf(BabylonPBRMaterial);
    expect(material.albedoColor.equalsFloats(1, 1, 1)).toBeTrue();
  });

  it('can add PBR material with custom values', function() {
    const { world, rootEntity } = setupWorld();

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Box)
      .addComponent(PBRMaterial, {
        name: 'test',
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
    expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
    expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
    expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
    expect(material.roughness).toEqual(0.5);
    expect(material.metallic).toEqual(0.1);
  });

  it('can update PBR material', function() {
    const { world, rootEntity } = setupWorld();

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Box)
      .addComponent(PBRMaterial, { name: 'test' });

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
    expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();
    expect(material.ambientColor.equalsFloats(0, 1, 0)).toBeTrue();
    expect(material.emissiveColor.equalsFloats(0, 0, 1)).toBeTrue();
    expect(material.roughness).toEqual(0.5);
    expect(material.metallic).toEqual(0.1);
  });

  it('can remove PBR material', function() {
    const { world, rootEntity } = setupWorld();

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Box)
      .addComponent(PBRMaterial, { name: 'test' });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    entity.remove();
    world.execute(0, 0);

    const material = scene.getMaterialByName('test');

    expect(material).toBeNull();
  });
});
