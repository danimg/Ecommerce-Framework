import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbInputValidationModule } from 'src/app/shared/controls/inputValidation/input-validation.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { DirectivesModule } from './../shared/directives/directives.module';



import { LoginComponent } from './components/login.component';
import { NgbIconModule } from '../shared/controls/icon/icon.module';


const routes: Routes = [
  { path: '', component: LoginComponent }]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbInputValidationModule,
    NgbIconModule,
    DirectivesModule,
    NgbModalModule,
  ],
  declarations: [
    LoginComponent,  
  ],

  providers: [

  ]
})
export class LoginModule { }
