import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {AppComponent} from "./component/app.component"
import {StoreModule} from "./store/store.module"
import {SearchComponent} from "./component/search.component"
import {SearchResultComponent} from "./component/search-result.component"
import {SearchEffects} from "./effect/search.effect"


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
    SearchEffects,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
