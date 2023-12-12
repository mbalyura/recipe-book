import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingridient } from 'src/app/models/ingridient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  activeRecipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRecipe = this.recipeService.getRecipe(+this.route.snapshot.params.id);
    this.route.params.subscribe((params: Params) => {
      this.activeRecipe = this.recipeService.getRecipe(+params.id);
    })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.activeRecipe.id);
    this.router.navigate(['../..'], { relativeTo: this.route })
  }

  addToShoppingList() {
    this.activeRecipe.ingridients.forEach((ingridient: Ingridient) => {
      this.shoppingListService.addIngridient(ingridient);
    })
  }
}
