import { ArcRotateCamera, BabylonCore, Parent } from '../src/components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Camera } from '@babylonjs/core/Cameras/camera';
import setupWorld from './helpers/setup-world';

describe('camera system', function () {
  it('works with default camera', function () {
    const { world, rootEntity } = setupWorld();

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.activeCamera).toBeInstanceOf(Camera);
    expect(scene.cameras).toHaveLength(1);
  });

  it('can add arc-rotate camera', function () {
    const { world, rootEntity } = setupWorld();

    const cameraEntity = world.createEntity();
    cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.activeCamera).toBeInstanceOf(BabylonArcRotateCamera);
    expect(scene.cameras).toHaveLength(2);

    const camera = scene.activeCamera as BabylonArcRotateCamera;
    expect(camera.alpha).toEqual(0);
    expect(camera.beta).toEqual(0);
    expect(camera.radius).toEqual(10);
    expect(camera.lowerAlphaLimit).toBeNull();
    expect(camera.lowerBetaLimit).toBeNull();
    expect(camera.lowerRadiusLimit).toBeNull();
    expect(camera.upperAlphaLimit).toBeNull();
    expect(camera.upperBetaLimit).toBeNull();
    expect(camera.upperRadiusLimit).toBeNull();
  });

  it('can add arc-rotate camera with custom arguments', function () {
    const { world, rootEntity } = setupWorld();

    const cameraEntity = world.createEntity();
    cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera, {
      alpha: 0.5,
      beta: 0,
      radius: 12,
      lowerAlphaLimit: -1,
      lowerBetaLimit: -0.1,
      lowerRadiusLimit: 5,
      upperAlphaLimit: 1,
      upperBetaLimit: 0.1,
      upperRadiusLimit: 15,
    });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.activeCamera).toBeInstanceOf(BabylonArcRotateCamera);

    const camera = scene.activeCamera as BabylonArcRotateCamera;
    expect(camera.alpha).toEqual(0.5);
    expect(camera.beta).toEqual(0);
    expect(camera.radius).toEqual(12);
    expect(camera.lowerAlphaLimit).toEqual(-1);
    expect(camera.lowerBetaLimit).toEqual(-0.1);
    expect(camera.lowerRadiusLimit).toEqual(5);
    expect(camera.upperAlphaLimit).toEqual(1);
    expect(camera.upperBetaLimit).toEqual(0.1);
    expect(camera.upperRadiusLimit).toEqual(15);
  });

  it('can update arc-rotate camera', function () {
    const { world, rootEntity } = setupWorld();

    const cameraEntity = world.createEntity();
    cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);

    expect(scene.activeCamera).toBeInstanceOf(BabylonArcRotateCamera);

    const camera = scene.activeCamera as BabylonArcRotateCamera;

    const component = cameraEntity.getMutableComponent(ArcRotateCamera);
    Object.assign(component, {
      alpha: 0.5,
      beta: 0,
      radius: 12,
      lowerAlphaLimit: -1,
      lowerBetaLimit: -0.1,
      lowerRadiusLimit: 5,
      upperAlphaLimit: 1,
      upperBetaLimit: 0.1,
      upperRadiusLimit: 15,
    });

    world.execute(0, 0);

    expect(camera.alpha).toEqual(0.5);
    expect(camera.beta).toEqual(0);
    expect(camera.radius).toEqual(12);
    expect(camera.lowerAlphaLimit).toEqual(-1);
    expect(camera.lowerBetaLimit).toEqual(-0.1);
    expect(camera.lowerRadiusLimit).toEqual(5);
    expect(camera.upperAlphaLimit).toEqual(1);
    expect(camera.upperBetaLimit).toEqual(0.1);
    expect(camera.upperRadiusLimit).toEqual(15);
  });

  it('can remove arc-rotate camera', function () {
    const { world, rootEntity } = setupWorld();

    const cameraEntity = world.createEntity();
    cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore);
    const camera = scene.activeCamera;

    expect(camera).toBeInstanceOf(BabylonArcRotateCamera);

    cameraEntity.remove();
    world.execute(0, 0);

    expect(scene.activeCamera).toBeInstanceOf(Camera);
    expect(scene.activeCamera).not.toEqual(camera);
    expect(scene.cameras).toHaveLength(1);
  });

  it('throws without parent component', function () {
    const { world } = setupWorld();

    const cameraEntity = world.createEntity();
    cameraEntity.addComponent(ArcRotateCamera);

    expect(() => world.execute(0, 0)).toThrow();
  });
});
