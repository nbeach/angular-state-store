import {actionFactoryBuilder, ActionParameters} from "../../lib/action"
import {SearchCriteria} from "../business/search-criteria"

export interface CriteriaSearchAction extends ActionParameters {
  readonly criteria: SearchCriteria
}

export const criteriaSearchAction = actionFactoryBuilder<CriteriaSearchAction>()
