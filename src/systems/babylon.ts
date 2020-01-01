import { Entity, System } from 'ecsy';
import { BabylonCore } from '../components';
import { Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core';

export default class BabylonSystem extends System {
  listener?: any;

  execute() {
    this.queries.core.added.forEach((e: Entity) => this.setup(e));
    this.queries.core.removed.forEach((e: Entity) => this.remove(e));
  }

  setup(entity: Entity) {
    const core = entity.getMutableComponent(BabylonCore);

    core.engine = core.engine || new Engine(core.canvas, true, {}, false);
    core.scene = new Scene(core.engine);

    core.defaultCamera = new FreeCamera('defaultCamera', new Vector3(0, 0, -10), core.scene);
    core.defaultCamera.attachControl(core.canvas, false);

    this.listener = function(this: { engine: Engine }): void {
      this.engine.resize();
    }.bind({ engine: core.engine });

    window.addEventListener('resize', this.listener);

    const startTime = window.performance.now();
    core.engine.runRenderLoop((): void => {
      if (!core.engine || !core.scene) {
        throw new Error('Engine and/or Scene not found');
      }

      core.world.execute(core.engine.getDeltaTime(), window.performance.now() - startTime);

      // only render if there is an active camera
      if (core.scene.activeCamera) {
        core.scene.render();
      }
    });
  }

  remove(entity: Entity) {
    window.removeEventListener('resize', this.listener);

    const core = entity.getRemovedComponent(BabylonCore);

    core.engine.stopRenderLoop();
    core.scene.dispose();
    core.engine.dispose();
  }

  static queries = {
    core: {
      components: [BabylonCore],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
