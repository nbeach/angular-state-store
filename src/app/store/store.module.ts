import {NgModule} from "@angular/core"
import {StateStore} from "./store"
import {rootReducer} from "./reducer/root.reducer"
import {initialState} from "./reducer/initial-state"
import {Actions} from "../action/action"

const actions = new Actions()
const store = new StateStore(rootReducer, initialState, actions)

@NgModule({
  providers: [
    {provide: Actions, useValue: actions},
    {provide: StateStore, useValue: store},
  ],
})
export class StoreModule {
}
