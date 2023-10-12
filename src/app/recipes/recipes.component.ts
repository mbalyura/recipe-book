import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  activeRecipe: Recipe;

  setActiveRecipe(recipe: Recipe) {
    this.activeRecipe = recipe;
  }
}
