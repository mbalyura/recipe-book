import { Component, EventEmitter, Output } from '@angular/core';
import { Ingridient } from 'src/app/models/ingridient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @Output() ingridientAdded = new EventEmitter<Ingridient>()

  onAdd(name: string, amount: number) {
    const newIngridient = new Ingridient(name, amount);
    this.ingridientAdded.emit(newIngridient);
  }
}
