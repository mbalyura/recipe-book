import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingridient } from 'src/app/models/ingridient.model';

@Injectable()
export class ShoppingListService {
  ingridientChanged = new Subject<Ingridient[]>();
  ingridientEdited = new Subject<number>();

  ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Oranges', 10),
  ];

  getIngridients() {
    return this.ingridients;
  }

  getIngridient(index) {
    return this.ingridients[index];
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridientChanged.next(this.ingridients);
  }

  updateIngridient(index: number, newIngridient: Ingridient) {
    this.ingridients[index] = newIngridient;
    this.ingridientChanged.next(this.ingridients);
  }

  deleteIngridient(index: number) {
    console.log('index', index)
    this.ingridients.splice(index, 1);
    this.ingridientChanged.next(this.ingridients);
  }
}