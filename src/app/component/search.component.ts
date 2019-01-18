import {ChangeDetectionStrategy, Component} from "@angular/core"
import {StateStore} from "../store/store"
import {AppState} from "../model/state/app.state"
import {Observable} from "rxjs"
import {searchAction} from "../action/search/search.action"
import {map} from "rxjs/operators"
import {queryChangedAction} from "../action/search/query-change.action"
import {Actions} from "../action/action"

@Component({
  selector: "search",
  template: `
    <h1>Search</h1>
    <p>Current search is {{query | async}}</p>
    <input [value]="query | async" (keyup)="queryChange($event.target.value)">
    <button (click)="search()">Search</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public query: Observable<string>

  constructor(private store: StateStore<AppState>, private actions: Actions) {
    this.query = store.state.pipe(map(state => state.query))
  }

  public search() {
    this.actions.next(searchAction({}))
  }

  public queryChange(query: string) {
    this.actions.next(queryChangedAction({query}))
  }

}
