import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable()
export class SearchService {

  constructor() {
  }

  public search(query: string): Observable<string[]> {
    // Pretend I'm actually using a http request to retrieve search results
    return of(["Ford Mustang", "Chevy Silverado", "Toyota Corolla"])
  }

}
