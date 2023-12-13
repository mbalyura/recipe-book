import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingridient } from 'src/app/models/ingridient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = !!params.id;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';
    let recipeIngridients = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeIngridients = recipe.ingridients
        ? recipe.ingridients.map((ingridient) => new FormGroup({
          name: new FormControl(ingridient.name, Validators.required),
          amount: new FormControl(ingridient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        }))
        : recipeIngridients;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingridients: new FormArray(recipeIngridients),
    });
  }

  getIngridientControls() {
    return (<FormArray>this.recipeForm.get('ingridients')).controls
  }

  addIngridientControl() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    });
    (<FormArray>this.recipeForm.get('ingridients')).push(control)
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingridients,
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
      this.onLeave();
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }

  onLeave() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  deleteIngridient(index: number) {
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
}
