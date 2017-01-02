import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ArticlesService{

constructor(private http: Http){}

  getItems(){
  return this.http.get('/api/articles')
    .map(res =>res.json());
   
}




////////////////////////////

sendOrder(){

  return this.http.request('/api/sendOrder')
    .subscribe(res => {
      console.log(res);
    })
    

   
}




}