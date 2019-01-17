import {ChangeDetectionStrategy, Component} from "@angular/core"
import {StateStore} from "./store/store"
import {Observable} from "rxjs/internal/Observable"
import {map} from "rxjs/operators"
import {AppState} from "./model/state/app.state"
import {searchAction} from "./store/action/search.action"

@Component({
  selector: "app-root",
  template: `
    <h1>{{title | async}}</h1>
    <button (click)="dispatch()">Click Me</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title: Observable<string>

  constructor(private store: StateStore<AppState>) {
    this.title = store.state.pipe(map(state => state.foo))
  }
  public dispatch() {
    this.store.dispatch(searchAction({bar: "World!" }))
  }
}
