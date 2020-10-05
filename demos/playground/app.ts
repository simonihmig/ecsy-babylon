import {
  ArcRotateCamera,
  BabylonCore,
  Box,
  DefaultRenderingPipeline,
  DirectionalLight,
  Lines,
  Parent,
  PbrMaterial,
  Position,
  Rotation,
  Sphere,
  Transitions,
} from '../../src/components';
import { components, systems, World } from '../../src';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Engine } from '@babylonjs/core/Engines/engine';

const canvas = document.querySelector('canvas');
const fpsEl = document.querySelector('#fps');
if (canvas === null || fpsEl === null) {
  throw new Error('Required DOM elements not found');
}

const frames = Array(30).fill(0);

function afterRender(delta: number, _time: number): void {
  frames.shift();
  frames[frames.length] = 1000 / delta;

  const fps = frames.reduce((total, frame) => total + frame) / frames.length;
  fpsEl!.innerHTML = `${Math.round(fps)}`;
}

const world = new World();
const engine = new Engine(canvas, true, {}, false);
components.forEach((component) => world.registerComponent(component));
systems.forEach((system) => world.registerSystem(system));

const entity = world.createEntity();

entity.addComponent(BabylonCore, {
  world,
  canvas,
  engine,
  afterRender,
});

world
  .createEntity()
  .addComponent(Parent)
  .addComponent(ArcRotateCamera, { alpha: Math.PI * 1.5, beta: 1.3 })
  .addComponent(DefaultRenderingPipeline, {
    depthOfFieldEnabled: true,
    fxaaEnabled: true,
    depthOfField: {
      focusDistance: 5000,
      focalLength: 150,
    },
  });

world
  .createEntity()
  .addComponent(Parent)
  .addComponent(DirectionalLight, { direction: new Vector3(5, -7, 10) });

const parentEntity = world.createEntity().addComponent(Parent);

world
  .createEntity()
  .addComponent(Parent, { value: parentEntity })
  .addComponent(Box)
  .addComponent(PbrMaterial, {
    albedoColor: new Color3(1, 0, 0),
    ambientColor: new Color3(1, 0, 0),
    metallic: 0,
    roughness: 0,
  })
  .addComponent(Position, { value: new Vector3(-2, 0, 0) })
  .addComponent(Rotation, { value: new Vector3(0, 45, 0) });

const sphere = world
  .createEntity()
  .addComponent(Parent)
  .addComponent(Sphere, { diameter: 1.5 })
  .addComponent(PbrMaterial, {
    albedoColor: new Color3(0, 1, 0),
    ambientColor: new Color3(0, 1, 0),
    metallic: 0,
    roughness: 0.3,
  })
  .addComponent(Position, { value: new Vector3(-2, 0, 0) })
  .addComponent(Transitions, {
    value: [
      {
        property: 'position',
        frameRate: 30,
        duration: 5000,
      },
    ],
  });

world
  .createEntity()
  .addComponent(Parent)
  .addComponent(Lines, {
    points: [new Vector3(-2, 0, 0), new Vector3(2, 0, 0)],
    color: Color3.Black(),
  });

world.execute(0, 0);

const scene = entity.getComponent(BabylonCore)!.scene;
// @todo can we pass this directly to the component?
scene.clearColor = new Color4(1, 1, 1);
scene.ambientColor = new Color3(0.1, 0.1, 0.1);

const pos = sphere.getMutableComponent(Position)!;
pos.value = new Vector3(2, 0, 0);
