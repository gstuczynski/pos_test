import { Component } from '@angular/core';
import { ArticlesService } from '../articles.services'

@Component({
  selector: 'newreceipt',
   moduleId: module.id,
  templateUrl: './newreceipt.component.html',
   providers: [ArticlesService]
})
export class NewReceiptComponent  {



articles: Array<any> = [];

positions: Array<any> = [];



  constructor(private articlesService: ArticlesService) {
    articlesService.getItems().subscribe(res => {
      this.articles = res;
    })
}

addToReceipt(article:any){
    this.positions.push(article);
}
sendOrder(){
this.articlesService.sendOrder();
}


}

