import {Injectable} from "@angular/core"
import {Actions} from "./lib/action/action"
import {StateStore} from "./lib/store"
import {AppState} from "./model/state/app.state"
import {rootReducer} from "./reducer/root.reducer"
import {initialState} from "./reducer/initial-state"

@Injectable()
export class AppActions extends Actions {
}

@Injectable()
export class AppStateStore extends StateStore<AppState> {
  constructor(actions: AppActions) {
    super(rootReducer, initialState, actions)
  }
}
