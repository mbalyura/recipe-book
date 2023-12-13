import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownDirective } from '../directives/dropdown.directive';
import { PlaceholderDirective } from '../directives/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule,
  ]
})
export class SharedModule { }
