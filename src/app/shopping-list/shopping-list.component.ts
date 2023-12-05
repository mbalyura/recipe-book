import { Component, OnInit } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.ingridients = this.shoppingListService.getIngridients()
  }

  ngOnInit(): void {

  }
}
