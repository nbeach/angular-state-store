import {isObservable, Observable, Subject} from "rxjs"
import {isFunction, isUndefined} from "lodash"

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

export class Actions extends Subject<Action<any>> {
}


export interface ActionReceiver<T> {
  (action: Action<T>): Observable<Action<any>> | Action<any> | undefined

  __types: ActionFactory<any>[]
}

export class AbstractActionReceiver {

  constructor(private actions: Actions) {
    actions.subscribe(this.dispatchActions)
  }

  private dispatchActions = (action: Action<any>) => {
    const results = Object.values(this)
      .filter(isActionReceiver)
      .filter(receivesAction(action))
      .map(receiver => receiver(action))
      .filter(action => !isUndefined(action))


    results
    // .filter(isActionType)
      .forEach(this.dispatchAction)

    results
      .filter(isObservable)
      .forEach(result => {
        result.subscribe(this.dispatchAction)
      })
  }

  private dispatchAction = (action: Action<any>) => {
    this.actions.next(action)
  }

}

export function ReceivesEvents(types: ActionFactory<any>[]) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    descriptor.value.__eventTypes = types
    return descriptor
  }
}

const isActionReceiver = (value: any): boolean => {
  return isFunction(value) && !isUndefined((value as any).__types)
}

const receivesAction = (action: Action<any>): (receiver: ActionReceiver<any>) => boolean => {
  return (receiver: ActionReceiver<any>) => receiver.__types.some((type: ActionFactory<any>) => isAction(type, action))
}
