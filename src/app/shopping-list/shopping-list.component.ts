import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.ingridients = this.shoppingListService.getIngridients();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingridientChanged.subscribe((ingridients: Ingridient[]) => {
      this.ingridients = ingridients;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
