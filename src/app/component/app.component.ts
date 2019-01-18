import {ChangeDetectionStrategy, Component} from "@angular/core"
import {SearchActionReceiver} from "../receiver/search.action-receiver";

@Component({
  selector: "app-root",
  template: `
    <search></search>
    <search-result></search-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(effect: SearchActionReceiver) {
  }

}
