import {Injectable} from "@angular/core"
import {searchAction} from "../action/search/search.action"
import {Action, ActionFactory, Actions, isAction} from "../action/action"
import {searchResultAction} from "../action/search/search-result.action"
import {StateStore} from "../store/store"
import {AppState} from "../model/state/app.state"
import {Observable} from "rxjs"

@Injectable()
export class SearchEffects {

  constructor(private store: StateStore<AppState>, private actions: Actions) {
    actions.subscribe(action => {
      if (isAction(searchAction, action)) {
        this.search()
      }
    })
  }

  private search(): void {
    const query = this.store.stateSnapshot.query
    this.actions.next(searchResultAction({results: ["Ford Mustang", "Chevy Silverado", "Toyota Corolla"]}))
  }

}

type ActionHandler<T> = (action: Action<T>, state: StateStore<AppState>) => void | Observable<Action<any>>


@Injectable()
export class ActionHandlerThing {
  private handlers = new Map<ActionFactory<any>, ActionHandler<any>[]>()

  constructor(private store: StateStore<AppState>, private actions: Actions) {
    this.actions.subscribe(action => {
      Array.from(this.handlers.entries()).forEach(([eventType, handlers]) => {
        if (isAction(eventType, action)) {
          handlers.forEach( handler => handler(action, this.store))
        }
      })
    })
  }

  public registerHandler<T>(eventType: ActionFactory<T>, handler: ActionHandler<T>) {
    const handlers = this.handlers.get(eventType) || []
    this.handlers.set(eventType, [...handlers, handler])
  }

}
