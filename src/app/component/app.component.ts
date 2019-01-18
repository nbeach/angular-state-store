import {ChangeDetectionStrategy, Component} from "@angular/core"
import {SearchActionReceiver} from "../receiver/search.action-receiver"

@Component({
  selector: "app-root",
  template: `
    <search></search>
    <br>
    <search-result></search-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  // TODO: Figure out a better way to get this object created
  constructor(effect: SearchActionReceiver) {
  }

}
