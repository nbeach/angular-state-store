import {ChangeDetectionStrategy, Component} from "@angular/core"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"
import {AppActions, AppStateStore} from "../app.injectables"
import {OptionSelectionState} from "../model/state/app.state"
import {makeOptionChangeAction} from "../model/action/make-option-change-action"

@Component({
  selector: "make-filter",
  template: `
    <div>
      <h1>MakeFilter:</h1>
      <ul>
        <li *ngFor="let option of makeOptions | async">
          {{option.title}} <input type="checkbox" [value]="option.value" [checked]="option.selected" (change)="makeOptionChanged(option.value, !option.selected)">
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeFilterComponent {
  public makeOptions: Observable<OptionSelectionState<string>[]>

  constructor(private store: AppStateStore, private actions: AppActions) {
    this.makeOptions = store.state.pipe(map(state => state.makesOptions))
  }

  public makeOptionChanged(value: string, selected: boolean) {
    this.actions.next(makeOptionChangeAction({value, selected}))
  }

}
