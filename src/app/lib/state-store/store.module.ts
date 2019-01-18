import {NgModule} from "@angular/core"
import {StateStore} from "./store"
import {ActionModule} from "../action/action.module";


@NgModule({
  imports: [ActionModule],
  providers: [StateStore],
})
export class StoreModule {
}
