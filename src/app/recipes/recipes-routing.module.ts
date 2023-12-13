import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
// import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from '../services/recipes-resolver.service';
import { authGuard } from '../auth/auth.guard';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ErrorPageComponent,
        pathMatch: 'full',
        data: {message: 'Please select a recipe!'}
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
