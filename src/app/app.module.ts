import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {AppComponent} from "./component/app.component"
import {SearchComponent} from "./component/search.component"
import {SearchResultComponent} from "./component/search-result.component"
import {SearchActionReceiver} from "./receiver/search.action-receiver"
import {rootReducer} from "./reducer/root.reducer"
import {initialState} from "./reducer/initial-state"
import {INITIAL_STATE, ROOT_REDUCER} from "./modules/state-store/store"
import {StoreModule} from "./modules/state-store/store.module"
import {ActionModule} from "./modules/action/action.module";
import {SearchService} from "./service/search-service";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule,
    ActionModule,
  ],
  providers: [
    SearchService,
    SearchActionReceiver,
    // TODO: Improve how this is configured and allow for possibility of multiple stores and event streams
    {provide: ROOT_REDUCER, useValue: rootReducer},
    {provide: INITIAL_STATE, useValue: initialState},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
