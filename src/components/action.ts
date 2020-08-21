import { Component, ComponentSchema, Types } from 'ecsy';
import { ActionEvent } from '@babylonjs/core/Actions/actionEvent';
import { IAction } from '@babylonjs/core/Actions/action';

type ActionCallback = (evt: ActionEvent) => void;

export default class Action extends Component<Action> {
  pick?: ActionCallback;
  doublePick?: ActionCallback;
  centerPick?: ActionCallback;
  everyFrame?: ActionCallback;
  intersectionEnter?: ActionCallback;
  intersectionExit?: ActionCallback;
  keyDown?: ActionCallback;
  keyUp?: ActionCallback;
  leftPick?: ActionCallback;
  longPress?: ActionCallback;
  pickDown?: ActionCallback;
  pickOut?: ActionCallback;
  pickUp?: ActionCallback;
  pointerOut?: ActionCallback;
  pointerOver?: ActionCallback;
  rightPick?: ActionCallback;

  _actions: {
    [key: string]: IAction;
  } = {};

  static schema: ComponentSchema = {
    pick: {
      type: Types.Ref,
    },
    doublePick: {
      type: Types.Ref,
    },
    centerPick: {
      type: Types.Ref,
    },
    everyFrame: {
      type: Types.Ref,
    },
    intersectionEnter: {
      type: Types.Ref,
    },
    intersectionExit: {
      type: Types.Ref,
    },
    keyDown: {
      type: Types.Ref,
    },
    keyUp: {
      type: Types.Ref,
    },
    leftPick: {
      type: Types.Ref,
    },
    longPress: {
      type: Types.Ref,
    },
    pickDown: {
      type: Types.Ref,
    },
    pickOut: {
      type: Types.Ref,
    },
    pickUp: {
      type: Types.Ref,
    },
    pointerOut: {
      type: Types.Ref,
    },
    pointerOver: {
      type: Types.Ref,
    },
    rightPick: {
      type: Types.Ref,
    },
    _actions: {
      type: Types.Ref,
    },
  };
}
