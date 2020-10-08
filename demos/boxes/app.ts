import { Entity } from 'ecsy';
import {
  ArcRotateCamera,
  BabylonCore,
  Box,
  DirectionalLight,
  Material,
  Parent,
  Position,
  Rotation,
} from '../../src/components';
import { components, systems, World } from '../../src';
import { NormalMaterial } from '@babylonjs/materials/normal/normalMaterial';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color4 } from '@babylonjs/core/Maths/math.color';

const canvas = document.querySelector('canvas');
const select = document.querySelector('select');
const fpsEl = document.querySelector('#fps');
if (canvas === null || select === null || fpsEl === null) {
  throw new Error('Required DOM elements not found');
}

const boxOptions = {
  size: 2,
};
const boxes: Entity[] = [];
const frames = Array(30).fill(0);

function random(): number {
  return Math.random() * 360;
}

function beforeRender(_delta: number, _time: number): void {
  boxes.forEach((box) => {
    const rotation = box.getMutableComponent(Rotation)!;
    rotation.value.addInPlaceFromFloats(0.5, 0.5, 0.5);
  });
}

function afterRender(delta: number, _time: number): void {
  frames.shift();
  frames[frames.length] = 1000 / delta;

  const fps = frames.reduce((total, frame) => total + frame) / frames.length;
  fpsEl!.innerHTML = `${Math.round(fps)}`;
}

const world = new World();
components.forEach((component) => world.registerComponent(component));
systems.forEach((system) => world.registerSystem(system));

const entity = world.createEntity();

entity.addComponent(BabylonCore, {
  world,
  canvas,
  beforeRender,
  afterRender,
});

world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

world
  .createEntity()
  .addComponent(Parent)
  .addComponent(DirectionalLight, { direction: new Vector3(-5, 0, -10) });

world.execute(0, 0);

const scene = entity.getComponent(BabylonCore)!.scene;
// @todo can we pass this directly to the component?
scene.clearColor = new Color4(1, 1, 1);

const material = new NormalMaterial('normal', scene);

function syncBoxes(): void {
  const count = parseInt(select!.value, 10);
  const diff = boxes.length - count;
  const boxesHaveMore = diff > 0;
  const boxesHaveLess = diff < 0;
  const same = diff === 0;

  if (same) return;

  if (boxesHaveLess) {
    for (let i = 0; i < 0 - diff; i++) {
      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Box, boxOptions)
        .addComponent(Material, { value: material })
        .addComponent(Position, { value: new Vector3(0, 0, 0) }) // @todo why is this required?
        .addComponent(Rotation, { value: new Vector3(random(), random(), random()) });
      boxes.push(entity);
    }
    return;
  }

  if (boxesHaveMore) {
    for (let i = 0; i < diff; i++) {
      const box = boxes.pop();
      box!.remove();
    }
  }
}

syncBoxes();

select.addEventListener('change', syncBoxes);
