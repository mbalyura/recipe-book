import { EventEmitter, Injectable } from "@angular/core";
import { Ingridient } from 'src/app/models/ingridient.model';

@Injectable()
export class ShoppingListService {
  // ingridientAdded = new EventEmitter<Ingridient>();

  ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Oranges', 10),
  ];

  getIngridients() {
    return this.ingridients;
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
  }
}