import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <search></search>
    <br>
    <make-filter></make-filter>
    <br>
    <search-result></search-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
