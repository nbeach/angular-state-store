import {actionFactoryBuilder, ActionParameters} from "../../lib/action"

export interface MakeOptionChangeAction extends ActionParameters {
  readonly value: string
  readonly selected: boolean
}

export const makeOptionChangeAction = actionFactoryBuilder<MakeOptionChangeAction>()
