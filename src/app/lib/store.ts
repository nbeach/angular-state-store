import {Observable} from "rxjs/internal/Observable"
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject"
import {Action, Actions} from "./action/action"


export class StateStore<T> {
  private readonly _state: BehaviorSubject<T>

  constructor(private reducer: (priorState: T, action: Action<any>) => T, initialState: T, actionSource: Actions) {
    this._state = new BehaviorSubject<T>(initialState)

    actionSource.subscribe(action => {
      const newState = this.reducer(this.stateSnapshot, action)
      this._state.next(newState)
    })
  }

  get state(): Observable<T> {
    return this._state.asObservable()
  }

  get stateSnapshot(): T {
    return this._state.getValue()
  }

}



