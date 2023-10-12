import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Test recipe1', 'test description1', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
    new Recipe('Test recipe2', 'test description2', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
  ];

  @Output() recipeChanged = new EventEmitter();

  setActiveRecipe(recipe: Recipe) {
    this.recipeChanged.emit(recipe);
  }

  ngOnInit() {
    // this.setActiveRecipe(this.recipes[0]);
  }
}
