import {Subject} from "rxjs"

export interface ActionType { readonly __type: symbol }
export interface ActionParameters { }
export type Action<T extends ActionParameters> = ActionType & T
export class Actions extends Subject<Action<ActionParameters>> {}

export interface ActionFactory<T extends ActionParameters> {
  (action: T): Action<T>
  __type: symbol
}

export function isAction<T>(factory: ActionFactory<T>, action: Action<ActionParameters>): action is Action<T> {
  return (action as any).__type === factory.__type
}

export function actionFactoryBuilder<T extends ActionParameters>(): ActionFactory<T> {
  const symbol = Symbol()
  const actionFactory = (action: T) => ({__type: symbol, ...action});
  (actionFactory as any).__type = symbol
  return actionFactory as any
}
