import * as ecsyBabylon from "ecsy-babylon";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Component, Types, System } from "ecsy";


class BoxMoveComponent extends Component<any>{
	freq: number
	amp: number
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

class BoxMoveSystem extends System {

	execute() {
		this.queries.movableBoxes.results.forEach(entity => {
			const boxMove = entity.getComponent(BoxMoveComponent);
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

const world = new ecsyBabylon.World();
ecsyBabylon.components.forEach(component => world.registerComponent(component));
ecsyBabylon.systems.forEach(system => world.registerSystem(system));

world
	.registerComponent(BoxMoveComponent)
	.registerSystem(BoxMoveSystem);

world
	.createEntity("singleton")
	.addComponent(ecsyBabylon.BabylonCore, {
		world,
		canvas: document.getElementsByTagName("canvas")[0],
	});

world
	.createEntity("camera")
	.addComponent(ecsyBabylon.Parent)
	.addComponent(ecsyBabylon.ArcRotateCamera, {
		alpha: -Math.PI / 2,
		beta: Math.PI / 2.5,
		radius: 3,
		target: new Vector3(0, 0, 0)
	});

world
	.createEntity("light")
	.addComponent(ecsyBabylon.Parent)
	.addComponent(ecsyBabylon.HemisphericLight, {
		direction: new Vector3(0, 1, 0)
	});

world
	.createEntity("box")
	.addComponent(ecsyBabylon.Parent)
	.addComponent(ecsyBabylon.Position)
	.addComponent(ecsyBabylon.Box)
	.addComponent(BoxMoveComponent, {
		freq: Math.PI,//0.5 Hz 
		amp: 0.1
	});

world.execute(0, 0);


