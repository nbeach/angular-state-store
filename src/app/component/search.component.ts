import {ChangeDetectionStrategy, Component} from "@angular/core"
import {Observable} from "rxjs"
import {querySearchAction} from "../model/action/query-search.action"
import {map} from "rxjs/operators"
import {queryChangedAction} from "../model/action/query-change.action"
import {AppActions, AppStateStore} from "../app.injectables"

@Component({
  selector: "search",
  template: `
    <div>
      <h1>Search:</h1>
      <input [value]="query | async" (keyup)="queryChange($event.target.value)">
      <button (click)="search()">Search</button>
      <p>Current search is {{query | async}}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public query: Observable<string>

  constructor(private store: AppStateStore, private actions: AppActions) {
    this.query = store.state.pipe(map(state => state.query))
  }

  public search() {
    this.actions.next(querySearchAction({}))
  }

  public queryChange(query: string) {
    this.actions.next(queryChangedAction({query}))
  }

}
