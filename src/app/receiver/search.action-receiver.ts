import {Injectable} from "@angular/core"
import {SearchAction, searchAction} from "../model/action/search.action"
import {SearchResultAction, searchResultAction} from "../model/action/search-result.action"
import {SearchService} from "../service/search-service"
import {map} from "rxjs/operators"
import {Observable} from "rxjs"
import {AppActions, AppStateStore} from "../app.injectables"
import {Action} from "../lib/action"
import {ActionReceiver, ReceivesActions} from "../lib/action-receiver"


@Injectable()
export class SearchActionReceiver extends ActionReceiver {

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
