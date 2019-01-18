import {ChangeDetectionStrategy, Component} from "@angular/core"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"
import {AppStateStore} from "../app.injectables"

@Component({
  selector: "search-result",
  template: `
    <div>
      <h1>Results:</h1>
      <ul>
        <li *ngFor="let result of results | async">{{result}}</li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  public results: Observable<string[]>

  constructor(private store: AppStateStore) {
    this.results = store.state.pipe(map(state => state.results))
  }

}
