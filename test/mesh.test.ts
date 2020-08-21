import { BabylonCore, Mesh, Parent } from '../src/components';
import setupWorld from './helpers/setup-world';
import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';

describe('mesh system', function () {
  it('can add mesh', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { value: BoxBuilder.CreateBox('test', { size: 1 }) });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    const mesh = scene.meshes[0];
    expect(mesh).toBeInstanceOf(BabylonMesh);
    expect(mesh.name).toMatch(/test/);
  });

  it('integrates with transformNodes properly', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { value: BoxBuilder.CreateBox('test', { size: 1 }) });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.transformNodes).toHaveLength(1);
    expect(scene.rootNodes).toHaveLength(2); // TN + default camera

    const mesh = scene.meshes[0];
    const tn = scene.transformNodes[0];

    expect(scene.rootNodes).toIncludeAllMembers([tn]);
    expect(tn.getChildren()).toHaveLength(1);
    expect(tn.getChildren()[0]).toEqual(mesh);
    expect(mesh.parent).toEqual(tn);
  });

  it('can update mesh', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { value: BoxBuilder.CreateBox('box1', { size: 1 }) });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);
    expect(scene.meshes[0]).toBeInstanceOf(BabylonMesh);
    expect(scene.meshes[0].name).toMatch(/box1/);

    const meshComponent = entity.getMutableComponent(Mesh);
    expect(meshComponent).toBeDefined();

    meshComponent.value = BoxBuilder.CreateBox('box2', { size: 1 });

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);
    expect(scene.meshes[0]).toBeInstanceOf(BabylonMesh);
    expect(scene.meshes[0].name).toMatch(/box2/);
  });

  it('can remove mesh', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity.addComponent(Parent).addComponent(Mesh, { value: BoxBuilder.CreateBox('test', { size: 1 }) });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    entity.remove();
    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(0);
    expect(scene.geometries).toHaveLength(0);
  });

  it('does not remove mesh used elsewhere', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const mesh = BoxBuilder.CreateBox('test', { size: 1 });
    const entity1 = world.createEntity();
    const entity2 = world.createEntity();
    entity1.addComponent(Parent).addComponent(Mesh, { value: mesh });
    entity2.addComponent(Parent);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    entity1.removeComponent(Mesh);
    entity2.addComponent(Mesh, { value: mesh });

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    entity1.remove();
    entity2.remove();

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(0);
    expect(scene.geometries).toHaveLength(0);
  });

  it('can override mesh properties', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Mesh, { value: BoxBuilder.CreateBox('test', { size: 1 }), overrides: { isVisible: false } });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    const mesh = scene.meshes[0];
    expect(mesh).toBeInstanceOf(BabylonMesh);
    expect(mesh.name).toMatch(/test/);
    expect(mesh.isVisible).toBeFalse();
  });

  it('can update overridden mesh properties', function () {
    const { world, rootEntity } = setupWorld();

    // wait for scene to be created before creating meshes
    world.execute(0, 0);

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Mesh, { value: BoxBuilder.CreateBox('test', { size: 1 }), overrides: { isVisible: false } });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.meshes).toHaveLength(1);
    expect(scene.geometries).toHaveLength(1);

    const meshComponent = entity.getMutableComponent(Mesh);
    expect(meshComponent).toBeDefined();
    meshComponent.overrides.isVisible = true;

    world.execute(0, 0);

    const mesh = scene.meshes[0];
    expect(mesh).toBeInstanceOf(BabylonMesh);
    expect(mesh.name).toMatch(/test/);
    expect(mesh.isVisible).toBeTrue();
  });
});
