import {isObservable, Observable} from "rxjs"
import {Action, ActionFactory, ActionParameters, Actions, isAction} from "./action"
import {isFunction, isUndefined, negate, valuesIn} from "lodash"
import {Injector, NgModule, Type} from "@angular/core"
import {AppComponent} from "../component/app.component"

type ActionResult = Observable<Action<ActionParameters>> | Observable<Action<ActionParameters>>[] | Action<ActionParameters> | Action<ActionParameters> | undefined

interface ActionReceiverMethod<T extends ActionParameters> {
  (action: Action<T>): ActionResult
  __eventTypes: ActionFactory<T>[]
}

export function ReceivesActions(types: ActionFactory<ActionParameters>[]) {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    descriptor.value.__eventTypes = types
    return descriptor
  }
}

export class ActionReceiver {
  private actionReceivers: ActionReceiverMethod<ActionParameters>[]

  constructor(private actions: Actions) {
    this.actionReceivers = valuesIn(this).filter(isActionReceiver) as any
    actions.subscribe(this.dispatchActions)
  }

  private dispatchActions = (action: Action<ActionParameters>) => {
    const actionsResults = this.actionReceivers
      .filter(receivesAction(action))
      .map(receiver => receiver.call(this, action) as ActionResult)
      .flat()
      .filter(negate(isUndefined))

    actionsResults
      .filter(isActionObject)
      .forEach(this.dispatchAction)

    actionsResults
      .filter(result => isObservable<Action<ActionParameters>>(result))
      .forEach((result: Observable<Action<ActionParameters>>) => result.subscribe(this.dispatchAction))
  }

  private dispatchAction = (action: Action<ActionParameters>) => {
    this.actions.next(action)
  }

}

const receivesAction = (action: Action<ActionParameters>): (receiver: ActionReceiverMethod<ActionParameters>) => boolean => {
  return (receiver: ActionReceiverMethod<ActionParameters>) => receiver.__eventTypes.some(type => isAction(type, action))
}

const isActionReceiver = (value: any): boolean => {
  return isFunction(value) && !isUndefined((value as any).__eventTypes)
}

function isActionObject(value: any): value is Action<ActionParameters> {
  return !isUndefined(value.__type)
}

export function ActionReceiverModule(receivers: Type<ActionReceiver>[]) {
  @NgModule({
    providers: receivers,
    bootstrap: [AppComponent],
  })
  class ReceiverModule {
    constructor(injector: Injector) {
      receivers.map(receiver => injector.get(receiver))
    }
  }

  return ReceiverModule
}
