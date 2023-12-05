import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from 'src/app/models/recipe.model';
import { Ingridient } from "../models/ingridient.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Schnitzel',
      'Super tasty',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
      [
        new Ingridient('Meat', 1),
        new Ingridient('French fries', 20),
      ]
      ),
      new Recipe(
        'Burger',
        'Big fat burger',
        'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
        [
          new Ingridient('Buns', 2),
          new Ingridient('Meat', 1),
        ]
      ),
    ];

  getRecipes() {
    // return [...this.recipes];
    return this.recipes;
  }
}