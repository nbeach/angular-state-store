import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {SearchCriteria} from "../model/business/search-criteria"

@Injectable()
export class SearchService {

  public search(criteria: SearchCriteria): Observable<string[]> {
    // Pretend I'm actually using a http request to retrieve search results
    console.log("Search Executed")
    console.log(criteria)
    return of(["Ford Mustang", "Chevy Silverado", "Toyota Corolla"])
  }

  public toSearchCriteria(query: string): Observable<SearchCriteria> {
    // Pretend I'm actually using a http request to retrieve the criteria
    console.log("Query to Criteria Conversion")
    console.log(query)
    return of({ makes: ["ford", "chevy"] })
  }

}
