import { ArcRotateCamera, BabylonCore, Parent, PostProcess } from '../src/components';
import setupWorld from './helpers/setup-world';
import { PassPostProcess } from '@babylonjs/core/PostProcesses/passPostProcess';

describe('postprocessing system', function () {
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
