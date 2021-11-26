import { BabylonCore, Box, DirectionalLight, Parent, ShadowGenerator } from '../src/components';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import setupWorld from './helpers/setup-world';

describe('shadow system', function () {
  it('can add shadow generator', function () {
    const { world, rootEntity } = setupWorld();

    const lightEntity = world.createEntity();
    lightEntity.addComponent(Parent).addComponent(DirectionalLight).addComponent(ShadowGenerator);

    const meshEntity = world.createEntity();
    meshEntity.addComponent(Parent).addComponent(Box);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;

    expect(scene.lights).toHaveLength(1);

    const light = scene.lights[0] as BabylonDirectionalLight;
    expect(light).toBeInstanceOf(BabylonDirectionalLight);

    const shadowGenerator = light.getShadowGenerator() as unknown as ShadowGenerator;
    expect(shadowGenerator).toBeDefined();
    expect(shadowGenerator.size).toBe(512);
    expect(shadowGenerator.forceBackFacesOnly).toBeFalse();
    expect(shadowGenerator.darkness).toBe(0); // make sure default values are preserved
  });

  it('can add shadow generator with custom arguments', function () {
    const { world, rootEntity } = setupWorld();

    const lightEntity = world.createEntity();
    lightEntity.addComponent(Parent).addComponent(DirectionalLight).addComponent(ShadowGenerator, {
      size: 1024,
      forceBackFacesOnly: true,
    });

    const meshEntity = world.createEntity();
    meshEntity.addComponent(Parent).addComponent(Box);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;

    expect(scene.lights).toHaveLength(1);

    const light = scene.lights[0] as BabylonDirectionalLight;
    expect(light).toBeInstanceOf(BabylonDirectionalLight);

    const shadowGenerator = light.getShadowGenerator() as unknown as ShadowGenerator;
    expect(shadowGenerator.size).toBe(1024);
    expect(shadowGenerator.forceBackFacesOnly).toBeTrue();
    expect(shadowGenerator.darkness).toBe(0); // make sure default values are preserved
  });

  it('can update shadow generator', function () {
    const { world, rootEntity } = setupWorld();

    const lightEntity = world.createEntity();
    lightEntity.addComponent(Parent).addComponent(DirectionalLight).addComponent(ShadowGenerator);

    const meshEntity = world.createEntity();
    meshEntity.addComponent(Parent).addComponent(Box);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;
    const component = lightEntity.getMutableComponent(ShadowGenerator)!;
    component.size = 1024;
    component.forceBackFacesOnly = true;

    world.execute(0, 0);

    expect(scene.lights).toHaveLength(1);

    const light = scene.lights[0] as BabylonDirectionalLight;
    const shadowGenerator = light.getShadowGenerator() as unknown as ShadowGenerator;
    expect(shadowGenerator.size).toBe(1024);
    expect(shadowGenerator.forceBackFacesOnly).toBeTrue();
    expect(shadowGenerator.darkness).toBe(0); // make sure default values are preserved
  });

  it('can remove shadow generator', function () {
    const { world, rootEntity } = setupWorld();

    const lightEntity = world.createEntity();
    lightEntity.addComponent(Parent).addComponent(DirectionalLight).addComponent(ShadowGenerator);

    const meshEntity = world.createEntity();
    meshEntity.addComponent(Parent).addComponent(Box);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;

    lightEntity.removeComponent(ShadowGenerator);
    world.execute(0, 0);

    const light = scene.lights[0] as BabylonDirectionalLight;
    expect(light.getShadowGenerator()).toBeNull();
  });
});
