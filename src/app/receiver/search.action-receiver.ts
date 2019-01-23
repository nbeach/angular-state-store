import {Injectable} from "@angular/core"
import {QuerySearchAction, querySearchAction} from "../model/action/query-search.action"
import {SearchResultAction, searchResultAction} from "../model/action/search-result.action"
import {SearchService} from "../service/search-service"
import {map} from "rxjs/operators"
import {Observable} from "rxjs"
import {AppActions, AppStateStore} from "../app.injectables"
import {Action, ActionParameters} from "../lib/action"
import {ActionReceiver, ReceivesActions} from "../lib/action-receiver"
import {AppState, OptionSelectionState} from "../model/state/app.state"
import {SearchCriteria} from "../model/business/search-criteria"
import {CriteriaSearchAction, criteriaSearchAction} from "../model/action/criteria-search.action"
import {criteriaChangedAction} from "../model/action/criteria-changed.action"
import {MakeOptionChangeAction, makeOptionChangeAction} from "../model/action/make-option-change-action"
import {replace} from "../util/array.util"


@Injectable()
export class SearchActionReceiver extends ActionReceiver {

  constructor(actions: AppActions, store: AppStateStore, private searchService: SearchService) {
    super(actions, store)
  }

  @ReceivesActions([criteriaSearchAction])
  private criteriaSearch(action: Action<CriteriaSearchAction>, state: AppState): Observable<Action<SearchResultAction>> {
    const criteria = buildSearchCriteria(state)

    return this.searchService
      .search(criteria)
      .pipe(map(results => searchResultAction({ results })))
  }

  @ReceivesActions([querySearchAction])
  private querySearch(action: Action<QuerySearchAction>, state: AppState): Observable<Action<ActionParameters>>[] {

    const criteria =  this.searchService.toSearchCriteria(state.query)
    const searchAction = criteria.pipe(map(criteria => criteriaSearchAction({ criteria })))
    const criteriaChangeAction = criteria.pipe(map(criteria => criteriaChangedAction({ criteria })))

    return [searchAction, criteriaChangeAction]
  }

  @ReceivesActions([makeOptionChangeAction])
  private searchWithNewMakeOption(action: Action<MakeOptionChangeAction>, state: AppState): Action<CriteriaSearchAction> {
    let options

    if (action.selected) {
      options = updateMakeOptions(state.makesOptions, action)

    } else {
      options = state.makesOptions
        .filter(value => value.value !== action.value)

    }

    return criteriaSearchAction({ criteria:  { makes: options.map(value => value.value) }})
  }

}

function buildSearchCriteria(state: AppState): SearchCriteria {
  const makes = state.makesOptions
    .filter(option => option.selected )
    .map(option => option.value)

  return { makes }
}


function updateMakeOptions(options: OptionSelectionState<string>[], action: MakeOptionChangeAction): OptionSelectionState<string>[] {
  const matcher = (option: OptionSelectionState<string>) => option.value === action.value
  const changed = options.find(matcher)!
  return replace(matcher, options, {...changed, selected: action.selected})
}
