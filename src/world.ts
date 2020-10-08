import { World, WorldOptions } from 'ecsy';
import BabylonManager from './-private/babylon-manager';

export default class BabylonWorld extends World {
  babylonManager: BabylonManager;

  constructor(options?: WorldOptions) {
    super(options);

    this.babylonManager = new BabylonManager();
  }
}
