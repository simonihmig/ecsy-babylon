import { Entity, System } from 'ecsy';
import { BabylonCore } from '../../components';
import World from '../../world';

export default class SystemWithCore extends System<Entity> {
  world!: World;
  core?: BabylonCore;

  execute(): void {
    if (this.queries.core.added?.length) {
      if (this.queries.core.added.length > 1) {
        throw new Error('More than 1 core has been added.');
      }

      this.core = this.queries.core.added[0].getComponent(BabylonCore);
    }
  }

  // this needs to run after the other queries have run in the systems that extend from this
  afterExecute(): void {
    if (this.queries.core.removed?.length) {
      this.core = undefined;
    }
  }
}

export const queries = {
  core: {
    components: [BabylonCore],
    listen: {
      added: true,
      removed: true,
    },
  },
};

SystemWithCore.queries = queries;
