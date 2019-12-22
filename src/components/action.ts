import { Component, createComponentClass } from 'ecsy';
import { ActionEvent, IAction } from '@babylonjs/core';

type ActionCallback = (evt: ActionEvent) => void;

export interface ActionComponent extends Component {
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
  };
}

export default createComponentClass<ActionComponent>(
  {
    pick: { default: null },
    doublePick: { default: null },
    centerPick: { default: null },
    everyFrame: { default: null },
    intersectionEnter: { default: null },
    intersectionExit: { default: null },
    keyDown: { default: null },
    keyUp: { default: null },
    leftPick: { default: null },
    longPress: { default: null },
    pickDown: { default: null },
    pickOut: { default: null },
    pickUp: { default: null },
    pointerOut: { default: null },
    pointerOver: { default: null },
    rightPick: { default: null },
    _actions: { default: {} },
  },
  'Action'
);
