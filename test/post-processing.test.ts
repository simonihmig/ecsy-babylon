import {
  ArcRotateCamera,
  BlackAndWhitePostProcess,
  BlurPostProcess,
  MotionBlurPostProcess,
  Parent,
  PostProcess,
} from '../src/components';
import setupWorld from './helpers/setup-world';
import { PassPostProcess } from '@babylonjs/core/PostProcesses/passPostProcess';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import { MotionBlurPostProcess as BabylonMotionBlurPostProcess } from '@babylonjs/core/PostProcesses/motionBlurPostProcess';
import { BlackAndWhitePostProcess as BabylonBlackAndWhitePostProcess } from '@babylonjs/core/PostProcesses/blackAndWhitePostProcess';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';

describe('post-processing system', function () {
  describe('post-process', function () {
    it('can add postprocessing instances', function () {
      const { world, engine, scene } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(1);
      expect(scene.postProcesses[0]).toEqual(pp);

      expect(scene.activeCamera?._postProcesses).toHaveLength(1);
      expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
    });

    it('can add another postprocessing instance', function () {
      const { world, engine, scene } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      const component = cameraEntity.getMutableComponent(PostProcess)!;
      const pp2 = new PassPostProcess('pass2', 1.0, null, undefined, engine);
      component.value = [pp, pp2];

      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(2);
      expect(scene.postProcesses[0]).toEqual(pp);
      expect(scene.postProcesses[1]).toEqual(pp2);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
      expect(cameraPPs).toHaveLength(2);
      expect(cameraPPs[0]).toEqual(pp);
      expect(cameraPPs[1]).toEqual(pp2);
    });

    it('can remove a postprocessing instance', function () {
      const { world, engine, scene } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);
      const pp2 = new PassPostProcess('pass2', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp, pp2] });

      world.execute(0, 0);

      const component = cameraEntity.getMutableComponent(PostProcess)!;
      component.value = [pp];

      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(1);
      expect(scene.postProcesses[0]).toEqual(pp);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);

      expect(cameraPPs).toHaveLength(1);
      expect(cameraPPs[0]).toEqual(pp);
    });

    it('can remove postprocessing instances', function () {
      const { world, engine, scene } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      cameraEntity.removeComponent(PostProcess);
      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(0);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
      expect(cameraPPs).toHaveLength(0);
    });

    it('can remove the whole entity', function () {
      const { world, engine, scene } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      cameraEntity.remove();
      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(0);

      expect(scene.activeCamera).toBeNull();
    });
  });

  describe('builders', function () {
    describe('blur', function () {
      it('can add post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toBe('blur');
        expect(pp.kernel).toBe(1);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add post-process with custom properties', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity
          .addComponent(Parent)
          .addComponent(ArcRotateCamera)
          .addComponent(BlurPostProcess, {
            name: 'test',
            kernel: 3,
            direction: new Vector2(2, 0),
          });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toBe('test');
        expect(pp.kernel).toBe(3);
        expect(pp.direction.x).toBe(2);
        expect(pp.direction.y).toBe(0);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can update post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        const c = cameraEntity.getMutableComponent(BlurPostProcess);
        Object.assign(c, {
          name: 'test',
          kernel: 3,
          direction: new Vector2(2, 0),
        });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toBe('test');
        expect(pp.kernel).toBe(3);
        expect(pp.direction.x).toBe(2);
        expect(pp.direction.y).toBe(0);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can remove post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        cameraEntity.removeComponent(BlurPostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });

      it('can remove the whole entity', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        cameraEntity.remove();

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        expect(scene.activeCamera).toBeNull();
      });
    });
    describe('black-and-white', function () {
      it('can add post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlackAndWhitePostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlackAndWhitePostProcess;
        expect(pp).toBeInstanceOf(BabylonBlackAndWhitePostProcess);
        expect(pp.name).toBe('black-and-white');

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add post-process with custom properties', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlackAndWhitePostProcess, {
          name: 'test',
        });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlackAndWhitePostProcess;
        expect(pp).toBeInstanceOf(BabylonBlackAndWhitePostProcess);
        expect(pp.name).toBe('test');

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can update post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlackAndWhitePostProcess);

        world.execute(0, 0);

        const c = cameraEntity.getMutableComponent(BlackAndWhitePostProcess);
        Object.assign(c, {
          name: 'test',
        });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlackAndWhitePostProcess;
        expect(pp).toBeInstanceOf(BabylonBlackAndWhitePostProcess);
        expect(pp.name).toBe('test');

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can remove post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlackAndWhitePostProcess);

        world.execute(0, 0);

        cameraEntity.removeComponent(BlackAndWhitePostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });
    });
    // Seems starting with babylon.js 4.2 we cannot test this with an NullEngine (having webGLVersion=1)
    describe.skip('motion-blur', function () {
      it('can add post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(MotionBlurPostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonMotionBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonMotionBlurPostProcess);
        expect(pp.name).toBe('motion-blur');
        expect(pp.motionStrength).toBe(1);
        expect(pp.motionBlurSamples).toBe(32);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add post-process with custom properties', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(MotionBlurPostProcess, {
          name: 'test',
          motionBlurSamples: 16,
          motionStrength: 2,
        });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonMotionBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonMotionBlurPostProcess);
        expect(pp.name).toBe('test');
        expect(pp.motionStrength).toBe(2);
        expect(pp.motionBlurSamples).toBe(16);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can update post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(MotionBlurPostProcess);

        world.execute(0, 0);

        const c = cameraEntity.getMutableComponent(MotionBlurPostProcess);
        Object.assign(c, {
          name: 'test',
          motionBlurSamples: 16,
          motionStrength: 2,
        });

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonMotionBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonMotionBlurPostProcess);
        expect(pp.name).toBe('test');
        expect(pp.motionStrength).toBe(2);
        expect(pp.motionBlurSamples).toBe(16);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can remove post-process', function () {
        const { world, scene } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(MotionBlurPostProcess);

        world.execute(0, 0);

        cameraEntity.removeComponent(MotionBlurPostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });
    });
  });
});
