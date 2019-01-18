import {actionFactoryBuilder} from "../../modules/action/action"

export interface SearchResultAction {
  readonly results: string[]
}

export const searchResultAction = actionFactoryBuilder<SearchResultAction>()
