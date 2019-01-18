import {ChangeDetectionStrategy, Component} from "@angular/core"
import {SearchEffects} from "../effect/search.effect"

@Component({
  selector: "app-root",
  template: `
    <search></search>
    <search-result></search-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(effect: SearchEffects) {
  }

}
