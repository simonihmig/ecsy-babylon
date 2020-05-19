import { BabylonCore, Parent, PointLight, DirectionalLight, HemisphericLight } from '../src/components';
import { PointLight as BabylonPointLight } from '@babylonjs/core/Lights/pointLight';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { HemisphericLight as BabylonHemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import setupWorld from './helpers/setup-world';

describe('light system', function () {
  describe('point-light', function () {
    it('can add point-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(PointLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0];
      expect(light).toBeInstanceOf(BabylonPointLight);
      expect(light.intensity).toEqual(1);
    });

    it('can add point-light with custom arguments', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(PointLight, { intensity: 2 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0];
      expect(light).toBeInstanceOf(BabylonPointLight);
      expect(light.intensity).toEqual(2);
    });

    it.skip('can update point-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(PointLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = lightEntity.getMutableComponent(PointLight);
      component.intensity = 2;

      world.execute(0, 0);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0];
      expect(light).toBeInstanceOf(BabylonPointLight);
      expect(light.intensity).toEqual(2);
    });

    it('can remove point-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(PointLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      lightEntity.remove();
      world.execute(0, 0);

      expect(scene.lights).toHaveLength(0);
    });
  });
  describe('directional-light', function () {
    it('can add directional-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(DirectionalLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonDirectionalLight;
      expect(light).toBeInstanceOf(BabylonDirectionalLight);
      expect(light.intensity).toEqual(1);
      expect(light.direction.equalsToFloats(0, -1, 0)).toBeTrue();
    });

    it('can add directional-light with custom arguments', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity
        .addComponent(Parent)
        .addComponent(DirectionalLight, { intensity: 2, direction: new Vector3(1, 0, 0) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonDirectionalLight;
      expect(light).toBeInstanceOf(BabylonDirectionalLight);
      expect(light.intensity).toEqual(2);
      expect(light.direction.equalsToFloats(1, 0, 0)).toBeTrue();
    });

    it.skip('can update directional-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(DirectionalLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = lightEntity.getMutableComponent(DirectionalLight);
      component.intensity = 2;
      component.direction = new Vector3(1, 0, 0);

      world.execute(0, 0);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonDirectionalLight;
      expect(light).toBeInstanceOf(BabylonDirectionalLight);
      expect(light.intensity).toEqual(2);
      expect(light.direction.equalsToFloats(1, 0, 0)).toBeTrue();
    });

    it('can remove directional-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(DirectionalLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      lightEntity.remove();
      world.execute(0, 0);

      expect(scene.lights).toHaveLength(0);
    });
  });
  describe('hemispheric-light', function () {
    it('can add hemispheric-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(HemisphericLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonHemisphericLight;
      expect(light).toBeInstanceOf(BabylonHemisphericLight);
      expect(light.intensity).toEqual(1);
      expect(light.direction.equalsToFloats(0, -1, 0)).toBeTrue();
    });

    it('can add hemispheric-light with custom arguments', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity
        .addComponent(Parent)
        .addComponent(HemisphericLight, { intensity: 2, direction: new Vector3(1, 0, 0) });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonHemisphericLight;
      expect(light).toBeInstanceOf(BabylonHemisphericLight);
      expect(light.intensity).toEqual(2);
      expect(light.direction.equalsToFloats(1, 0, 0)).toBeTrue();
    });

    it.skip('can update hemispheric-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(HemisphericLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = lightEntity.getMutableComponent(HemisphericLight);
      component.intensity = 2;
      component.direction = new Vector3(1, 0, 0);

      world.execute(0, 0);

      expect(scene.lights).toHaveLength(1);

      const light = scene.lights[0] as BabylonHemisphericLight;
      expect(light).toBeInstanceOf(BabylonHemisphericLight);
      expect(light.intensity).toEqual(2);
      expect(light.direction.equalsToFloats(1, 0, 0)).toBeTrue();
    });

    it('can remove hemispheric-light', function () {
      const { world, rootEntity } = setupWorld();

      const lightEntity = world.createEntity();
      lightEntity.addComponent(Parent).addComponent(HemisphericLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      lightEntity.remove();
      world.execute(0, 0);

      expect(scene.lights).toHaveLength(0);
    });
  });
});
