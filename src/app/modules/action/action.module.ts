import {NgModule} from "@angular/core"
import {Actions} from "./action"

@NgModule({
  providers: [Actions],
})
export class ActionModule {
}

// TODO: Figure out a way to get this module to automatically instantiate allinjectable ActionReceivers?
