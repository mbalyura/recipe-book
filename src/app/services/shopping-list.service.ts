import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingridient } from 'src/app/models/ingridient.model';

@Injectable()
export class ShoppingListService {
  ingridientChanged = new Subject<Ingridient[]>();

  ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Oranges', 10),
  ];

  getIngridients() {
    return this.ingridients;
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridientChanged.next(this.ingridients);
  }
}