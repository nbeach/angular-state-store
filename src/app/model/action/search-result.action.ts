import {actionFactoryBuilder, ActionParameters} from "../../lib/action/action"

export interface SearchResultAction extends ActionParameters {
  readonly results: string[]
}

export const searchResultAction = actionFactoryBuilder<SearchResultAction>()
