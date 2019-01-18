import {isObservable, Observable, Subject} from "rxjs"
import {isFunction, isUndefined, negate} from "lodash"

export interface ActionType {
  readonly __type: symbol
}

export interface ActionParameters {
}

export type Action<T extends ActionParameters> = ActionType & T

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

export class Actions extends Subject<Action<ActionParameters>> {
}

type ActionResult = Observable<Action<any>> | Observable<Action<any>>[] | Action<any> | Action<any> | undefined

export interface ActionReceiver<T> {
  (action: Action<T>): ActionResult

  __eventTypes: ActionFactory<any>[]
}

export class AbstractActionReceiver {
  private actionReceivers: ActionReceiver<any>[]

  constructor(private actions: Actions) {
    this.actionReceivers = values(this).filter(isActionReceiver)

    actions.subscribe(this.dispatchActions)
  }

  private dispatchActions = (action: Action<any>) => {
    const actionsResults = this.actionReceivers
      .filter(receivesAction(action))
      .map(receiver => receiver.call(this, action) as ActionResult)
      .flat()
      .filter(negate(isUndefined))

    actionsResults
      .filter(isActionType)
      .forEach(this.dispatchAction)

    actionsResults
      .filter(isObservable)
      .forEach((result: Observable<Action<any>>) => result.subscribe(this.dispatchAction))
  }

  private dispatchAction = (action: Action<any>) => {
    this.actions.next(action)
  }

}

function values(obj: any): any[] {
  const values = []
  for (const key in obj) {
    values.push(obj[key])
  }
  return values
}

export function ReceivesActions(types: ActionFactory<any>[]) {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    descriptor.value.__eventTypes = types
    return descriptor
  }
}

const isActionReceiver = (value: any): boolean => {
  return isFunction(value) && !isUndefined((value as any).__eventTypes)
}

function isActionType(value: any): value is Action<any> {
  return !isUndefined(value.__type)
}

const receivesAction = (action: Action<any>): (receiver: ActionReceiver<any>) => boolean => {
  return (receiver: ActionReceiver<any>) => receiver.__eventTypes.some(type => isAction(type, action))
}
