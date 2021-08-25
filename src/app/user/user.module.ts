import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
