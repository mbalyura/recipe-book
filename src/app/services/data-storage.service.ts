import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  apiUrl = 'https://angular-project-83c6b-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(`${this.apiUrl}recipes.json`, recipes)
      .subscribe((response) => {
        console.log('resp', response)
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${this.apiUrl}recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => recipe.ingridients ? recipe : { ...recipe, ingridients: [] });
        }),
        tap((recipes) => {
          this.recipeService.updateRecipes(recipes);
        })
      );
  }
}
