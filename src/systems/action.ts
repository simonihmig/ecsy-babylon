/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Entity } from 'ecsy';
import { Action, Mesh } from '../components';
import { AbstractActionManager, ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import SystemWithCore, { queries } from '../SystemWithCore';
import assert from '../utils/assert';

const TRIGGER = {
  pick: ActionManager.OnPickTrigger,
  doublePick: ActionManager.OnDoublePickTrigger,
  centerPick: ActionManager.OnCenterPickTrigger,
  everyFrame: ActionManager.OnEveryFrameTrigger,
  intersectionEnter: ActionManager.OnIntersectionEnterTrigger,
  intersectionExit: ActionManager.OnIntersectionExitTrigger,
  keyDown: ActionManager.OnKeyDownTrigger,
  keyUp: ActionManager.OnKeyUpTrigger,
  leftPick: ActionManager.OnLeftPickTrigger,
  longPress: ActionManager.OnLongPressTrigger,
  pickDown: ActionManager.OnPickDownTrigger,
  pickOut: ActionManager.OnPickOutTrigger,
  pickUp: ActionManager.OnPickUpTrigger,
  pointerOut: ActionManager.OnPointerOutTrigger,
  pointerOver: ActionManager.OnPointerOverTrigger,
  rightPick: ActionManager.OnRightPickTrigger,
};

export default class ActionSystem extends SystemWithCore {
  execute(): void {
    super.execute();

    this.queries.action.added?.forEach((e: Entity) => this.setup(e));
    this.queries.action.changed?.forEach((e: Entity) => this.setup(e));
    this.queries.action.removed?.forEach((e: Entity) => this.remove(e));

    super.afterExecute();
  }

  setup(entity: Entity): void {
    assert('ActionSystem needs BabylonCoreComponent', this.core);
    const actionComponent = entity.getMutableComponent(Action);

    let actionManager = this.getActionManager(entity);
    if (actionManager === null) {
      const meshComponent = entity.getComponent(Mesh);
      if (!meshComponent?.value) {
        throw new Error('Action component can only be applied to Entities with a mesh');
      }

      actionManager = new ActionManager(this.core.scene);
      const mesh = meshComponent.value;
      mesh.actionManager = actionManager;
    }

    Object.keys(TRIGGER).forEach((triggerName) => {
      if (actionComponent._actions[triggerName]) {
        actionManager!.unregisterAction(actionComponent._actions[triggerName]);
        delete actionComponent._actions[triggerName];
      }

      const fn = actionComponent[triggerName as keyof typeof TRIGGER];
      if (!fn) {
        return;
      }

      const trigger = TRIGGER[triggerName as keyof typeof TRIGGER];
      const action = actionManager!.registerAction(new ExecuteCodeAction(trigger, fn));
      if (action) {
        actionComponent._actions[triggerName] = action;
      }
    });
  }

  remove(entity: Entity): void {
    const meshComponent = entity.getComponent(Mesh);
    if (meshComponent?.value?.actionManager) {
      meshComponent.value.actionManager.dispose();
      meshComponent.value.actionManager = null;
    }
  }

  private getActionManager(entity: Entity): AbstractActionManager | null {
    const meshComponent = entity.getComponent(Mesh);
    return (meshComponent && meshComponent.value && meshComponent.value.actionManager) || null;
  }

  static queries = {
    ...queries,
    action: {
      components: [Action, Mesh],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
