import { Injectable } from "@angular/core";
import { Recipe } from 'src/app/models/recipe.model';
import { Ingridient } from "../models/ingridient.model";
import { Subject, findIndex } from "rxjs";

@Injectable()
export class RecipeService {
  id: number = 1;
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  deleteRecipe(index) {
    this.recipes.splice(index, 1);
  }

  updateRecipe(index, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes);
  }
}