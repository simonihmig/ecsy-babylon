import { assignProperty } from './utils/assign';
import { TransitionConfig } from '../components/transitions';
import { Entity } from 'ecsy';
import { TransformNode } from '../components';
import { assert } from './utils/debug';
import { Animation } from '@babylonjs/core/Animations/animation';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Scene } from '@babylonjs/core/scene';
import { TransformNode as BabelTransformNode } from '@babylonjs/core/Meshes/transformNode';

export default class BabylonManager {
  private transitionRegistry = new WeakMap<Entity, Map<string, TransitionConfig>>();

  private Animation?: typeof Animation;

  injectAnimationDependencies(AnimationClass: typeof Animation): void {
    this.Animation = AnimationClass;
  }

  setProperty(entity: Entity, property: string, value: unknown): void {
    const target = this.getTargetForTransition(entity, property);
    assert(`No target found for property ${property}`, target);
    assignProperty(target as never, property, value as never);
  }

  updateProperty(entity: Entity, property: string, value: unknown): void {
    const target = this.getTargetForTransition(entity, property);
    assert(`No target found for transition of ${property}`, target);
    const transition = this.getTransition(entity, property);

    if (this.hasAnimationSupport && transition && transition.duration > 0) {
      this.transitionProperty(target, transition, value);
    } else {
      assignProperty(target as never, property, value as never);
    }
  }

  registerTransition(entity: Entity, config: TransitionConfig): void {
    if (!this.transitionRegistry.has(entity)) {
      this.transitionRegistry.set(entity, new Map<string, TransitionConfig>());
    }

    const transitionSet = this.transitionRegistry.get(entity)!;
    transitionSet.set(config.property, config);
  }

  private transitionProperty(
    target: IAnimatable & { getScene: () => Scene },
    transitionConfig: TransitionConfig,
    value: unknown
  ): void {
    // @todo where to get the Scene from properly?
    const scene = target.getScene();
    const { property, frameRate, duration } = transitionConfig;
    const { Animation } = this;

    assert('Cannot transition property without Animation support', Animation);

    const transition = new Animation(
      `${property}Transition`,
      property,
      frameRate,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    // code mostly taken from Animation.TransitionTo, which we cannot use as it stops existing animations
    const endFrame: number = frameRate * (duration / 1000);

    transition.setKeys([
      {
        frame: 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (target as any)[property].clone ? (target as any)[property].clone() : (target as any)[property],
      },
      {
        frame: endFrame,
        value,
      },
    ]);

    scene.beginDirectAnimation(target, [transition], 0, endFrame, false);
  }

  private getTransition(entity: Entity, property: string): TransitionConfig | undefined {
    const propertyMap = this.transitionRegistry.get(entity);
    if (!propertyMap) {
      return undefined;
    }

    return propertyMap.get(property);
  }

  private getTargetForTransition(entity: Entity, property: string): BabelTransformNode | undefined {
    // @todo support paths

    if (property === 'position' || property === 'rotation' || property === 'scaling') {
      return entity.getComponent(TransformNode)?.value ?? undefined;
    }

    return undefined;
  }

  private get hasAnimationSupport(): boolean {
    return !!this.Animation;
  }
}
