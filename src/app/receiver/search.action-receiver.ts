import {Injectable} from "@angular/core"
import {SearchAction, searchAction} from "../model/action/search.action"
import {AbstractActionReceiver, Action, ReceivesActions} from "../lib/action/action"
import {SearchResultAction, searchResultAction} from "../model/action/search-result.action"
import {SearchService} from "../service/search-service"
import {map} from "rxjs/operators"
import {Observable} from "rxjs"
import {AppActions, AppStateStore} from "../app.injectables"


@Injectable()
export class SearchActionReceiver extends AbstractActionReceiver {

  constructor(actions: AppActions, private store: AppStateStore, private searchService: SearchService) {
    super(actions)
  }

  @ReceivesActions([searchAction])
  private search(event: Action<SearchAction>): Observable<Action<SearchResultAction>> {
    const query = this.store.stateSnapshot.query

    return this.searchService
      .search(query)
      .pipe(map(results => searchResultAction({results})))
  }

}
