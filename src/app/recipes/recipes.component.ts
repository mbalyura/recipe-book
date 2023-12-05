import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  activeRecipe: Recipe;

  constructor(private recipeServise: RecipeService) {}

  ngOnInit(): void {
      this.recipeServise.recipeSelected.subscribe((recipe: Recipe) => {
        this.activeRecipe = recipe;
      })
  }
}
