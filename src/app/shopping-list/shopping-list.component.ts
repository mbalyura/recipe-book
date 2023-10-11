import { Component } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Oranges', 10),
  ];
}
