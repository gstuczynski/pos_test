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

  interface orderDataItem{
  "orderItemAddData": {
    "idOrder": 118400,
    "articleId": {
      "idArticle": 115200
    },
    "quantity": "5",
    "priceBeforeAllowance": "5"
   }
    }

  //najperw tworze zamówienie - w odpowiedzi dostaję id
  return this.http.request('/api/sendOrder')
    .map(res => {
    res = res["_body"];
    })

    }

sendOrderItem(){
  console.log("sendOrderItem")
    return this.http.request('/api/sendOrderItems')
    .map(res => {
    res = res["_body"];
    })
}


}