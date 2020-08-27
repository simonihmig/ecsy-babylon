import { Entity } from 'ecsy';
import { BlurPostProcess, PostProcess } from '../../components';
import { PostProcess as BabylonPostProcess } from '@babylonjs/core/PostProcesses/postProcess';
import { BlurPostProcess as BabylonBlurPostProcess } from '@babylonjs/core/PostProcesses/blurPostProcess';
import SystemWithCore, { queries } from '../../-private/SystemWithCore';
import assert from '../../-private/utils/assert';
import assign from '../../-private/utils/assign';

export default class BlurPostProcessSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.postprocess.added?.forEach((e: Entity) => this.setup(e));
    this.queries.postprocess.changed?.forEach((e: Entity) => this.update(e));
    this.queries.postprocess.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    const c = entity.getMutableComponent(BlurPostProcess)!;

    const blur = new BabylonBlurPostProcess(
      c.name,
      c.direction,
      c.kernel,
      c.options,
      null,
      c.samplingMode,
      this.core?.engine
    );

    this.addPostProcess(entity, blur);
  }

  update(entity: Entity): void {
    const c = entity.getComponent(BlurPostProcess)!;
    const ppComponent = entity.getComponent(PostProcess);
    assert('No post-process component found', ppComponent?.value);
    const pp = ppComponent.value.find((_pp) => _pp instanceof BabylonBlurPostProcess);
    assert('No post-process instance found', pp);

    assign(pp, c);
  }

  remove(entity: Entity): void {
    this.removePostProcess(entity, BabylonBlurPostProcess);
  }

  private addPostProcess(entity: Entity, pp: BabylonPostProcess): void {
    const ppComponent = entity.getMutableComponent(PostProcess);
    if (ppComponent) {
      assert('Existing post-process component has invalid value', ppComponent.value);
      ppComponent.value = [...ppComponent.value, pp];
    } else {
      entity.addComponent(PostProcess, { value: [pp] });
    }
  }

  private removePostProcess(entity: Entity, ppConstructor: Function): void {
    const ppComponent = entity.getComponent(PostProcess);
    assert('No post-process component found', ppComponent?.value);

    const pps = ppComponent.value.filter((pp) => !(pp instanceof ppConstructor));
    assert('No post-process instance found to remove', ppComponent.value.length > pps.length);

    if (pps.length > 0) {
      const _ppComponent = entity.getMutableComponent(PostProcess)!;
      _ppComponent.value = [...pps];
    } else {
      entity.removeComponent(PostProcess);
    }
  }

  static queries = {
    ...queries,
    postprocess: {
      components: [BlurPostProcess],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
