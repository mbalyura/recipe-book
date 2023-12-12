import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/models/ingridient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingridient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingridientEdited.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedItem = this.shoppingListService.getIngridient(id);

      this.editForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAdd(name: string, amount: number) {
    const newIngridient = new Ingridient(name, amount);
    // this.shoppingListService.ingridientAdded.emit(newIngridient);
    this.shoppingListService.addIngridient(newIngridient);
  }

  onSubmit() {
    const { name, amount } = this.editForm.value;
    const newIngridient = new Ingridient(name, amount);

    if (this.editMode) {
      this.shoppingListService.updateIngridient(this.editedItemIndex, newIngridient);
    } else {
      this.shoppingListService.addIngridient(newIngridient);
    }

    this.onClear()
  }

  onDelete() {
    this.shoppingListService.deleteIngridient(this.editedItemIndex);
    this.onClear()
  }

  onClear() {
    this.editMode = false;
    this.editForm.reset()
  }
}
