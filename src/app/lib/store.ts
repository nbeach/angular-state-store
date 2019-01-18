import {Observable} from "rxjs/internal/Observable"
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject"
import {Subject} from "rxjs"

export class StateStore<S, A> {
  private readonly _state: BehaviorSubject<S>

  constructor(private reducer: (priorState: S, action: A) => S, initialState: S, actionSource: Subject<A>) {
    this._state = new BehaviorSubject<S>(initialState)

    actionSource.subscribe(action => {
      const newState = this.reducer(this.stateSnapshot, action)
      this._state.next(newState)
    })
  }

  get state(): Observable<S> {
    return this._state.asObservable()
  }

  get stateSnapshot(): S {
    return this._state.getValue()
  }

}



