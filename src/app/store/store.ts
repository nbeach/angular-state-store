import {Provider} from "@angular/core"
import {Observable} from "rxjs/internal/Observable"
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject"
import {initialState} from "./initial-state"
import {Action} from "./action/action"
import {rootReducer} from "./reducer/root.reducer"

export class StateStore<T> {
  private readonly _state: BehaviorSubject<T>

  constructor(private reducer: (priorState: T, action: Action<any>) => T, initialState: T) {
    this._state = new BehaviorSubject<T>(initialState)
  }

  get state(): Observable<T> {
    return this._state.asObservable()
  }

  get stateSnapshot(): T {
    return this._state.getValue()
  }

  public dispatch(event: Action<any>) {
    const newState = this.reducer(this.stateSnapshot, event)
    this._state.next(newState)
  }

  public dispatchInterceptor(interceptor: (action: Action<any>) => void): void {

  }

}

export const storeProvider: Provider = { provide: StateStore, useValue: new StateStore(rootReducer, initialState) }


