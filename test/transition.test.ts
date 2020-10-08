import {
  ArcRotateCamera,
  BabylonCore,
  Box,
  DirectionalLight,
  Parent,
  PbrMaterial,
  Position,
  Rotation,
  Scale,
  Transitions,
} from '../src/components';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import setupWorld from './helpers/setup-world';
import { wait } from './helpers/wait';
import { DirectionalLight as BabylonDirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { PBRMaterial as BabylonPbrMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';

describe('transform system', function () {
  describe('general', function () {
    it('interpolates values over time', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 200,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);

      await wait(100);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
    });

    it('uses transition multiple times', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 200,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      let component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);

      await wait(100);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);

      component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(-1, 0, 1);

      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);

      await wait(100);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(-1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);

      await wait(130);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(-1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(1);
    });

    it('support multiple independent transitions', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 200,
            },
            {
              property: 'transform.scaling',
              duration: 500,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() })
        .addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const position = entity.getMutableComponent(Position)!;
      position.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(100);
      const scale = entity.getMutableComponent(Scale)!;
      scale.value.x = 2;

      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeGreaterThan(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(300);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeGreaterThan(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(400);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);
    });

    it('support transitions on different Babylon instances', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 100,
            },
            {
              property: 'material.roughness',
              duration: 100,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(PbrMaterial, {
          roughness: 0,
        })
        .addComponent(Position, { value: Vector3.Zero() })
        .addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const position = entity.getMutableComponent(Position)!;
      position.value = new Vector3(1, 2, 3);

      const mat = entity.getMutableComponent(PbrMaterial)!;
      mat.roughness = 1;

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      const mesh = scene.meshes[0];
      const material = mesh.material as BabylonPbrMaterial;
      mesh.computeWorldMatrix(true);
      expect(mesh.getWorldMatrix().getTranslation().x).toEqual(0);
      expect(mesh.getWorldMatrix().getTranslation().y).toEqual(0);
      expect(mesh.getWorldMatrix().getTranslation().z).toEqual(0);
      expect(material.roughness).toEqual(0);

      await wait(50);
      const scale = entity.getMutableComponent(Scale)!;
      scale.value.x = 2;

      mesh.computeWorldMatrix(true);
      expect(mesh.getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(mesh.getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(mesh.getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(mesh.getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(mesh.getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(mesh.getWorldMatrix().getTranslation().z).toBeLessThan(3);
      expect(material.roughness).toBeGreaterThan(0);
      expect(material.roughness).toBeLessThan(1);

      await wait(100);
      mesh.computeWorldMatrix(true);
      expect(mesh.getWorldMatrix().getTranslation().x).toEqual(1);
      expect(mesh.getWorldMatrix().getTranslation().y).toEqual(2);
      expect(mesh.getWorldMatrix().getTranslation().z).toEqual(3);
      expect(material.roughness).toEqual(1);
    });

    it('changes without matching transition are applied immediately', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 100,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() })
        .addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const position = entity.getMutableComponent(Position)!;
      position.value = new Vector3(1, 2, 3);
      const scale = entity.getMutableComponent(Scale)!;
      scale.value.x = 2;

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);
    });

    it('duration of zero applies value immediately', function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 0,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
    });

    it('can update transition setting', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 50,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const transitionComponent = entity.getMutableComponent(Transitions)!;
      transitionComponent.value[0] = {
        property: 'transform.position',
        duration: 200,
      };

      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);

      await wait(100);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
    });

    it('can remove all transitions', function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 50,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      entity.removeComponent(Transitions);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
    });

    it('can remove single transition', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 200,
            },
            {
              property: 'transform.scaling',
              duration: 500,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() })
        .addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;

      const transitionComponent = entity.getMutableComponent(Transitions)!;
      transitionComponent.value = transitionComponent.value.slice(0, 1);

      const position = entity.getMutableComponent(Position)!;
      position.value = new Vector3(1, 2, 3);

      const scale = entity.getMutableComponent(Scale)!;
      scale.value.x = 2;

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(100);

      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(120);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);
    });
  });

  describe('transform', function () {
    it('can transition position', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.position',
              duration: 200,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Position, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Position)!;
      component.value = new Vector3(1, 2, 3);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);

      await wait(250);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
    });

    it('can transition rotation', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.rotation',
              duration: 200,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Rotation, { value: Vector3.Zero() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Rotation)!;
      component.value = new Vector3(0, Math.PI, 0);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(1);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);

      await wait(250);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(-1);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
      expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);
    });

    it('can transition scale', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'transform.scaling',
              duration: 200,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(Scale, { value: Vector3.One() });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(Scale)!;
      component.value = new Vector3(2, 1, 1);

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);
      scene.meshes[0].computeWorldMatrix(true);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(1);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

      await wait(250);
      expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
      expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
      expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);
    });
  });
  describe('light', function () {
    it('can transition direction', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'light.direction',
              duration: 100,
            },
          ],
        })
        .addComponent(DirectionalLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(DirectionalLight)!;
      component.direction = new Vector3(1, 0, 0);

      expect(scene.lights).toHaveLength(1);
      const light = scene.lights[0] as BabylonDirectionalLight;
      expect(light.direction.equalsToFloats(0, -1, 0)).toBeTrue();

      await wait(50);
      expect(light.direction.x).toBeGreaterThan(0);
      expect(light.direction.x).toBeLessThan(1);
      expect(light.direction.y).toBeGreaterThan(-1);
      expect(light.direction.y).toBeLessThan(1);
      expect(light.direction.z).toEqual(0);

      await wait(100);
      expect(light.direction.equalsToFloats(1, 0, 0)).toBeTrue();
    });

    it('can transition intensity', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'light.intensity',
              duration: 100,
            },
          ],
        })
        .addComponent(DirectionalLight);

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(DirectionalLight)!;
      component.intensity = 0;

      expect(scene.lights).toHaveLength(1);
      const light = scene.lights[0] as BabylonDirectionalLight;
      expect(light.intensity).toEqual(1);

      await wait(50);
      expect(light.intensity).toBeGreaterThan(0);
      expect(light.intensity).toBeLessThan(1);

      await wait(100);
      expect(light.intensity).toEqual(0);
    });
  });
  describe('material', function () {
    it('can transition color', async function () {
      const { world, rootEntity } = setupWorld();

      // we need a camera to trigger the render loop needed for animations
      world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Transitions, {
          value: [
            {
              property: 'material.albedoColor',
              duration: 100,
            },
          ],
        })
        .addComponent(Box)
        .addComponent(PbrMaterial, {
          albedoColor: new Color3(1, 0, 0),
        });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore)!;
      const component = entity.getMutableComponent(PbrMaterial)!;
      component.albedoColor = new Color3(0, 1, 0);

      expect(scene.meshes).toHaveLength(1);
      const material = scene.meshes[0].material as BabylonPbrMaterial;
      expect(material.albedoColor.equalsFloats(1, 0, 0)).toBeTrue();

      await wait(50);
      expect(material.albedoColor.r).toBeGreaterThan(0);
      expect(material.albedoColor.r).toBeLessThan(1);
      expect(material.albedoColor.g).toBeGreaterThan(0);
      expect(material.albedoColor.g).toBeLessThan(1);
      expect(material.albedoColor.b).toEqual(0);

      await wait(100);
      expect(material.albedoColor.equalsFloats(0, 1, 0)).toBeTrue();
    });
  });
});
