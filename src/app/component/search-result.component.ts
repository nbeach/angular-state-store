import {ChangeDetectionStrategy, Component} from "@angular/core"
import {StateStore} from "../lib/state-store/store"
import {AppState} from "../model/state/app.state"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"

@Component({
  selector: "search-result",
  template: `
    <strong>Results:</strong>
    <ul>
      <li *ngFor="let result of results | async">{{result}}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  public results: Observable<string[]>

  constructor(private store: StateStore<AppState>) {
    this.results = store.state.pipe(map(state => state.results))
  }

}
