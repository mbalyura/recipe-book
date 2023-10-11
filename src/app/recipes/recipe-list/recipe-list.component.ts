import { Component } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Test recipe', 'test description', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg')
  ];
}
