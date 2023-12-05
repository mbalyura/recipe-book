import { Component, Input } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  @Input() activeRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  addToShoppingList() {
    this.activeRecipe.ingridients.forEach((ingridient: Ingridient) => {
      this.shoppingListService.addIngridient(ingridient);
    })
  }
}
