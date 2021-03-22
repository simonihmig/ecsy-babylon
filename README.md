# ecsy-babylon

[![CI](https://github.com/kaliber5/ecsy-babylon/actions/workflows/ci.yml/badge.svg)](https://github.com/kaliber5/ecsy-babylon/actions/workflows/ci.yml)

ecsy-babylon is an experimental implementation of [ECSY](https://ecsy.io/) in [babylon.js](https://www.babylonjs.com/).

## Example

In the spirit of learning-by-doing lets walk through how a simple babylon app would be converted to ecsy-babylon.

### Vanilla babylon.js

Consider the following code:

```ts
	// initialize the core elements
	const canvas = document.getElementsByTagName("canvas")[0];
	const engine = new BABYLON.Engine(canvas, true);
	const scene = new BABYLON.Scene(engine);

	// create objects to inhabit the scene
	const camera = new BABYLON.ArcRotateCamera("camera", 
		-Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", 
		new BABYLON.Vector3(0, 1, 0), scene);
	const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);


	// set variables
	const freq = Math.PI; //0.5 Hz
	const amp = 0.1;

	// apply behaviour on each frame
	engine.runRenderLoop(() => {
		box.position.y = Math.sin(Date.now() * 0.001 * freq) * amp;
		scene.render();
	});

```

We create a scene and then a box to bob up and down within it. At the moment our app is fairly simple but as it expands we will need to consider how to manage the increasing complexity.

### ecsy-babylon

ECS design will help us to write more organized apps by introducing some strict rules as to how they shall be structured:
1. Conceptual elements of the app are organized into **entities**
2. All game state and data are fields of **components**
3. All behaviour exists in **systems**

For more information please check out the [ECSY architecture docs](https://ecsy.io/docs/#/manual/Architecture).

In keeping with rule 1, lets use ecsy-babylon to convert our existing objects to components on entities.

```ts
import {
  ArcRotateCamera,
  BabylonCore,
  Box,
  components,
  HemisphericLight,
  Parent,
  Position,
  systems,
  World,
} from 'ecsy-babylon';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Component, Types, System } from 'ecsy';

// ...

const world = new World();
components.forEach((component) => world.registerComponent(component));
systems.forEach((system) => world.registerSystem(system));

world.registerComponent(BoxMoveComponent).registerSystem(BoxMoveSystem);

world.createEntity('singleton').addComponent(BabylonCore, {
  world,
  canvas: document.getElementsByTagName('canvas')[0],
});

world
  .createEntity('camera')
  .addComponent(Parent)
  .addComponent(ArcRotateCamera, {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.5,
    radius: 3,
    target: new Vector3(0, 0, 0),
  });

world
  .createEntity('light')
  .addComponent(Parent)
  .addComponent(HemisphericLight, {
    direction: new Vector3(0, 1, 0),
  });

world
  .createEntity('box')
  .addComponent(Parent)
  .addComponent(Position)
  .addComponent(Box)
  .addComponent(BoxMoveComponent, {
    freq: Math.PI, // 0.5 Hz
    amp: 0.1,
  });

world.execute(0, 0);
```

Now we need to implement our BoxMoveComponent

```ts
class BoxMoveComponent extends Component<BoxMoveComponent>{
	freq!: number
	amp!: number
	static schema = {
		freq: {
			type: Types.Number,
			default: Math.PI * 2
		},
		amp: {
			type: Types.Number,
			default: 1
		}
	}
}
```

Finaly our BoxMoveSystem will manage state

```ts
class BoxMoveSystem extends System {

	execute(): void {
		this.queries.movableBoxes.results.forEach(entity => {
			const boxMove = entity.getComponent(BoxMoveComponent)!;
			const position = entity.getMutableComponent(ecsyBabylon.Position)!
			position.value.y = Math.sin(Date.now() * 0.001 * boxMove.freq) * boxMove.amp;
		})
	}
	static queries = {
		movableBoxes: {
			components: [BoxMoveComponent, ecsyBabylon.Position]
		}
	}
}
```

A couple of notes regarding the above example:
- Every ecsy-babylon app requires a singleton entity with a `BabylonCore` component
- All objects placed in the scene require a `Parent` component

Feel free to check out the demo's complete [source code](demos/hello-world).

## Further Reading
- [ecsy documentation](https://ecsy.io/docs/#/)
