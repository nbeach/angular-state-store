import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <search></search>
    <br>
    <search-result></search-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
