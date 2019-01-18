import {Injectable} from "@angular/core"
import {SearchAction, searchAction} from "../model/action/search.action"
import {AbstractActionReceiver, Action, Actions, ReceivesEvents} from "../modules/action/action"
import {SearchResultAction, searchResultAction} from "../model/action/search-result.action"
import {StateStore} from "../modules/state-store/store"
import {AppState} from "../model/state/app.state"
import {SearchService} from "../service/search-service"
import {map} from "rxjs/operators"
import {Observable} from "rxjs"


@Injectable()
export class SearchActionReceiver extends AbstractActionReceiver {

  constructor(actions: Actions, private store: StateStore<AppState>, private searchService: SearchService) {
    super(actions)
  }

  @ReceivesEvents([searchAction])
  private search(event: Action<SearchAction>): Observable<Action<SearchResultAction>> {
    const query = this.store.stateSnapshot.query

    return this.searchService
      .search(query)
      .pipe(map(results => searchResultAction({results})))
  }

}
