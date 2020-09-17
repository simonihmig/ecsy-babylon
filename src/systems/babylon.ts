import { Entity, System } from 'ecsy';
import { BabylonCore } from '../components';
import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';

export default class BabylonSystem extends System {
  listener?: EventListener;

  execute(): void {
    this.queries.core.added?.forEach((e: Entity) => this.setup(e));
    this.queries.core.removed?.forEach((e: Entity) => this.remove(e));
  }

  setup(entity: Entity): void {
    const core = entity.getMutableComponent(BabylonCore)!;

    core.engine = core.engine || new Engine(core.canvas, true, {}, false);
    core.scene = new Scene(core.engine);

    this.listener = function (this: { engine: Engine }): void {
      this.engine.resize();
    }.bind({ engine: core.engine });

    // @todo do we really want to do this here? Or should we delegate the responsibility ot the consumer?
    // For example the canvas might need to even react to resizing the canvas *element*, not just the
    // while window, i.e. we would have to use a ResizeObserver
    window.addEventListener('resize', this.listener);

    const startTime = window.performance.now();
    core.engine.runRenderLoop((): void => {
      if (!core.engine || !core.scene) {
        throw new Error('Engine and/or Scene not found');
      }

      const delta = core.engine.getDeltaTime();
      const time = window.performance.now() - startTime;

      if (core.beforeRender) {
        core.beforeRender(delta, time);
      }
      core.world.execute(delta, time);

      // only render if there is an active camera
      if (core.scene.activeCamera) {
        core.scene.render();
      }

      if (core.afterRender) {
        core.afterRender(delta, time);
      }
    });
  }

  remove(entity: Entity): void {
    if (this.listener) {
      window.removeEventListener('resize', this.listener);
    }

    const core = entity.getRemovedComponent(BabylonCore)!;

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
