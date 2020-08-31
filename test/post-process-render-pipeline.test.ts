import { ArcRotateCamera, BabylonCore, BlurPostProcess, Parent, PostProcessRenderPipeline } from '../src/components';
import setupWorld from './helpers/setup-world';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import { BlackAndWhitePostProcess as BabylonBlackAndWhitePostProcess } from '@babylonjs/core/PostProcesses/blackAndWhitePostProcess';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { PostProcessRenderPipeline as BabylonPostProcessRenderPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderPipeline';
import { PostProcessRenderEffect as BabylonPostProcessRenderEffect } from '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderEffect';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { Engine } from '@babylonjs/core/Engines/engine';

function createPipeline(engine: Engine, name = 'test'): BabylonPostProcessRenderPipeline {
  // Create a standard pipeline
  const pipeline = new BabylonPostProcessRenderPipeline(engine, name);

  // Create post processes
  const blackAndWhite = new BabylonBlackAndWhitePostProcess(
    'bw',
    1.0,
    (null as unknown) as Camera,
    undefined,
    engine,
    false
  );
  const horizontalBlur = new BabylonBlurPostProcess('hb', new Vector2(1.0, 0), 20, 1.0, null, undefined, engine, false);

  // Create effect with multiple post processes and add to pipeline
  const blackAndWhiteThenBlur = new BabylonPostProcessRenderEffect(engine, 'blackAndWhiteThenBlur', function () {
    return [blackAndWhite, horizontalBlur];
  });
  pipeline.addEffect(blackAndWhiteThenBlur);

  return pipeline;
}

describe('post-process-render-pipeline system', function () {
  describe('post-process-render-pipeline', function () {
    it('can add PostProcessRenderPipeline instances', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = createPipeline(engine, 'test');

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcessRenderPipeline, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
      expect(scene.postProcessRenderPipelineManager.supportedPipelines[0]).toEqual(pp);

      expect(scene.activeCamera?._postProcesses).toHaveLength(2);
    });

    it('can add another postprocessing instance', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = createPipeline(engine, 'test');

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcessRenderPipeline, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const component = cameraEntity.getMutableComponent(PostProcessRenderPipeline)!;
      const pp2 = createPipeline(engine, 'test2');
      component.value = [pp, pp2];

      world.execute(0, 0);

      expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(2);
      expect(scene.postProcessRenderPipelineManager.supportedPipelines[0]).toEqual(pp);
      expect(scene.postProcessRenderPipelineManager.supportedPipelines[1]).toEqual(pp2);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
      expect(cameraPPs).toHaveLength(4);
    });

    it('can remove a postprocessing instance', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = createPipeline(engine, 'test');
      const pp2 = createPipeline(engine, 'test2');

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcessRenderPipeline, { value: [pp, pp2] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const component = cameraEntity.getMutableComponent(PostProcessRenderPipeline)!;
      component.value = [pp];

      world.execute(0, 0);

      // expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
      // expect(scene.postProcessRenderPipelineManager.supportedPipelines[0]).toEqual(pp);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);

      expect(cameraPPs).toHaveLength(2);
    });

    it('can remove postprocessing instances', function () {
      const { world, rootEntity, engine } = setupWorld();

      const pp = createPipeline(engine, 'test');

      const cameraEntity = world.createEntity();
      cameraEntity
        .addComponent(Parent)
        .addComponent(ArcRotateCamera)
        .addComponent(PostProcessRenderPipeline, { value: [pp] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      cameraEntity.removeComponent(PostProcessRenderPipeline);
      world.execute(0, 0);

      // expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(0);

      const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
      expect(cameraPPs).toHaveLength(0);
    });
  });

  describe.skip('builders', function () {
    describe('blur', function () {
      it('can add post-process', function () {
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

      it('can add post-process with custom properties', function () {
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

      it('can update post-process', function () {
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

      it('can remove post-process', function () {
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
