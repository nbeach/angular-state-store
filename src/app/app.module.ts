import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {AppComponent} from "./component/app.component"
import {SearchComponent} from "./component/search.component"
import {SearchResultComponent} from "./component/search-result.component"
import {SearchActionReceiver} from "./receiver/search.action-receiver"
import {SearchService} from "./service/search-service"
import {AppActions, AppStateStore} from "./app.injectables"


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    AppActions,
    AppStateStore,
    SearchService,
    SearchActionReceiver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
