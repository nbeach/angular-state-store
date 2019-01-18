import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {AppComponent} from "./component/app.component"
import {SearchComponent} from "./component/search.component"
import {SearchResultComponent} from "./component/search-result.component"
import {SearchActionReceiver} from "./receiver/search.action-receiver";
import {rootReducer} from "./reducer/root.reducer";
import {initialState} from "./reducer/initial-state";
import {INITIAL_STATE, ROOT_REDUCER} from "./lib/state-store/store";
import {StoreModule} from "./lib/state-store/store.module";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule,
  ],
  providers: [
    SearchActionReceiver,
    {provide: ROOT_REDUCER, useValue: rootReducer},
    {provide: INITIAL_STATE, useValue: initialState},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
