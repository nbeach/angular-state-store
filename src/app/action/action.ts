import {Subject} from "rxjs"

export interface ActionType {
  readonly __type: symbol
}

export type Action<T> = ActionType & T

export interface ActionFactory<T> {
  (action: T): Action<T>

  __type: symbol
}

export function actionFactoryBuilder<T>(): ActionFactory<T> {
  const symbol = Symbol()
  const actionFactory = (action: T) => ({__type: symbol, ...action});
  (actionFactory as any).__type = symbol
  return actionFactory as any
}

export function isAction<T>(factory: ActionFactory<T>, action: Action<any>): action is Action<T> {
  return (action as any).__type === factory.__type
}

export class Actions extends Subject<Action<any>> { }

