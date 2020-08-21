import { Component } from 'ecsy';
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

  reset(): void {
    this.pick = undefined;
    this.doublePick = undefined;
    this.centerPick = undefined;
    this.everyFrame = undefined;
    this.intersectionEnter = undefined;
    this.intersectionExit = undefined;
    this.keyDown = undefined;
    this.keyUp = undefined;
    this.leftPick = undefined;
    this.longPress = undefined;
    this.pickDown = undefined;
    this.pickOut = undefined;
    this.pickUp = undefined;
    this.pointerOut = undefined;
    this.pointerOver = undefined;
    this.rightPick = undefined;
  }
}
