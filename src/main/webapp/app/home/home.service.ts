import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }
  private handleError(errorResponse: Response) {
    console.log(errorResponse.statusText);
    return Observable.throw(errorResponse.json().error || 'Server error');

  }

  viewStates() {
     const url = `/api/game-intros`;
   
    return this.http.get(url)
      .map((resp: Response) => {
         console.log(JSON.parse(JSON.stringify(resp))._body);
        return resp.json();
      }).catch(this.handleError);
  }


}
