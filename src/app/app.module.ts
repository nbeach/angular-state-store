import {BrowserModule} from "@angular/platform-browser"
import {Injector, NgModule, Type} from "@angular/core"
import {AppComponent} from "./component/app.component"
import {SearchComponent} from "./component/search.component"
import {SearchResultComponent} from "./component/search-result.component"
import {SearchActionReceiver} from "./receiver/search.action-receiver"
import {SearchService} from "./service/search-service"
import {AppActions, AppStateStore} from "./app.injectables"
import {ActionReceiver, ActionReceiverModule} from "./lib/action-receiver"


const receivers: Type<ActionReceiver>[] = [
  SearchActionReceiver,
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    ActionReceiverModule(receivers),
  ],
  providers: [
    AppActions,
    AppStateStore,
    SearchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
