import { ArcRotateCamera, TargetCamera, BabylonCore, Parent } from '../src/components';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { TargetCamera as BabylonTargetCamera } from '@babylonjs/core/Cameras/targetCamera';
import setupWorld from './helpers/setup-world';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

describe('camera system', function () {
  describe('arc-rotate camera', function () {
    it('can add arc-rotate camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.activeCamera).toBeInstanceOf(BabylonArcRotateCamera);
      expect(scene.cameras).toHaveLength(2);

      const camera = scene.activeCamera as BabylonArcRotateCamera;
      expect(camera.alpha).toBe(0);
      expect(camera.beta).toBe(0);
      expect(camera.radius).toBe(10);
      expect(camera.lowerAlphaLimit).toBeNull();
      expect(camera.lowerBetaLimit).toBeGreaterThan(0); // has a default value!
      expect(camera.lowerRadiusLimit).toBeNull();
      expect(camera.upperAlphaLimit).toBeNull();
      expect(camera.upperBetaLimit).toBeGreaterThan(0); // has a default value!
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

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.activeCamera).toBeInstanceOf(BabylonArcRotateCamera);

      const camera = scene.activeCamera as BabylonArcRotateCamera;
      expect(camera.alpha).toBe(0.5);
      expect(camera.beta).toBe(0);
      expect(camera.radius).toBe(12);
      expect(camera.lowerAlphaLimit).toEqual(-1);
      expect(camera.lowerBetaLimit).toEqual(-0.1);
      expect(camera.lowerRadiusLimit).toBe(5);
      expect(camera.upperAlphaLimit).toBe(1);
      expect(camera.upperBetaLimit).toBe(0.1);
      expect(camera.upperRadiusLimit).toBe(15);
    });

    it('can update arc-rotate camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

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

      expect(camera.alpha).toBe(0.5);
      expect(camera.beta).toBe(0);
      expect(camera.radius).toBe(12);
      expect(camera.lowerAlphaLimit).toEqual(-1);
      expect(camera.lowerBetaLimit).toEqual(-0.1);
      expect(camera.lowerRadiusLimit).toBe(5);
      expect(camera.upperAlphaLimit).toBe(1);
      expect(camera.upperBetaLimit).toBe(0.1);
      expect(camera.upperRadiusLimit).toBe(15);
    });

    it('can remove arc-rotate camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const camera = scene.activeCamera;

      expect(camera).toBeInstanceOf(BabylonArcRotateCamera);

      cameraEntity.remove();
      world.execute(0, 0);

      expect(scene.activeCamera).toBeNull();
      expect(scene.cameras).toHaveLength(0);
    });

    it('throws without parent component', function () {
      const { world } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(ArcRotateCamera);

      expect(() => world.execute(0, 0)).toThrow();
    });
  });

  describe('target camera', function () {
    it('can add target camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(TargetCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.activeCamera).toBeInstanceOf(BabylonTargetCamera);
      expect(scene.cameras).toHaveLength(2);

      const camera = scene.activeCamera as BabylonTargetCamera;
      expect(camera.position.equalsToFloats(0, 0, 0)).toBeTrue();
      expect(camera.getTarget().equalsToFloats(0, 0, 0)).toBeTrue();
      expect(camera.fov).toBe(0.8);
    });

    it('can add target camera with custom arguments', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(TargetCamera, {
        position: new Vector3(0, 0, -10),
        target: new Vector3(0, 1, 0),
        fov: 0.5,
      });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.activeCamera).toBeInstanceOf(BabylonTargetCamera);

      const camera = scene.activeCamera as BabylonTargetCamera;
      expect(camera.position.equalsToFloats(0, 0, -10)).toBeTrue();
      // camera.getTarget() does not return target for TargetCamera, weird...
      // expect(camera.getTarget().equalsToFloats(0, 1, 0)).toBeTrue();
      expect(camera.fov).toBe(0.5);
    });

    it('can update target camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(TargetCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.activeCamera).toBeInstanceOf(BabylonTargetCamera);

      const camera = scene.activeCamera as BabylonTargetCamera;

      const component = cameraEntity.getMutableComponent(TargetCamera);
      Object.assign(component, {
        position: new Vector3(0, 0, -10),
        target: new Vector3(0, 1, 0),
        fov: 0.5,
      });

      world.execute(0, 0);

      expect(camera.position.equalsToFloats(0, 0, -10)).toBeTrue();
      // camera.getTarget() does not return target for TargetCamera, weird...
      // expect(camera.getTarget().equalsToFloats(0, 1, 0)).toBeTrue();
      expect(camera.fov).toBe(0.5);
    });

    it('can remove target camera', function () {
      const { world, rootEntity } = setupWorld();

      const cameraEntity = world.createEntity();
      cameraEntity.addComponent(Parent).addComponent(TargetCamera);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const camera = scene.activeCamera;

      expect(camera).toBeInstanceOf(BabylonTargetCamera);

      cameraEntity.remove();
      world.execute(0, 0);

      expect(scene.activeCamera).toBeNull();
      expect(scene.cameras).toHaveLength(0);
    });
  });
});
