import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';


import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,

  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
