import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"

import {AppComponent} from "./app.component"
import {storeProvider} from "./store/store"


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    storeProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
