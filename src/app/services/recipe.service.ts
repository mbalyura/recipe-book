import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from 'src/app/models/recipe.model';
import { Ingridient } from "../models/ingridient.model";
import { findIndex } from "rxjs";

@Injectable()
export class RecipeService {
  id: number = 1;

  private recipes: Recipe[] = [
    new Recipe(
      this.id++,
      'Schnitzel',
      'Super tasty',
      'https://www.daskochrezept.de/sites/daskochrezept.de/files/styles/full_width_tablet_4_3/public/2021-07/schnitzel_mit_pommes_1.jpg?h=30716e04&itok=Q-4VpPLN',
      [
        new Ingridient('Meat', 1),
        new Ingridient('French fries', 20),
      ]
    ),
    new Recipe(
      this.id++,
      'Burger',
      'Big fat burger',
      'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',
      [
        new Ingridient('Buns', 2),
        new Ingridient('Meat', 1),
      ]
    ),
  ];

  getRecipe(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  getRecipes() {
    // return [...this.recipes];
    return this.recipes;
  }

  getNewId() {
    return this.id++;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
    this.recipes.splice(index, 1);
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
    this.recipes[index] = newRecipe;
  }
}