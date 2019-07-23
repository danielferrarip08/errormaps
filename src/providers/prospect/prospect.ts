import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProspectProvider {

  constructor(public http: Http) {
    console.log('Hello ProspectProvider Provider');
  }

  loadProspect():Promise<any>{
    return new Promise((resolve)=>{
      this.http.get('./prospects.json').map(res => res.json()).subscribe(data => {
        resolve(data);
    });
    })
  }


}
