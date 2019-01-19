import {actionFactoryBuilder, ActionParameters} from "../../lib/action"
import {SearchCriteria} from "../business/search-criteria"

export interface CriteriaChangedAction extends ActionParameters {
  readonly criteria: SearchCriteria
}

export const criteriaChangedAction = actionFactoryBuilder<CriteriaChangedAction>()
