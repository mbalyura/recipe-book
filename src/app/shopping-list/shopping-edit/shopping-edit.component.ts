import { Component } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  onAdd(name: string, amount: number) {
    const newIngridient = new Ingridient(name, amount);
    // this.shoppingListService.ingridientAdded.emit(newIngridient);
    this.shoppingListService.addIngridient(newIngridient);
  }
}
