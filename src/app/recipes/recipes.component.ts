import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  constructor(private recipeServise: RecipeService) {}

  ngOnInit(): void {

  }
}
