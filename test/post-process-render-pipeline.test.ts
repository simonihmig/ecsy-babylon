import {
  ArcRotateCamera,
  BabylonCore,
  DefaultRenderingPipeline,
  Parent,
  PostProcessRenderPipeline,
  SsaoRenderingPipeline,
} from '../src/components';
import setupWorld from './helpers/setup-world';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import { BlackAndWhitePostProcess as BabylonBlackAndWhitePostProcess } from '@babylonjs/core/PostProcesses/blackAndWhitePostProcess';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { PostProcessRenderPipeline as BabylonPostProcessRenderPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderPipeline';
import { PostProcessRenderEffect as BabylonPostProcessRenderEffect } from '@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderEffect';
import { SSAORenderingPipeline as BabylonSSAORenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline';
import { DefaultRenderingPipeline as BabylonDefaultRenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline';
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

  describe('builders', function () {
    describe('default', function () {
      it('can add post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(DefaultRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonDefaultRenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonDefaultRenderingPipeline);
        expect(pp.name).toEqual('defaultPipeline');
        expect(pp.sharpenEnabled).toBeFalse();
        expect(pp.bloomEnabled).toBeFalse();
        expect(pp.bloomKernel).toEqual(64);
        expect(pp.imageProcessingEnabled).toBeTrue();
        expect(pp.imageProcessing.contrast).toEqual(1);
        expect(pp.imageProcessing.colorGradingEnabled).toBeFalse();

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
      });

      it('can add post-process with custom properties', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity
          .addComponent(Parent)
          .addComponent(ArcRotateCamera)
          .addComponent(DefaultRenderingPipeline, {
            name: 'test',
            sharpenEnabled: true,
            bloomEnabled: true,
            bloomKernel: 32,
            imageProcessing: {
              contrast: 0.5,
              colorGradingEnabled: true,
            },
          });

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonDefaultRenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonDefaultRenderingPipeline);
        expect(pp.name).toEqual('test');
        expect(pp.sharpenEnabled).toBeTrue();
        expect(pp.bloomEnabled).toBeTrue();
        expect(pp.bloomKernel).toEqual(32);
        expect(pp.imageProcessingEnabled).toBeTrue();
        expect(pp.imageProcessing.contrast).toEqual(0.5);
        expect(pp.imageProcessing.colorGradingEnabled).toBeTrue();

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        // expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can update post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(DefaultRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
        const c = cameraEntity.getMutableComponent(DefaultRenderingPipeline);
        Object.assign(c, {
          sharpenEnabled: true,
          bloomEnabled: true,
          bloomKernel: 32,
          imageProcessing: {
            contrast: 0.5,
            colorGradingEnabled: true,
          },
        });

        world.execute(0, 0);

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonDefaultRenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonDefaultRenderingPipeline);
        expect(pp.sharpenEnabled).toBeTrue();
        expect(pp.bloomEnabled).toBeTrue();
        expect(pp.bloomKernel).toEqual(32);
        expect(pp.imageProcessingEnabled).toBeTrue();
        expect(pp.imageProcessing.contrast).toEqual(0.5);
        expect(pp.imageProcessing.colorGradingEnabled).toBeTrue();

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        // expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can remove post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(DefaultRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
        cameraEntity.removeComponent(DefaultRenderingPipeline);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });
    });

    // we cannot test this, as this requires canvas support in node. Could install `canvas` package, for now skipping tests...
    describe.skip('ssao', function () {
      it('can add post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(SsaoRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonSSAORenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonSSAORenderingPipeline);
        expect(pp.name).toEqual('ssao');

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
      });

      it('can add post-process with custom properties', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(SsaoRenderingPipeline, {
          name: 'test',
          radius: 0.01,
          area: 0.02,
        });

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonSSAORenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonSSAORenderingPipeline);
        expect(pp.name).toEqual('test');
        expect(pp.radius).toEqual(0.01);
        expect(pp.area).toEqual(0.02);

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        // expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can update post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(SsaoRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
        const c = cameraEntity.getMutableComponent(SsaoRenderingPipeline);
        Object.assign(c, {
          name: 'test',
          radius: 0.01,
          area: 0.02,
        });

        world.execute(0, 0);

        expect(scene.postProcessRenderPipelineManager.supportedPipelines).toHaveLength(1);
        const pp = scene.postProcessRenderPipelineManager.supportedPipelines[0] as BabylonSSAORenderingPipeline;
        expect(pp).toBeInstanceOf(BabylonBlurPostProcess);
        expect(pp.name).toEqual('test');
        expect(pp.radius).toEqual(0.01);
        expect(pp.area).toEqual(0.02);

        // expect(scene.activeCamera?._postProcesses).toHaveLength(1);
        // expect(scene.activeCamera?._postProcesses[0]).toEqual(pp);
      });

      it('can remove post-process', function () {
        const { world, rootEntity } = setupWorld();

        const cameraEntity = world.createEntity();
        cameraEntity.addComponent(Parent).addComponent(ArcRotateCamera).addComponent(SsaoRenderingPipeline);

        world.execute(0, 0);

        const { scene } = rootEntity.getComponent(BabylonCore)!;
        cameraEntity.removeComponent(SsaoRenderingPipeline);

        world.execute(0, 0);

        expect(scene.postProcesses).toHaveLength(0);

        const cameraPPs = scene.activeCamera!._postProcesses.filter(Boolean);
        expect(cameraPPs).toHaveLength(0);
      });
    });
  });
});
