import { ArcRotateCamera, BabylonCore, Parent, PostProcess, BlurPostProcess } from '../src/components';
import setupWorld from './helpers/setup-world';
import { PassPostProcess } from '@babylonjs/core/PostProcesses/passPostProcess';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';

describe('post-processing system', function () {
  describe('post-process', function () {
    it('can add postprocessing instances', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.postProcesses).toHaveLength(1);
      expect(scene.postProcesses[0]).toEqual(pp);

      expect(scene.activeCamera?._postProcesses).toHaveLength(1);
      expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
    });

    it('can add another postprocessing instance', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

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
      const { world, rootEntity, engine } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);
      const pp2 = new PassPostProcess('pass2', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp, pp2] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

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
      const { world, rootEntity, engine } = setupWorld();

      const pp = new PassPostProcess('pass', 1.0, null, undefined, engine);

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcess, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      cameraEntity.removeComponent(PostProcess);
      world.execute(0, 0);

      expect(scene.postProcesses).toHaveLength(0);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
      expect(cameraPPs).toHaveLength(0);
    });
  });

  describe('builders', function () {
    describe('blur', function () {
      it('can add blur post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toEqual('blur');
        expect(pp.kernel).toEqual(1);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add blur post-process with custom properties', function () {
        const { world, rootEntity } = setupWorld();

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

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcesses).toHaveLength(1);
        const pp = scene.postProcesses[0] as BabylonBlurPostProcess;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toEqual('test');
        expect(pp.kernel).toEqual(3);
        expect(pp.direction.x).toEqual(2);
        expect(pp.direction.y).toEqual(0);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add update blur post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
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
        expect(pp.name).toEqual('test');
        expect(pp.kernel).toEqual(3);
        expect(pp.direction.x).toEqual(2);
        expect(pp.direction.y).toEqual(0);

        expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can add remove blur post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(BlurPostProcess);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
        cameraEntity.removeComponent(BlurPostProcess);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });
    });
  });
});
